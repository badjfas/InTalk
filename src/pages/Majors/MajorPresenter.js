import React, { Fragment } from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";
import FriendCard from "../../components/Common/FriendCard";
import ProfilePopup from "../../components/Common/popup/ProfilePopup";

const Wrapper = styled.div`
    overflow: scroll;
    padding-top: 3rem;
    padding-bottom: 2rem;
`;
const MajorPresenter = ({
    data,
    loading,
    history,
    visible,
    setVisible,
    onClickAddFriend,
    getProfile,
    userProfileData,
    enterChatRoom,
    me
}) => {
    return loading ? (
        <Skeleton />
    ) : (
        <Wrapper>
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
            {data.seeUsers.map(user => {
                return <FriendCard userInfoData={user} visible={visible} setVisible={setVisible} me={me} />;
            })}
        </Wrapper>
    );
};

export default MajorPresenter;
