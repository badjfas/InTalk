import { useMutation } from "@apollo/client";
import React, { useRef } from "react";
import { ADD_CHILD_COMMENT, ADD_COMMENT, TOGGLE_LIKE } from "../../pages/Feed/post";
import PostPresenter from "./PostPresenter";

const Posts = ({ postData, refetch }) => {
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
                }
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

    const addChildComment = async ({ e, targetCommentId, targetUserId, text }) => {
        try {
            await addChildCommentMutation({
                variables: {
                    targetCommentId: parseInt(targetCommentId),
                    targetUserId: parseInt(targetUserId),
                    text: text
                }
            });
            //댓글 업데이트
            const { data } = await refetch();
            return data;
        } catch {
            alert("잠시 후 다시 시도해주세요.");
        }
    };

    return (
        <PostPresenter
            toggleLike={toggleLike}
            addComment={addComment}
            addChildComment={addChildComment}
            postData={postData}
            refetch={refetch}
            inputRef={inputRef}
        />
    );
};

export default Posts;
