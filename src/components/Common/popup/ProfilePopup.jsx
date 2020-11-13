import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import Portal from "../../../libs/portal";
import Avatar from "../Avatar";
import { AiFillMessage } from "react-icons/ai";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import Chat from "./ChatPopup";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 100;
    position: fixed;
    height: fit-content;
    left: 0;
    top: 25%;
    right: 0;
`;

const Overlay = styled.div`
    box-sizing: border-box;
    display: ${props => (props.visible ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 10;
`;

const UserBox = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    span {
        color: #fff;
        font-weight: 600;
        margin-top: 1rem;
    }
`;

const OptBox = styled.div`
    margin-top: 10rem;
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
`;

const Message = styled.div`
    svg {
        font-size: 2rem;
        color: #fff;
    }
`;

const Button = styled.div`
    button {
        color: #fff;
        background-color: transparent;
        svg {
            font-size: 2rem;
        }
    }
`;
let to = {
    id: "",
    fullName: ""
};

const ProfilePopup = ({ userProfileData, visible, onClickAddFriend, setVisible }) => {
    const [chat, setChat] = useState({ visible: false, toUserId: 0 });
    useEffect(() => {
        console.log("profile Popup mounted");

        return () => {
            console.log("profile Popup Unmounted");
        };
    });
    return (
        <Fragment>
            {chat.visible ? <Chat to={to} setVisible={setVisible} visible={visible} /> : <div />}

            <Portal elementId={"popup_root"}>
                <Overlay
                    visible
                    onClick={() =>
                        setVisible({
                            id: 0,
                            open: false
                        })
                    }
                />
                <Wrapper>
                    <UserBox>
                        <Avatar size={5} radius={70} src={userProfileData?.seeProfile?.avatar} />
                        <span>{userProfileData?.seeProfile?.fullName}</span>
                        <span>{userProfileData?.seeProfile?.departmentName}</span>
                    </UserBox>

                    <OptBox>
                        <Message>
                            <AiFillMessage
                                onClick={() => {
                                    to.id = userProfileData?.seeProfile?.id;
                                    to.fullName = userProfileData?.seeProfile?.fullName;

                                    setChat({
                                        visible: !chat.visible
                                    });
                                }}
                            />
                        </Message>
                        <Button>
                            {userProfileData?.seeProfile?.isFollow ? (
                                <button onClick={() => onClickAddFriend(parseInt(userProfileData?.seeProfile?.id))}>
                                    <HiUserRemove />
                                </button>
                            ) : (
                                <button onClick={() => onClickAddFriend(parseInt(userProfileData?.seeProfile?.id))}>
                                    <HiUserAdd />
                                </button>
                            )}
                        </Button>
                    </OptBox>
                </Wrapper>
            </Portal>
        </Fragment>
    );
};

export default ProfilePopup;
