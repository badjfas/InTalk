import React from "react";
import styled from "styled-components";

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

const Actived = styled.div`
    display: flex;
    font-size: 0.9rem;
    background-color: #ddd;
`;

const NotificationList = ({ data, date, toggleActive }) => {
    return data.isRead ? (
        <Actived>
            <Item>{data.message}</Item>
            <Item>{date.toFixed(0) + "시간전"}</Item>
        </Actived>
    ) : (
        <Items onClick={() => toggleActive(data.id)}>
            <Item>{data.message}</Item>
            <Item>{date.toFixed(0) + "시간전"}</Item>
        </Items>
    );
};

export default NotificationList;
