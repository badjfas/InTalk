import React from "react";
import styled from "styled-components";
import Portal from "../../../../libs/portal";
import Avatar from "../../Avatar";
import { IoMdArrowRoundBack } from "react-icons/io";
const Header = styled.div`
    position: fixed;
    height: 3rem;
    width: 100%;
    top: 0;
    z-index: 1200;
    display: flex;
    align-items: center;
    background-color: #004680;
    .left {
        position: fixed;
        svg {
            fill: #fff;
            font-size: 1.5rem;
        }
    }
    .center {
        color: #fff;
        font-weight: 600;
        margin: 0px auto;
    }
`;

const Wrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: fixed;
    margin: 0px auto;
    top: 0;
    background-color: #fff;
    z-index: 1000;
    max-width: 1024px;
    ::-webkit-scrollbar {
        display: none;
    }
`;

const ChatListBox = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    height: 100%;
    width: 100%;
    justify-content: flex-end;
    .from {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        .from_chat_text {
            background-color: #eee;
            border-radius: 10px;
            display: flex;
            align-items: center;
            padding: 0.5rem;
            font-size: 0.8rem;
            white-space: pre-wrap;
        }
        .to_chat_text {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 100%;
            font-size: 0.8rem;
            > pre {
                display: flex;
                align-items: center;
                border-radius: 10px;
                padding: 0.5rem;
                background-color: #eee;
                white-space: pre-wrap;
            }
        }
        .from_user {
            display: flex;
            justify-content: center;
            align-items: center;
            > img {
                border-radius: 70%;
                width: 1.7rem;
                height: 1.7rem;
            }
        }
    }
`;

const InputBox = styled.div`
    width: 100%;
    > input {
        border-radius: 10px;
        border: 1px solid #eee;
        background-color: #eee;
        height: 3rem;
        width: 100%;
        padding-left: 1rem;
    }
`;
export default ({ userData, setText, sendMessageMutation, messages, to, text, inputMessageRef, onClickBackButton }) => {
    return (
        <Portal elementId={"chat_root"}>
            <Header>
                <span className="left" onClick={onClickBackButton}>
                    <IoMdArrowRoundBack />
                </span>
                <span className="center">{to.fullName}</span>
            </Header>
            <Wrapper className="chat_room">
                <ChatListBox className="chat_list_box" id="chat_list_box">
                    {messages?.map(m => (
                        <div className="from" id="from">
                            {userData.id !== parseInt(m.fromUser.id) ? (
                                <div className="from_user">
                                    <img src={m.fromUser.avatar} />
                                </div>
                            ) : null}
                            {userData.id !== parseInt(m.fromUser.id) ? (
                                <pre className="from_chat_text">{m.text}</pre>
                            ) : (
                                <div className="to_chat_text">{<pre>{m.text}</pre>}</div>
                            )}
                        </div>
                    ))}
                </ChatListBox>

                <InputBox className="submit_box">
                    <input
                        value={text}
                        ref={inputMessageRef}
                        onChange={e => setText(e.target.value)}
                        onKeyPress={e => {
                            if (e.key === "Enter") {
                                setText("");
                                sendMessageMutation();
                            }
                        }}
                    />
                </InputBox>
            </Wrapper>
        </Portal>
    );
};
