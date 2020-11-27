import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { IoMdArrowRoundBack, IoMdPersonAdd, IoMdMenu } from "react-icons/io";
import TextBar from "../../components/Chat/TextBar";
import { FaPaperPlane } from "react-icons/fa";
import MenuDrawer from "../../components/Chat/MenuDrawer";
import InvitationTab from "../../components/Chat/InvitaionTab";
const Header = styled.div`
    position: fixed;
    height: 3rem;
    width: 100%;
    top: 0;
    z-index: 1200;
    max-width: 1024px;
    display: flex;
    position: relative;
    align-items: center;
    background-color: #004680;
    .left {
        cursor: pointer;
        position: absolute;
        left: 10px;
        svg {
            fill: #fff;
            font-size: 1.5rem;
        }
    }
    .right {
        cursor: pointer;
        position: absolute;
        right: 10px;
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

const Container = styled.div`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: absolute;
    margin: 0px auto;
    top: 0;
    background-color: #fff;
    z-index: 1000;
    padding-top: 48px;
    max-width: 1024px;
`;

const ChatListBox = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    overflow-y: scroll;
    width: 100%;
    height: 100%;
    flex-flow: column-reverse;
    margin-bottom: 48px;
    ::-webkit-scrollbar {
        display: none;
    }
    /* justify-content: flex-end; */
`;

const InputBox = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0;
    > input {
        border: 1px solid #eee;
        background-color: #eee;
        height: 3rem;
        width: calc(100% - 3rem);
        padding-left: 1rem;
        color: #393939;
        ::placeholder {
            color: #292929;
        }
    }
    > button {
        right: 0;
        width: 3rem;
        height: 100%;
        position: absolute;
        background-color: #eee;
        svg {
            font-size: 1.5rem;
        }
    }
    .fill {
        background-color: #000;
        color: #fff;
    }
`;
const SENDER = "sender";
const ME = "me";
const GroupChatPresenter = ({
    userData,
    messages,
    text,
    setText,
    sendMessageMutation,
    inputMessageRef,
    messageBoxRef,
    inviteChatMutation,
    participants,
    invite,
    setInvite,
    toggleInvite,
    roomId
}) => {
    const [visible, setVisible] = useState(false);
    const [tab, setTab] = useState(false);
    console.log(participants);
    return (
        <Fragment>
            <MenuDrawer
                visible={visible}
                setVisible={setVisible}
                inviteChatMutation={inviteChatMutation}
                participants={participants}
                userData={userData}
                tab={tab}
                setTab={setTab}
                invite={invite}
            />
            {tab ? (
                <InvitationTab
                    userData={userData}
                    setTab={setTab}
                    setVisible={setVisible}
                    invite={invite}
                    setInvite={setInvite}
                    toggleInvite={toggleInvite}
                    roomId={roomId}
                    inviteChatMutation={inviteChatMutation}
                />
            ) : null}

            <Header>
                <span className="left" onClick={() => (window.location.href = "/messages")}>
                    <IoMdArrowRoundBack />
                </span>
                <span className="center">그룹채팅</span>
                <span className="right" onClick={() => setVisible(!visible)}>
                    <IoMdMenu />
                </span>
            </Header>
            <Container>
                <ChatListBox ref={messageBoxRef}>
                    {messages?.map(message => {
                        return userData?.me?.meId !== message.sender.id ? (
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
                        className={text !== "" ? "fill" : ""}
                        onClick={() => {
                            setText("");
                            sendMessageMutation();
                        }}
                    >
                        <FaPaperPlane />
                    </button>
                </InputBox>
            </Container>
        </Fragment>
    );
};

export default GroupChatPresenter;
