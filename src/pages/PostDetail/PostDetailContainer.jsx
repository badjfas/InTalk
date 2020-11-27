import { useMutation, useQuery } from "@apollo/client";
import React, { useRef } from "react";
import { ADD_CHILD_COMMENT, ADD_COMMENT, SEE_ALL_COMMENTS, SEE_POST, TOGGLE_LIKE } from "../Feed/post";
import PostDetailPresenter from "./PostDetailPresenter";

const PostDetailContainer = props => {
    const {
        match: {
            params: { id: postId }
        }
    } = props;

    const { data, loading, refetch } = useQuery(SEE_POST, {
        variables: {
            postId: parseInt(postId)
        }
    });
    const inputRef = useRef(null);

    //좋아요
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE);

    const toggleLike = async ({ e, postId }) => {
        e.preventDefault();
        try {
            await toggleLikeMutation({
                variables: {
                    postId: parseInt(postId)
                }
            });
            //좋아요 업데이트
            const { data } = await refetch();
            return data;
        } catch {
            alert("잠시 후 다시 시도해주세요.");
        }
    };

    //게시물 댓글
    const [addCommentMutation] = useMutation(ADD_COMMENT);

    const addComment = async ({ event, postId, text }) => {
        event.preventDefault();
        try {
            await addCommentMutation({
                variables: {
                    postId: parseInt(postId),
                    text: text
                },
                refetchQueries: [
                    {
                        query: SEE_ALL_COMMENTS,
                        variables: {
                            postId: parseInt(postId)
                        }
                    }
                ]
            });
            //댓글 업데이트
            const { data } = await refetch();
            return data;
        } catch {
            alert("잠시 후 다시 시도해주세요.");
        }
    };

    //게시물 대댓글
    const [addChildCommentMutation] = useMutation(ADD_CHILD_COMMENT, {});

    const addChildComment = async ({ e, targetCommentId, targetUserId, text, postId }) => {
        e.preventDefault();
        try {
            await addChildCommentMutation({
                variables: {
                    targetCommentId: parseInt(targetCommentId),
                    targetUserId: parseInt(targetUserId),
                    text: text,
                    postId: parseInt(postId)
                },
                refetchQueries: [
                    {
                        query: SEE_ALL_COMMENTS,
                        variables: {
                            postId: parseInt(postId)
                        }
                    }
                ]
            });
            //댓글 업데이트
            const { data } = await refetch();
            return data;
        } catch {
            alert("잠시 후 다시 시도해주세요.");
        }
    };
    return (
        <PostDetailPresenter
            {...props}
            data={data}
            loading={loading}
            toggleLike={toggleLike}
            addComment={addComment}
            addChildComment={addChildComment}
        />
    );
};

export default PostDetailContainer;
