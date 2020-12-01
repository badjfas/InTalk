import React, { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineMessage, AiOutlineMenu, AiOutlineSearch, AiOutlineBell } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { TiGroupOutline } from "react-icons/ti";
import { BiUserCircle } from "react-icons/bi";
import { CgAddR } from "react-icons/cg";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import NavDrawer from "./NavDrawer";
const Container = styled.div`
    width: 100%;
    height: 100%;
    max-width: 1024px;
    svg {
        width: 1.5rem;
        height: 1.5rem;
        fill: #004680;
        font-weight: 300;
    }
`;

const Top = styled.div`
    width: 100%;
    height: 3rem;
    position: fixed;
    max-width: 1024px;
    top: 0;
    z-index: 102;
`;

const Bottom = styled.div`
    width: 100%;
    height: 3rem;
    position: fixed;
    max-width: 1024px;
    bottom: 0;
    z-index: 102;
    .selected {
        border-radius: 0;
        border-top: 2px solid #ffc548;
        transition: 0.1s ease;
    }
`;
const NavBox = styled.div`
    max-width: 1024px;
    display: flex;
    margin: 0px auto;
    width: 100%;
    height: 3rem;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border-top: 2px solid #e9e9e9;
    .selected {
        border-radius: 0;
        border-top: 2px solid #ffc548;
        transition: 0.1s ease;
    }
`;

const NavBoxTop = styled.div`
    display: flex;
    width: 100%;
    margin: 0px auto;
    height: 3rem;
    max-width: 1024px;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(40, 50, 60, 0.15);
`;

const NaviTop = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    width: 2rem;
    margin: 0 0.5rem 0 0.5rem;
    font-size: 1.5rem;
    position: relative;
    cursor: pointer;
    .noti_count {
        top: 0;
        left: 15px;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ff5733;
        font-size: 0.65rem;
        color: #fff;
        width: 1rem;
        height: 1rem;
        border-radius: 70%;
    }
`;
const NaviBottom = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 9.7rem;
    height: 56px;
    color: white;
    &:nth-child(3) {
        color: #000;
    }
`;
const Title = styled.span`
    font-weight: 700;
    width: 100%;
`;
let currentPathname = null;
let currentSearch = null;

const Nav = ({ getNotifications, messageCount }) => {
    const history = useHistory();
    const {
        location: { pathname }
    } = history;
    const [title, setTitle] = useState("Intalk");
    const [count, setCount] = useState({
        notification: 0,
        message: 0
    });

    history.listen((newLocation, action) => {
        if (action === "PUSH") {
            if (newLocation.pathname !== currentPathname || newLocation.search !== currentSearch) {
                // Save new location
                currentPathname = newLocation.pathname;
                currentSearch = newLocation.search;

                // Clone location object and push it to history
                history.push({
                    pathname: newLocation.pathname,
                    search: newLocation.search
                });
            }
        } else {
            // Send user back if they try to navigate back
            history.go(1);
        }
    });
    useEffect(() => {
        if (getNotifications) {
            const counts = getNotifications?.filter(e => !e?.isRead).length;
            setCount({
                ...count,
                message: messageCount,
                notification: counts
            });
        } else {
            return;
        }
    }, [getNotifications, messageCount]);
    const [visible, setVisible] = useState({
        menu: false,
        notifications: false
    });
    return (
        <Container>
            <NavDrawer visible={visible.menu} setVisible={setVisible} />
            <Top>
                <NavBoxTop>
                    <NaviTop
                        onClick={() =>
                            setVisible({
                                ...visible,
                                menu: true
                            })
                        }
                    >
                        <Title>
                            <AiOutlineMenu />
                        </Title>
                    </NaviTop>
                    <NaviTop onClick={() => setVisible({ ...visible, menu: true })}>
                        <Title>
                            <AiOutlineSearch />
                        </Title>
                    </NaviTop>
                    <NaviTop
                        onClick={() => {
                            setTitle("알림");
                            history.push("/notifications");
                        }}
                    >
                        {count.notification !== 0 ? <span className="noti_count">{count.notification}</span> : null}
                        <AiOutlineBell />
                    </NaviTop>
                    <NaviTop
                        onClick={() => {
                            setTitle("메세지");
                            history.push("/messages");
                        }}
                    >
                        {count.message !== 0 ? <span className="noti_count">{count.message}</span> : null}
                        <AiOutlineMessage />
                    </NaviTop>
                </NavBoxTop>
            </Top>
            <Bottom>
                <NavBox>
                    <NaviBottom
                        className={pathname === "/" ? "selected" : null}
                        onClick={() => {
                            setTitle("Intalk");
                            history.push("/");
                        }}
                    >
                        <AiOutlineHome />
                    </NaviBottom>
                    <NaviBottom
                        className={pathname === "/friends" ? "selected" : null}
                        onClick={() => {
                            setTitle("친구");
                            history.push("/friends");
                        }}
                    >
                        <BsPeople />
                    </NaviBottom>
                    <NaviBottom
                        className={pathname === "/add" ? "selected" : null}
                        onClick={() => {
                            setTitle("게시물 추가 ");
                            history.push("/add");
                        }}
                    >
                        <CgAddR />
                    </NaviBottom>
                    <NaviBottom
                        className={pathname === "/group" ? "selected" : null}
                        onClick={() => {
                            setTitle("학과");
                            history.push("/group");
                        }}
                    >
                        <TiGroupOutline />
                    </NaviBottom>
                    <NaviBottom
                        className={pathname === "/mypage" ? "selected" : null}
                        onClick={() => {
                            setTitle("내 정보");
                            history.push("/mypage");
                        }}
                    >
                        <BiUserCircle />
                    </NaviBottom>
                </NavBox>
            </Bottom>
        </Container>
    );
};

export default Nav;
