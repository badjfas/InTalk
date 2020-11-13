import React, { Fragment } from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import ProfilePopup from "./popup/ProfilePopup";

const Container = styled.div`
    width: 100%;
    height: 3.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-left: 1rem;
`;

const UserName = styled.span`
    padding-left: 1rem;
    font-weight: 600;
`;

const Major = styled.span`
    font-weight: 600;
    font-size: 0.8rem;
    margin-left: 1rem;
    display: flex;
    align-items: center;
    height: 100%;
`;

export default ({ userInfoData, visible, setVisible, createChatRoom }) => {
    return (
        <Fragment>
            <Container
                onClick={async () => {
                    await createChatRoom({
                        variables: {
                            toId: parseInt(userInfoData.userId)
                        }
                    });
                    setVisible({
                        id: userInfoData.userId,
                        open: !visible.open
                    });
                }}
            >
                <Avatar size={2.5} radius={70} src={userInfoData.avatar} />
                <UserName>{userInfoData.fullName}</UserName>
                <Major>{userInfoData.departmentName}</Major>
            </Container>
        </Fragment>
    );
};
