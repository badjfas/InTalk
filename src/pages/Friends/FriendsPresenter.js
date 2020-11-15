import React from "react";
import styled from "styled-components";
import FriendCard from "../../components/Common/FriendCard";
import ProfilePopup from "../../components/Common/popup/ProfilePopup";

const Container = styled.div`
    max-width: 1024px;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    padding: 3rem 0 3rem 0;
`;

const FreindsBox = styled.div`
    display: flex;
    flex-direction: column;
`;
const FriendsPresenter = ({
    usersData,
    visible,
    setVisible,
    userProfileData,
    onClickAddFriend,
    createChatRoom,
    roomsData
}) => {
    return (
        <Container className="friends">
            {visible.open ? (
                <ProfilePopup
                    visible={visible.open}
                    userProfileData={userProfileData}
                    onClickAddFriend={onClickAddFriend}
                    setVisible={setVisible}
                    visible={visible}
                    roomsData={roomsData}
                />
            ) : null}

            <FreindsBox>
                {usersData?.seeUsers?.map(user => {
                    if (!user?.isMe) {
                        return (
                            <FriendCard
                                key={user.userId}
                                userInfoData={user}
                                visible={visible}
                                setVisible={setVisible}
                                createChatRoom={createChatRoom}
                            />
                        );
                    }
                })}
            </FreindsBox>
        </Container>
    );
};

export default FriendsPresenter;
