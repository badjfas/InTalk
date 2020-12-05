import React from "react";
import styled from "styled-components";
import Avatar from "../Common/Avatar";

const Sender = styled.div`
    display: flexbox;
    align-items: center;
    margin: 0 0 1rem 0.2rem;
    width: fit-content;
    position: relative;
    h1 {
        display: flex;
        flex-flow: column-reverse;
        color: #999;
        padding-left: 0.5rem;
        font-size: 0.4em;
        display: flex;
        position: absolute;
        right: -2rem;
        height: 100%;
        /* justify-content: flex-end; */
    }
    h2 {
        color: #999;
        position: absolute;
        right: -10px;
        top: 28px;
        display: flex;
        font-size: 0.4rem;
    }
`;

const Me = styled.div`
    display: flexbox;
    position: relative;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 1rem;
`;

const SenderTextBox = styled.div`
    background-color: #eee;
    border-radius: 5px;
    padding: 0.5rem;
    font-size: 0.8rem;
    margin-left: 0.3rem;
    min-height: 2.3rem;
    max-width: 250px;
    line-height: 1.3rem;
    white-space: pre-wrap;
    overflow-wrap: break-word;
`;

const MeTextBox = styled.div`
    display: flexbox;
    align-items: center;
    justify-content: flex-end;
    font-size: 0.8rem;
    margin-right: 0.4rem;
    position: relative;
`;

const MeText = styled.div`
    border-radius: 5px;
    padding: 0.5rem;
    background-color: #b7c5d3;
    max-width: 250px;
    line-height: 1.3rem;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
    position: relative;
    color: #3b3c47;
`;

const SenderName = styled.div`
    font-size: 0.7rem;
    margin: 0 0 0.3rem 0.3rem;
`;

const CountsBox = styled.div`
    position: relative;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    height: 100%;
    margin: 0 0.2rem 0 0.2rem;
    span {
        font-size: 0.45rem;
    }
    .readCount {
        display: flex;
        justify-content: flex-end;
    }
    .left {
        text-align: left;
    }
`;

const TextBar = ({ type, message: m }) => {
    const createdAt = m?.createdAt?.split(" ")[1]?.split(":");
    const time = createdAt[0] + ":" + createdAt[1];
    if (type === "sender") {
        return (
            <Sender id="from" key={m.id}>
                {m.sender ? (
                    <Avatar size={2.3} radius={70} src={m.sender.avatar} />
                ) : (
                    <Avatar size={2.3} radius={70} src={m?.fromUser?.avatar} />
                )}
                <div>
                    {m.sender ? (
                        <SenderName>{m.sender.fullName}</SenderName>
                    ) : (
                        <SenderName>{m.fromUser.fullName}</SenderName>
                    )}
                    <SenderTextBox>{m.text}</SenderTextBox>
                </div>
                <CountsBox>
                    <span className="left">{m.isRead.split(",").length}</span>
                    <span>{time}</span>
                </CountsBox>
            </Sender>
        );
    } else {
        return (
            <Me id={m.id} key={m.id}>
                <CountsBox>
                    <span className="readCount">{m.isRead.split(",").length}</span>
                    <span className="time">{time}</span>
                </CountsBox>
                <MeTextBox>
                    <MeText>{m.text}</MeText>
                </MeTextBox>
            </Me>
        );
    }
};

export default TextBar;
