import React from "react";
import styled from "styled-components";
import Avatar from "../Common/Avatar";

const Sender = styled.div`
    display: flex;
    align-items: center;
    margin: 0 0 1rem 0.2rem;
    position: relative;
    h1 {
        color: #999;
        padding-left: 0.5rem;
        font-size: 0.3rem;
        position: relative;
        top: 0;
        height: 100%;
    }
`;

const Me = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
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
    background-color: #b7c5d3;
    max-width: 250px;
    line-height: 1.3rem;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
    position: relative;
    color: #3b3c47;
    div {
        color: #999;
        padding-left: 0.5rem;
        font-size: 0.3rem;
        position: absolute;
        height: 100%;
        left: -39px;
        top: 0;
    }
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
                <MeTextBox>
                    <MeText>
                        <div>{time}</div>
                        {m.text}
                    </MeText>
                </MeTextBox>
            </Me>
        );
    }
};

export default TextBar;
