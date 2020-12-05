import React, { Fragment } from "react";
import styled from "styled-components";
import Avatar from "./Avatar";
import ProfilePopup from "./popup/ProfilePopup";

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0.5rem;
    background-color: #fff;
    &:hover {
        background-color: #f9f9f9;
        > span {
            color: #000;
        }
    }
`;

const UserName = styled.span`
    padding-left: 0.5rem;
    font-weight: 600;
    font-size: 0.85rem;
`;

const Major = styled.span`
    font-weight: 600;
    font-size: 0.65rem;
    margin-left: 1rem;
    display: flex;
    align-items: center;
    color: #999;
    height: 100%;
`;

export default ({ userInfoData, visible, setVisible, location }) => {
    return (
        <Fragment>
            <Container
                onClick={
                    location
                        ? null
                        : () => {
                              setVisible({
                                  id: userInfoData.id,
                                  open: !visible.open
                              });
                          }
                }
            >
                <Avatar size={2.5} radius={30} src={userInfoData.avatar} />
                <UserName>{userInfoData.fullName}</UserName>
                <Major>{userInfoData.departmentName}</Major>
                {location ? <button>친구 추가</button> : null}
            </Container>
        </Fragment>
    );
};
