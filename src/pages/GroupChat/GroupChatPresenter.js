import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { IoMdArrowRoundBack, IoMdMenu } from "react-icons/io";
import TextBar from "../../components/Chat/TextBar";
import { FaPaperPlane } from "react-icons/fa";
import MenuDrawer from "../../components/Chat/MenuDrawer";
import InvitationTab from "../../components/Chat/InvitaionTab";
import Spinner from "../../components/Common/Spinner";
const Header = styled.div`
    position: fixed;
    padding: 1rem;
    width: 100%;
    top: 0;
    z-index: 2100;
    max-width: 1024px;
    display: flex;
    position: fixed;
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
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    margin: 0px auto;
    background-color: #fff;
    z-index: 2000;
    max-width: 1024px;
`;

const ChatListBox = styled.div`
    display: flex;
    height: calc(100% - 6rem);
    position: relative;
    width: 100%;

    .inner_box {
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        flex-flow: column-reverse;
        width: 100%;
    }
    ::-webkit-scrollbar {
        display: none;
    }
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
    onSubmitMessage,
    inputMessageRef,
    messageBoxRef,
    inviteChatMutation,
    participants,
    invite,
    setInvite,
    toggleInvite,
    roomId,
    fetchMore,
    loading
}) => {
    const [visible, setVisible] = useState(false);
    const [tab, setTab] = useState(false);
    return (
        <Fragment>
            <Container>
                <Header>
                    <span className="left" onClick={() => (window.location.href = "/messages")}>
                        <IoMdArrowRoundBack />
                    </span>
                    <span className="center">그룹채팅</span>
                    <span className="right" onClick={() => setVisible(!visible)}>
                        <IoMdMenu />
                    </span>
                </Header>
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
                {loading ? <Spinner size={24} /> : null}
                <ChatListBox id="chatlistbox">
                    <div
                        className="inner_box"
                        ref={messageBoxRef}
                        onScroll={() => {
                            fetchMore();
                        }}
                    >
                        {messages?.map(message => {
                            return userData?.me?.meId !== message.sender.id ? (
                                <TextBar key={message.id} type={SENDER} message={message} />
                            ) : (
                                <TextBar key={message.id} type={ME} message={message} />
                            );
                        })}
                    </div>
                </ChatListBox>
                <InputBox className="submit_box">
                    <input
                        placeholder="메시지를 입력해주세요."
                        value={text}
                        ref={inputMessageRef}
                        onChange={e => {
                            setText(e.target.value);
                        }}
                        onKeyPress={e => {
                            if (e.key === "Enter") {
                                setText("");
                                onSubmitMessage();
                            }
                        }}
                    />
                    <button
                        className={text !== "" ? "fill" : ""}
                        onClick={() => {
                            setText("");
                            onSubmitMessage();
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
