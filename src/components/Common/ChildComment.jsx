import React, { useState } from "react";
import styled from "styled-components";
import Avatar from "./Avatar";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem 0rem 0.5rem 3rem;
    flex-direction: column;
    cursor: pointer;
`;
const ChildBox = styled.div`
    width: 100%;
    display: flex;
`;
const TextBox = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    line-height: 1.5rem;
    background-color: #eee;
    padding: 0.5rem;
    border-radius: 10px;
`;

const UserName = styled.span`
    font-weight: bold;
    font-size: 0.8rem;
`;
const Text = styled.span`
    font-size: 0.8rem;
`;
const InputBox = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 0 0 3rem;
`;

const Nomination = styled.span`
    position: absolute;
    font-size: 0.9rem;
    font-weight: bold;
    top: 42%;
    left: 3.4rem;
`;
const CommentInput = styled.input`
    border: none;
    background: #eee;
    margin-top: 0.3rem;
    padding: 0.8rem;
    width: 100%;
    padding-left: 4.2rem;
    border-radius: 10px;
`;
const ChildComment = ({ child, addChildComment, postId, commentId }) => {
    const [visible, setVisible] = useState(false);
    const [text, setText] = useState("");
    return (
        <Wrapper>
            <ChildBox className="child_box" onClick={() => setVisible(!visible)}>
                <Avatar src={child.user.avatar} size={2} />
                <TextBox>
                    <UserName>{child.user.fullName}</UserName>
                    <Text>{"@" + child.targetUser.fullName + " " + child.text}</Text>
                </TextBox>
            </ChildBox>
            {visible ? (
                <InputBox>
                    <Nomination>@{child.user.fullName}</Nomination>
                    <CommentInput
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onKeyPress={e => {
                            if (e.key === "Enter") {
                                addChildComment({
                                    e: e,
                                    text: text,
                                    postId: postId,
                                    targetCommentId: commentId,
                                    targetUserId: child.user.myId
                                });
                                setVisible(false);
                                setText("");
                            }
                        }}
                    />
                </InputBox>
            ) : null}
        </Wrapper>
    );
};

export default ChildComment;
