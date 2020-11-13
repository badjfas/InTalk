import React, { Fragment } from "react";
import styled from "styled-components";
import PostCard from "../Common/PostCard";
import PostInput from "../Common/PostInput";
import PostPopup from "../Common/popup/PostPopup";

const Container = styled.div`
    max-width: 1024px;
    min-height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;
const PostBox = styled.div``;
export default ({
    visible,
    setVisible,
    text,
    setText,
    refetch,
    postData,
    toggleLike,
    addComment,
    addChildComment,
    user
}) => {
    return (
        <Container>
            {visible ? (
                <PostPopup
                    setVisible={setVisible}
                    text={text}
                    refetch={refetch}
                    visible={visible}
                    setText={setText}
                    user={user}
                />
            ) : null}
            <PostInput setVisible={setVisible} visible={visible} text={text} />
            <PostBox>
                {postData?.seePosts?.rows?.map(post => {
                    return (
                        <PostCard
                            key={post.postId}
                            {...post}
                            toggleLike={toggleLike}
                            addComment={addComment}
                            addChildComment={addChildComment}
                        />
                    );
                })}
            </PostBox>
        </Container>
    );
};
