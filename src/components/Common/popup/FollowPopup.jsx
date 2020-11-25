import React, { useState } from "react";
import styled from "styled-components";
import Portal from "../../../libs/portal";
import ListBar from "../ListBar";
import { IoMdArrowRoundBack } from "react-icons/io";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 100;
    height: 100%;
    width: 100%;
    top: 0;
    padding-top: 3rem;
    background-color: #fff;
`;

const Overlay = styled.div`
    box-sizing: border-box;
    display: ${props => (props.visible ? "flex" : "none")};
    align-items: center;
    position: fixed;
    width: 100%;
    top: 0;
    height: 3rem;
    background-color: #fff;
    z-index: 9999;
    svg {
        color: #000;
        font-size: 1.5rem;
        margin-left: 0.5rem;
    }
`;

const Tab = styled.div`
    display: flex;
    justify-content: center;
    height: 2rem;
    > div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        color: #999;
        cursor: pointer;
    }
    .selected {
        font-weight: 600;
        color: #000;
        border-bottom: 2px solid #000;
    }
`;

const FollowPopup = ({ popup, setPopup, data }) => {
    const [tabs, setTab] = useState([
        {
            id: 0,
            title: "팔로잉"
        },
        {
            id: 1,
            title: "팔로워"
        }
    ]);

    const [selected, setSelected] = useState(0);
    return (
        <Portal elementId={"popup_root"}>
            <Overlay visible={popup.followPopup}>
                <IoMdArrowRoundBack onClick={() => setPopup({ ...popup, followPopup: false })} />
            </Overlay>
            <Wrapper>
                <Tab>
                    {tabs.map((tab, index) => (
                        <div className={selected === tab.id ? "selected" : null} onClick={() => setSelected(tab.id)}>
                            {tab.title}
                        </div>
                    ))}
                </Tab>
                {data.me.followers.map(follower => {
                    if (selected === 0) {
                        return <ListBar text={follower.fullName} src={follower.avatar} />;
                    }
                })}
                {data.me.followings.map(following => {
                    if (selected === 1) {
                        return <ListBar text={following.fullName} src={following.avatar} />;
                    }
                })}
            </Wrapper>
        </Portal>
    );
};

export default FollowPopup;
