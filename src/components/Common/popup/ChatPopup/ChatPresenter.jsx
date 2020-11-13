import React from "react";
import styled from "styled-components";
import Portal from "../../../../libs/portal";
import Avatar from "../../Avatar";

const Wrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background-color: #fff;
    z-index: 9999;
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
            margin-left: 1rem;
            background-color: #eee;
            border-radius: 10px;
            height: 1rem;
            display: flex;
            align-items: center;
            padding: 1rem;
        }
        .to_chat_text {
            margin-left: 1rem;
            display: flex;
            align-items: center;

            justify-content: flex-end;
            width: 100%;
            > span {
                display: flex;
                align-items: center;
                border-radius: 10px;
                height: 1rem;
                padding: 1rem;
                background-color: #eee;
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
        height: 2rem;
        width: 100%;
    }
`;
export default ({ userData, setText, sendMessageMutation, messages, to, text, myInfo }) => {
    return (
        <Portal elementId={"chat_root"}>
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
                                <span className="from_chat_text">{m.text}</span>
                            ) : (
                                <div className="to_chat_text">{<span>{m.text}</span>}</div>
                            )}
                        </div>
                    ))}
                </ChatListBox>

                <InputBox className="submit_box">
                    <input
                        value={text}
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
