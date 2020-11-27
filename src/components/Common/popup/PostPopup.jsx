import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Portal from "../../../libs/portal";
import PostCard from "../PostCard";
import { IoMdArrowRoundBack } from "react-icons/io";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 1500;
    height: 100vh;
    width: 100%;
    top: 3rem;
    background-color: #fff;
`;

const Header = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    position: fixed;
    width: 100%;
    top: 0;
    height: 3rem;
    background-color: #000;
    z-index: 9999;
    svg {
        color: #eee;
        font-size: 1.5rem;
        margin-left: 0.5rem;
    }
`;

const PostPopup = ({
    isLiked,
    postId,
    setVisble,
    likesCount,
    user,
    contents,
    comments,
    firstComment,
    toggleLike,
    addComment,
    addChildComment,
    files
}) => {
    const [selected, setSelected] = useState(0);

    useEffect(() => {
        document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = `position: ""; top: "";`;
            window.scrollTo(0, parseInt(scrollY || "0") * -1);
        };
    }, []);
    return (
        <Portal elementId={"popup_root"}>
            <Header>
                <IoMdArrowRoundBack onClick={() => setVisble(false)} />
            </Header>
            <Wrapper>
                <PostCard
                    isLiked={isLiked}
                    likesCount={likesCount}
                    postId={postId}
                    user={user}
                    contents={contents}
                    comments={comments}
                    firstComment={firstComment}
                    toggleLike={toggleLike}
                    addComment={addComment}
                    addChildComment={addChildComment}
                    files={files}
                />
            </Wrapper>
        </Portal>
    );
};

export default PostPopup;
