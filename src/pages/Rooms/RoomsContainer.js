import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { MY_CHAT_ROOMS } from "../../libs/SharedQuery";
import RoomsPresenter from "./RoomsPresenter";

const RoomsContainer = () => {
    const [getRooms, { data: roomsData }] = useLazyQuery(MY_CHAT_ROOMS);
    useEffect(() => {
        let mounted = true;
        if (mounted === true) {
            getRooms();
        }
        return () => {
            mounted = false;
        };
    }, [getRooms]);
    console.log(roomsData);
    return <RoomsPresenter roomsData={roomsData} />;
};

export default RoomsContainer;
