import React from "react";
import styled from "styled-components";
import RoomCard from "../../components/Rooms/RoomCard";

const Container = styled.div`
    max-width: 1024px;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    padding-top: 3rem;
`;
export default ({ roomsData }) => {
    return (
        <Container>
            {roomsData?.me?.rooms?.map((room, index) => {
                if (room?.participants?.id !== roomsData?.me?.id) {
                    if (room?.existMessage) {
                        return <RoomCard key={index} room={room} />;
                    }
                }
            })}
        </Container>
    );
};
