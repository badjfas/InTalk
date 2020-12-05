import { useMutation } from "@apollo/client";
import React from "react";
import { TOGGLE_LIKE } from "../../pages/Feed/post";
import PostPresenter from "./PostPresenter";

const Posts = ({ postData, refetch, setPosts, history, scrollEl, loading, handleScroll }) => {
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
            setPosts({ ...data });
            return data;
        } catch {
            alert("잠시 후 다시 시도해주세요.");
        }
    };

    return (
        <PostPresenter
            handleScroll={handleScroll}
            toggleLike={toggleLike}
            postData={postData}
            refetch={refetch}
            history={history}
            scrollEl={scrollEl}
            loading={loading}
        />
    );
};

export default Posts;
