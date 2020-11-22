import React, { useState } from "react";
import styled from "styled-components";
import NotificationList from "../../components/Notifications/NotificationList";

const Container = styled.div`
    max-width: 1024px;
    width: 100%;
    min-height: 100vh;
    height: 100%;
    padding: 3rem 0 3rem 0;
`;

const NotiBox = styled.div`
    display: flex;
    flex-direction: column;
`;

const NotificationsPresenter = ({ data, loading, korFormat, toggleActive }) => {
    const { year, month, day, hour, minute, second } = korFormat;
    const startDate = new Date(year, month, day, hour, minute, second);

    return (
        <Container>
            {loading ? (
                "is Loading...."
            ) : (
                <NotiBox>
                    {data.getNotifications.map(notification => {
                        const date = notification.createdAt.split("T")[0].split("-");
                        const time = notification.createdAt.split(" ")[1].split(":");

                        var endDate = new Date(
                            parseInt(date[0]),
                            parseInt(date[1]),
                            parseInt(date[2]),
                            parseInt(time[0]),
                            parseInt(time[1]),
                            parseInt(time[2])
                        );
                        const x = (startDate - endDate) / (1000 * 60 * 60);

                        return (
                            <NotificationList
                                data={notification}
                                key={notification.id}
                                date={x}
                                toggleActive={toggleActive}
                            />
                        );
                    })}
                </NotiBox>
            )}
        </Container>
    );
};

export default NotificationsPresenter;
