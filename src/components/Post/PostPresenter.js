import React, { Fragment } from "react";
import styled from "styled-components";
import PostCard from "../Common/PostCard";
const Container = styled.div`
    max-width: 1024px;
    min-height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;
const PostBox = styled.div`
    height: 100%;
`;
export default ({ postData, toggleLike, addComment, addChildComment, inputRef, history }) => {
    return (
        <Container>
            <PostBox ref={inputRef}>
                {postData?.seePosts?.rows?.map(post => {
                    return (
                        <div key={post.postId} onClick={() => history.push(`/post/${post.postId}`)}>
                            <PostCard
                                {...post}
                                toggleLike={toggleLike}
                                addComment={addComment}
                                addChildComment={addChildComment}
                            />
                        </div>
                    );
                })}
            </PostBox>
        </Container>
    );
};
