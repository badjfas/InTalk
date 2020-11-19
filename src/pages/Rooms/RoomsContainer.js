import { useQuery, useSubscription } from "@apollo/client";
import React, { useEffect } from "react";
import { DecodeToken } from "../../libs/decodeToken";
import { MY_CHAT_ROOMS, SUB_ME } from "../../libs/SharedQuery";
import RoomsPresenter from "./RoomsPresenter";

const RoomsContainer = () => {
    const { data: roomsData, refetch } = useQuery(MY_CHAT_ROOMS);

    const { user } = DecodeToken(localStorage.getItem("token"));

    const { data } = useSubscription(SUB_ME, {
        variables: {
            id: parseInt(user.id)
        }
    });

    const refetchData = async () => {
        return await refetch();
    };
    useEffect(() => {
        if (data === undefined) {
            return;
        } else {
            refetchData();
        }
    }, [data]);

    return <RoomsPresenter roomsData={roomsData} />;
};

export default RoomsContainer;
