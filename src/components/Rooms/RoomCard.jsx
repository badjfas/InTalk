import React from "react";
import styled from "styled-components";
import Avatar from "../Common/Avatar";
import { CgEnter } from "react-icons/cg";
import { Link } from "react-router-dom";
const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    svg {
        margin-left: auto;
        font-size: 1.5rem;
    }
`;

const Box = styled(Link)`
    width: 100%;
    display: flex;
    align-items: center;
    padding: 1rem;
    color: #000;
    cursor: pointer;
`;

const UserName = styled.span`
    margin-left: 1rem;
    font-weight: 600;
`;

const Major = styled.span`
    margin-left: 1rem;
    font-weight: 600;
    font-size: 0.65rem;
    line-height: 2rem;
`;

const NotReadCount = styled.span`
    margin-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ff5733;
    font-size: 0.8rem;
    color: #fff;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 70%;
`;
export default ({ room }) => {
    return (
        <Wrapper>
            <Box to={`/chat/${room.id}/${room.participants?.id}`}>
                <Avatar size={2} radius={70} src={room.participants?.avatar} />
                <UserName> {room.participants?.fullName} </UserName>
                <Major>{room.participants?.departmentName}</Major>
                {room.notReadMessagesCount !== 0 ? <NotReadCount>{room.notReadMessagesCount}</NotReadCount> : null}
                <CgEnter />
            </Box>
        </Wrapper>
    );
};
