import React, { useState } from "react";
import styled from "styled-components";
import Avatar from "./Avatar";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0.5rem 0rem 0.5rem 3rem;
    flex-direction: column;
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
    padding: 0 0 0 2.7rem;
`;

const Nomination = styled.span`
    position: absolute;
    font-size: 0.9rem;
    font-weight: bold;
    top: 46%;
    left: 3rem;
`;
const CommentInput = styled.input`
    border: none;
    background: #eee;
    margin-top: 0.3rem;
    padding: 0.8rem;
    width: 100%;
    padding-left: 4.3rem;
    border-radius: 10px;
`;
const ChildComment = ({ childId, text, user, targetUser }) => {
    const [visible, setVisible] = useState(false);
    console.log(targetUser);
    return (
        <Wrapper>
            <ChildBox className="child_box" onClick={() => setVisible(!visible)}>
                <Avatar src={user.avatar} size={2} />
                <TextBox>
                    <UserName>{user.fullName}</UserName>
                    <Text>{text}</Text>
                </TextBox>
            </ChildBox>
            {visible ? (
                <InputBox>
                    <Nomination>@{targetUser.fullName}</Nomination>
                    <CommentInput />
                </InputBox>
            ) : null}
        </Wrapper>
    );
};

export default ChildComment;
