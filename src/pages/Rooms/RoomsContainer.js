import { useQuery, useSubscription } from "@apollo/client";
import React, { useEffect } from "react";
import { DecodeToken } from "../../libs/decodeToken";
import { MY_CHAT_ROOMS, SUB_ME } from "../../libs/SharedQuery";
import RoomsPresenter from "./RoomsPresenter";

const RoomsContainer = () => {
    const { data: roomsData, refetch, loading } = useQuery(MY_CHAT_ROOMS, {});

    const { user } = DecodeToken(localStorage.getItem("token"));

    const { data } = useSubscription(SUB_ME, {
        variables: {
            id: parseInt(user.id)
        }
    });
    console.log(roomsData);
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
    if (loading) return <div>is loading</div>;

    return <RoomsPresenter roomsData={roomsData} />;
};

export default RoomsContainer;
