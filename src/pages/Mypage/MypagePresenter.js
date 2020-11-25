import React, { useState } from "react";
import styled from "styled-components";
import Avatar from "../../components/Common/Avatar";
import { RiSettings3Line } from "react-icons/ri";
import Drawer from "../../components/Mypage/Drawer";
import { FollowPopup } from "../../components/Common/popup";

const Container = styled.div`
    padding-top: 3rem;
    min-height: 100vh;
    width: 100%;
    max-width: 1024px;
`;

const UserBox = styled.div`
    width: 100%;
    display: flex;
    padding-top: 1rem;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .username {
        padding: 0.5rem 0.5rem 0.25rem 0.5rem;
        font-size: 1.5rem;
        font-weight: 700;
    }
    .major {
        padding: 0.5rem;
        font-size: 0.8rem;
        font-weight: 700;
    }
    button {
        position: absolute;
        left: 68%;
        top: 81%;
        background-color: transparent;
        font-size: 1.5rem;
    }
`;

const AvatarBox = styled.div`
    position: relative;
`;

const UserDetailBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.25rem;
    span {
        :not(:last-child) {
            margin-right: 1.5rem;
        }
    }
`;

export default ({ data, loading, queryData, setQueryData, visible, setVisible, popup, setPopup }) => {
    if (loading) return <Container>is Loading</Container>;

    return (
        <Container>
            {popup.followPopup ? <FollowPopup setPopup={setPopup} popup={popup} data={data} /> : null}
            <Drawer
                visible={visible}
                setVisible={setVisible}
                fullName={data?.me?.fullName}
                setQueryData={setQueryData}
                queryData={queryData}
            />
            <UserBox>
                <AvatarBox>
                    <Avatar size={10} src={data?.me?.avatar} radius={70} />
                    <button onClick={() => setVisible(!visible)}>
                        <RiSettings3Line />
                    </button>
                </AvatarBox>

                <span className="username">{data?.me?.fullName}</span>
                <span className="major">{data?.me?.departmentName}</span>
                <UserDetailBox>
                    <span onClick={() => setPopup({ ...popup, followPopup: true })}>
                        팔로잉 {data?.me?.followings.length}
                    </span>
                    <span onClick={() => setPopup({ ...popup, followPopup: true })}>
                        팔로워 {data?.me?.followers.length}
                    </span>
                    <span>내 게시물 {data?.me?.rooms.length}</span>
                </UserDetailBox>
            </UserBox>
        </Container>
    );
};
