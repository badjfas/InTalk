import React from "react";
import styled from "styled-components";

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

const Items = styled.div`
    display: flex;
    &:hover {
        background-color: #eee;
    }
    font-size: 0.9rem;
`;
const Item = styled.div`
    width: 100%;
    height: 3.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-left: 1rem;
`;
const NotificationsPresenter = ({ data, loading, korFormat }) => {
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
                            <Items key={notification.id}>
                                <Item>{notification.message}</Item>
                                <Item>{x.toFixed(0) + "시간전"}</Item>
                            </Items>
                        );
                    })}
                </NotiBox>
            )}
        </Container>
    );
};

export default NotificationsPresenter;
