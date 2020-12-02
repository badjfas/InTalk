import React, { Fragment } from "react";
import styled from "styled-components";

const Overlay = styled.div`
    display: ${props => (props.visible ? "flex" : "none")};
    flex-direction: column;
    position: fixed;
    z-index: 100;
    width: ${props => (props.visible ? "100%" : "0px")};
    height: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 100;
`;

const Wrapper = styled.div`
    display: flex;
    position: fixed;
    top: 3rem;
    width: 100%;
    background-color: #fff;
    z-index: 9999;
    max-width: 1024px;
    max-height: 50vh;
    margin: 0px auto;
    visibility: hidden;

    .actived {
        visibility: visible;
        padding: 1rem;
    }
`;

const Items = styled.div`
    display: flex;
    max-width: 1024px;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
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
        cursor: pointer;
        display: ${props => (props.visible ? "flex" : "none")};
    }
`;

const NotiDrawer = ({ setVisible, visible, data }) => {
    return (
        <Fragment>
            <Wrapper visible={visible}>
                <Fragment>
                    <Items visible={visible}>
                        {data?.getNotifications.map((notification, index) => {
                            if (index < 5) {
                                return (
                                    <Item
                                        key={notification.id}
                                        visible={visible}
                                        className={visible ? "actived" : null}
                                        onClick={() => (window.location.href = "/notifications")}
                                    >
                                        <span>{notification.message}</span>
                                    </Item>
                                );
                            }
                        })}
                    </Items>
                </Fragment>
            </Wrapper>
            <Overlay visible={visible} onClick={() => setVisible({ menu: false, participants: false })} />
        </Fragment>
    );
};

export default NotiDrawer;
