import React, { Fragment } from "react";
import styled from "styled-components";
import PostDetailCard from "../../components/Common/PostDetailCard";
import { IoMdArrowRoundBack } from "react-icons/io";

const Container = styled.div`
    max-width: 1024px;
    width: 100%;
    min-height: 100vh;
    padding-top: 3rem;
`;
const Header = styled.div`
    position: fixed;
    top: 0;
    width: 100%;
    height: 3rem;
    z-index: 2000;
    display: flex;
    align-items: center;
    background-color: #fff;
    svg {
        color: #004680;
        font-size: 1.5rem;
        margin-left: 0.5rem;
    }
`;
const PostDetailPresenter = ({ data, loading, history, toggleLike, addComment, addChildComment }) => {
    if (loading) return "is loading .. ";
    console.log(data);
    return (
        <Fragment>
            <Header>
                <IoMdArrowRoundBack onClick={() => (window.location.href = "/")} />
            </Header>
            <Container>
                <PostDetailCard
                    {...data?.seePost}
                    toggleLike={toggleLike}
                    addComment={addComment}
                    addChildComment={addChildComment}
                />
            </Container>
        </Fragment>
    );
};

export default PostDetailPresenter;
