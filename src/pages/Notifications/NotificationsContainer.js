import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useCallback, useEffect, useState } from "react";
import { GET_NOTIFICATIONS } from "../../libs/SharedQuery";
import { DELETE_NOTIFICATION, TOGGLE_NOTIFICATION } from "./notifications";
import NotificationsPresenter from "./NotificationsPresenter";

const NotificationsContainer = () => {
    const [get, { data, loading }] = useLazyQuery(GET_NOTIFICATIONS);

    const [read] = useMutation(TOGGLE_NOTIFICATION, {});

    const [deleteMutation] = useMutation(DELETE_NOTIFICATION);

    const toggleActive = useCallback(
        id => {
            console.log(id);
            read({
                variables: {
                    id: parseInt(id)
                },
                refetchQueries: [{ query: GET_NOTIFICATIONS }]
            });
        },
        [read]
    );

    var date = new Date();
    var year = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var month = new String(date.getMonth() + 1);
    month = month >= 10 ? month : "0" + month; // month 두자리로 저장
    var day = new String(date.getDate());
    day = day >= 10 ? day : "0" + day;

    var korFormat = {
        year: year,
        month: parseInt(month),
        day: parseInt(day),
        hour: hour,
        minute: minute,
        second: second
    };
    useEffect(() => {
        if (loading && data === undefined) {
            return;
        } else {
            get();
        }
    }, [data, loading]);
    return (
        <NotificationsPresenter
            data={data}
            loading={loading}
            korFormat={korFormat}
            toggleActive={toggleActive}
            deleteMutation={deleteMutation}
        />
    );
};

export default NotificationsContainer;
