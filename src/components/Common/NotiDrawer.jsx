import React, { Fragment } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    position: fixed;
    top: 3rem;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 9999;
    .actived {
        visibility: visible;
        padding: 1rem;
    }
`;

const Items = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const Item = styled.div`
    display: flex;
    width: 100%;
    visibility: hidden;
    transition: all 0.3s;
    align-items: center;
    font-weight: 500;
    padding: 0rem;
    border: 1px solid #eee;
    background-color: #fff;
    > span {
        display: ${props => (props.visible ? "flex" : "none")};
    }
`;

const NotiDrawer = ({ loading, visible, data }) => {
    return (
        <Fragment>
            <Wrapper visible={visible}>
                <Fragment>
                    <Items visible={visible}>
                        {data?.getNotifications.map(notification => {
                            return (
                                <Item visible={visible} className={visible ? "actived" : null}>
                                    <span>{notification.message}</span>
                                </Item>
                            );
                        })}
                    </Items>
                </Fragment>
            </Wrapper>
        </Fragment>
    );
};

export default NotiDrawer;
