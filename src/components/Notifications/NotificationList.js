import React, { useState } from "react";
import styled from "styled-components";
import { GET_NOTIFICATIONS } from "../../libs/SharedQuery";

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

const NotificationList = ({ data, date, toggleActive, deleteMutation }) => {
    const [touchState, setTouch] = useState({
        touchstartX: 0,
        touchstartY: 0,
        touchendX: 0,
        touchendY: 0,
        touchoffsetX: 0,
        touchoffsetY: 0
    });

    const [target, setTarget] = useState();

    const onTouchStart = ({ e, target }) => {
        var touch = e.touches[0];
        touchState.touchstartX = touch.clientX;
        touchState.touchstartY = touch.clientY;
        setTarget(target);
    };

    const onTouchEnd = e => {
        if (e.touches.length === 0) {
            var touch = e.changedTouches[e.changedTouches.length - 1];
            touchState.touchendX = touch.clientX;
            touchState.touchendY = touch.clientY;

            touchState.touchoffsetX = touchState.touchendX - touchState.touchstartX;
            touchState.touchoffsetY = touchState.touchendY - touchState.touchstartY;

            if (Math.abs(touchState.touchoffsetX) >= 80 && Math.abs(touchState.touchoffsetY) <= 10) {
                if (touchState.touchoffsetX < 0) {
                    deleteMutation({
                        variables: {
                            id: parseInt(data.id)
                        },
                        refetchQueries: [{ query: GET_NOTIFICATIONS }]
                    });
                } else return;
            }
        }
    };
    return data.isRead ? (
        <Actived onTouchStart={e => onTouchStart({ e: e, target: data.id })} onTouchEnd={onTouchEnd}>
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
