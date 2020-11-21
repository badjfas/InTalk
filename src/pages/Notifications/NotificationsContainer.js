import { useQuery } from "@apollo/client";
import React from "react";
import { GET_NOTIFICATIONS } from "../../libs/SharedQuery";
import NotificationsPresenter from "./NotificationsPresenter";

const NotificationsContainer = () => {
    const { data, loading } = useQuery(GET_NOTIFICATIONS);
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
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
    console.log(second);
    return <NotificationsPresenter data={data} loading={loading} korFormat={korFormat} />;
};

export default NotificationsContainer;
