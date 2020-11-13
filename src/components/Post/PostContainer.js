import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useState } from "react";
import { DecodeToken } from "../../libs/decodeToken";
import { ADD_CHILD_COMMENT, ADD_COMMENT, TOGGLE_LIKE } from "../../pages/Feed/post";
import PostPresenter from "./PostPresenter";

const Posts = ({ postData, refetch, setOpenDepartMenu }) => {
    const [visible, setVisible] = useState(false);
    const [text, setText] = useState("");
    const [user, setUser] = useState({});
    console.log(text);
    useEffect(() => {
        const { user: data } = DecodeToken(localStorage.getItem("token"));
        setUser({ ...data });
    }, []);

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
            console.log(data);
            return data;
        } catch {
            alert("잠시 후 다시 시도해주세요.");
        }
    };

    //게시물 대댓글
    const [addChildCommentMutation] = useMutation(ADD_CHILD_COMMENT, {});

    const addChildComment = async ({ e, targetCommentId, targetUserId, text }) => {
        console.log(targetCommentId, targetUserId, text);
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
            visible={visible}
            setVisible={setVisible}
            text={text}
            setText={setText}
            toggleLike={toggleLike}
            addComment={addComment}
            addChildComment={addChildComment}
            postData={postData}
            user={user}
            refetch={refetch}
            setOpenDepartMenu={setOpenDepartMenu}
        />
    );
};

export default Posts;
