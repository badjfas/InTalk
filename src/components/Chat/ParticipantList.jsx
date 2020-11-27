import React from "react";
import styled from "styled-components";
import Avatar from "../Common/Avatar";

const Wrapper = styled.div`
    display: flex;
    position: fixed;
    flex-direction: column;
    top: 7rem;
    height: 50%;
    padding-bottom: 3rem;
`;

const Box = styled.div`
    align-items: center;
    display: flex;
    padding: 0.5rem 0 0.5rem 0.5rem;
`;

const Name = styled.span`
    margin-left: 0.4rem;
`;

const ParticipantList = ({ participants }) => {
    return (
        <Wrapper className="list">
            {participants?.seeRoom?.participants.map(e => {
                return (
                    <Box className="user_box">
                        <Avatar src={e.avatar} size={2.3} radius={30} />
                        <Name className="name">{e.fullName}</Name>
                    </Box>
                );
            })}
        </Wrapper>
    );
};

export default ParticipantList;
