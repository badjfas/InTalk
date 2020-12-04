import React, { Fragment } from "react";
import styled from "styled-components";
import PostCard from "../Common/PostCard";
import Spinner from "../Common/Spinner";
const Wrapper = styled.div`
    margin: 3rem auto 3rem auto;
    display: flex;
    height: 100%;
    flex-direction: column;
    position: fixed;
    max-width: 1024px;
    width: 100%;
`;
const PostBox = styled.div`
    overflow: scroll;
    position: relative;
    height: calc(100% - 6rem);
`;
const PostPresenter = ({
    postData,
    toggleLike,
    addComment,
    addChildComment,
    history,
    scrollEl,
    loading,
    handleScroll
}) => {
    return (
        <Wrapper id="outterbox">
            <PostBox id="innerbox" ref={scrollEl} onScroll={() => handleScroll()}>
                {postData?.seePosts?.rows?.map(post => {
                    return (
                        <PostCard
                            history={history}
                            {...post}
                            key={post.postId}
                            toggleLike={toggleLike}
                            addComment={addComment}
                            addChildComment={addChildComment}
                        />
                    );
                })}
            </PostBox>
            {loading ? <Spinner size={25} top={"unset"} bottom={"7rem"} /> : null}
        </Wrapper>
    );
};

export default PostPresenter;
