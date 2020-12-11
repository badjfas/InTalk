import React from "react";
import styled from "styled-components";
import FriendCard from "../../components/Common/FriendCard";
import ProfilePopup from "../../components/Common/popup/ProfilePopup";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Container = styled.div`
    max-width: 1024px;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    background-color: #fff;
    padding: 3rem 0 3rem 0;
`;

const FreindsBox = styled.div`
    display: flex;
    flex-direction: column;
`;
const FriendsPresenter = ({
    visible,
    setVisible,
    onClickAddFriend,
    enterChatRoom,
    userProfileData,
    getProfile,
    history,
    loading,
    me
}) => {
    return (
        <Container className="friends">
            {visible.open ? (
                <ProfilePopup
                    visible={visible}
                    setVisible={setVisible}
                    onClickAddFriend={onClickAddFriend}
                    getProfile={getProfile}
                    userProfileData={userProfileData}
                    history={history}
                    enterChatRoom={enterChatRoom}
                />
            ) : null}

            <FreindsBox>
                {loading ? (
                    <div style={{ lineHeight: 2 }}>
                        <SkeletonTheme color="#F3F6FB" highlightColor="#fff">
                            <Skeleton height={"3rem"} count={12} />
                        </SkeletonTheme>
                    </div>
                ) : (
                    me.followings.map(user => {
                        if (!user?.isMe) {
                            return (
                                <FriendCard
                                    key={user.id}
                                    userInfoData={user}
                                    visible={visible}
                                    setVisible={setVisible}
                                />
                            );
                        }
                    })
                )}
            </FreindsBox>
        </Container>
    );
};

export default FriendsPresenter;
