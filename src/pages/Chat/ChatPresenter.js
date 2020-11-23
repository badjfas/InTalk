import React, { Fragment } from "react";
import styled from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";
import TextBar from "../../components/Chat/TextBar";
import { FaPaperPlane } from "react-icons/fa";
const Header = styled.div`
    position: fixed;
    height: 3rem;
    width: 100%;
    top: 0;
    z-index: 1200;
    max-width: 1024px;
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
`;

const ChatListBox = styled.div`
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    width: 100%;
    ::-webkit-scrollbar {
        display: none;
    }
    /* justify-content: flex-end; */
`;

const InputBox = styled.div`
    width: 100%;
    position: relative;
    > input {
        border: 1px solid #eee;
        background-color: #eee;
        height: 3rem;
        width: 100%;
        padding-left: 1rem;
    }
    > button {
        right: 2%;
        top: 18%;
        position: absolute;
        svg {
            font-size: 1.5rem;
        }
    }
`;
const SENDER = "sender";
const ME = "me";
export default ({ userData, setText, sendMessageMutation, messages, to, text, inputMessageRef, messageBoxRef }) => {
    return (
        <Fragment>
            <Header>
                <span className="left" onClick={() => (window.location.href = "/messages")}>
                    <IoMdArrowRoundBack />
                </span>
                <span className="center">{to?.seeProfile?.fullName}</span>
            </Header>
            <Wrapper className="chat_room">
                <ChatListBox ref={messageBoxRef}>
                    {messages?.map(message => {
                        return userData.id !== parseInt(message.fromUser.id) ? (
                            <TextBar key={message.id} type={SENDER} message={message} />
                        ) : (
                            <TextBar key={message.id} type={ME} message={message} />
                        );
                    })}
                </ChatListBox>

                <InputBox className="submit_box">
                    <input
                        placeholder="메시지를 입력해주세요."
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
                    <button
                        onClick={() => {
                            setText("");
                            sendMessageMutation();
                        }}
                    >
                        <FaPaperPlane />
                    </button>
                </InputBox>
            </Wrapper>
        </Fragment>
    );
};
