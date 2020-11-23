import React from "react";
import styled from "styled-components";
import Avatar from "../Common/Avatar";

const Sender = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    position: relative;
    h1 {
        color: #999;
        position: absolute;
        right: 0;
        padding-right: 0.5rem;
        font-size: 0.7rem;
    }
    pre {
    }
`;

const Me = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    h1 {
        color: #999;
        padding-left: 0.5rem;
        font-size: 0.7rem;
    }
`;

const SenderTextBox = styled.pre`
    background-color: #eee;
    border-radius: 5px;
    padding: 0.5rem;
    font-size: 0.8rem;
    margin-left: 0.3rem;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
    min-height: 2.3rem;
    max-width: 250px;
    line-height: 1.3rem;
`;

const MeTextBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    font-size: 0.8rem;
    margin-right: 0.4rem;
`;

const MeText = styled.pre`
    border-radius: 5px;
    padding: 0.5rem;
    background-color: #eee;
    max-width: 250px;
    line-height: 1.3rem;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
`;

const TextBar = ({ type, message: m }) => {
    const createdAt = m?.createdAt?.split(" ")[1]?.split(":");
    const time = createdAt[0] + ":" + createdAt[1];
    if (type === "sender") {
        return (
            <Sender id="from" key={m.id}>
                <Avatar size={2.3} radius={70} src={m.fromUser.avatar} />
                <SenderTextBox>{m.text}</SenderTextBox>
                <h1>{time}</h1>
            </Sender>
        );
    } else {
        return (
            <Me id={m.id} key={m.id}>
                <h1>{time}</h1>
                <MeTextBox>
                    <MeText>{m.text}</MeText>
                </MeTextBox>
            </Me>
        );
    }
};

export default TextBar;
