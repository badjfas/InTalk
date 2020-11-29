import React from "react";
import styled from "styled-components";
import { IoIosAddCircleOutline, IoIosRemoveCircle, IoMdArrowRoundBack } from "react-icons/io";
import FriendList from "./FriendList";

const Wrapper = styled.div`
    max-width: 1024px;
    width: 100%;
    height: 100vh;
    background-color: #fff;
    position: absolute;
    z-index: 2400;
`;

const Header = styled.div`
    display: flex;
    max-width: 1024px;

    align-items: center;
    height: 3rem;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #e9e9e9;
    position: fixed;
    top: 0;
    z-index: 2500;
    > svg {
        color: #000;
        font-size: 1.2rem;
        margin-left: 0.5rem;
    }
`;

const Box = styled.div`
    padding-top: 3rem;
    height: 100%;
    padding-bottom: 3rem;
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
`;

const Button = styled.div`
    position: fixed;
    bottom: 0;
    max-width: 1024px;

    height: 3rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => (props.length === 0 ? "#eee" : "#004680")};
    color: #fff;
    font-size: 0.8rem;
    font-weight: 600;
`;
const InvitationTab = ({
    userData,
    setTab,
    invite,
    setInvite,
    toggleInvite,
    inviteChatMutation,
    setVisible,
    roomId
}) => {
    return (
        <Wrapper>
            <Header>
                <IoMdArrowRoundBack
                    onClick={() => {
                        setTab(false);
                        setInvite([]);
                    }}
                />
            </Header>
            <Box>
                {userData?.me?.followings?.map(follow => {
                    return (
                        <FriendList data={follow} invite={invite} setInvite={setInvite} toggleInvite={toggleInvite} />
                    );
                })}
            </Box>
            <Button
                onClick={() => {
                    inviteChatMutation({
                        variables: {
                            roomId: parseInt(roomId),
                            userId: invite.join(",")
                        }
                    });
                    setTab(false);
                    setVisible(false);
                }}
                length={invite.length}
            >
                초대하기
            </Button>
        </Wrapper>
    );
};

export default InvitationTab;
