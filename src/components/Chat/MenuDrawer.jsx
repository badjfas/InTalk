import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { IoIosAddCircleOutline, IoIosRemoveCircle, IoMdArrowRoundBack } from "react-icons/io";
import Avatar from "../Common/Avatar";
import ParticipantList from "./ParticipantList";
import AddBtn from "./AddBtn";

const Overlay = styled.div`
    display: ${props => (props.visible ? "flex" : "none")};
    flex-direction: column;
    position: absolute;
    z-index: 100;
    width: ${props => (props.visible ? "100%" : "0px")};
    height: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2000;
`;

const Wrapper = styled.div`
    max-width: 20rem;
    display: flex;
    width: ${props => (props.visible ? "75%" : "0px")};
    transition: width 0.2s ease-in;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    background-color: #fff;
    z-index: 2200;

    .back_arrow {
        display: flex;
        align-items: center;
        height: 3rem;
        width: 100%;
        border-bottom: 1px solid #e9e9e9;
        > svg {
            color: #000;
            font-size: 1.2rem;
            margin-left: 0.5rem;
        }
    }

    .invite_btn {
        position: fixed;
        bottom: 0;
        width: 50%;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

const MenuDrawer = ({ setVisible, visible, inviteChatMutation, participants, invite, setTab }) => {
    return (
        <Fragment>
            <Wrapper visible={visible}>
                <div className="back_arrow">
                    <IoMdArrowRoundBack onClick={() => setVisible(false)} />
                </div>
                {visible ? (
                    <Fragment>
                        <AddBtn setTab={setTab} />
                        <ParticipantList participants={participants} />
                    </Fragment>
                ) : null}
            </Wrapper>
            <Overlay visible={visible} onClick={() => setVisible(false)} />
        </Fragment>
    );
};

export default MenuDrawer;
