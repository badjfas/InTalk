import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineMessage, AiOutlineMenu, AiOutlineSearch, AiOutlineBell } from "react-icons/ai";
import { BsPeople } from "react-icons/bs";
import { TiGroupOutline } from "react-icons/ti";
import { BiUserCircle } from "react-icons/bi";
import { CgAddR } from "react-icons/cg";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import NavDrawer from "./NavDrawer";
import NotiDrawer from "./NotiDrawer";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_NOTIFICATIONS } from "../../libs/SharedQuery";

const Container = styled.div`
    width: 100%;
    height: 100%;
    max-width: 1024px;
    svg {
        width: 1.5rem;
        height: 1.5rem;
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
        height: 3rem;
        border-radius: 0;
        border-top: 3px solid #ffc548;
        transition: 0.1s ease;
    }
`;

const NavBoxTop = styled.div`
    display: flex;
    width: 100%;
    margin: 0px auto;
    height: 3rem;
    max-width: 1024px;
    background-color: #0f4c82;
    justify-content: space-between;
    align-items: center;
    /* background-color: #fff; */
    box-shadow: 0 1px 5px 0 rgba(170, 170, 170, 0.7);
`;

const NaviTop = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    width: 2rem;
    height: 3rem;
    margin: 0 0.5rem 0 0.5rem;
    font-size: 1.5rem;
    position: relative;
    cursor: pointer;
    .noti_count {
        top: 8px;
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

const CountsBox = styled.div`
    display: flex;
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
    svg {
        fill: #004680;
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

    const [selected, setSelected] = useState("");
    useEffect(() => {
        switch (pathname) {
            case "/": {
                setSelected("Intalk");
                break;
            }
            case "/friends": {
                setSelected("/friends");
                break;
            }
            case "/add": {
                setSelected("/add");
                break;
            }
            case "/group": {
                setSelected("/group");
                break;
            }
            case "/mypage": {
                setSelected("/mypage");
                break;
            }
            default: {
                setSelected("/");
                break;
            }
        }
    }, [pathname]);

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
    //알림 갯수
    const [count, setCount] = useState({
        notification: 0,
        message: 0
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

    //알림 메뉴
    const { data, loading, refetch } = useQuery(GET_NOTIFICATIONS);
    const handelNotificationFetch = useCallback(() => {
        if (data === undefined) {
            return;
        } else {
            refetch();
        }
    }, [data, refetch]);

    useEffect(() => {
        if (visible.notifications || visible.menu) {
            document.documentElement.style.overflow = "hidden";
        } else {
            document.documentElement.style.overflow = "unset";
        }
    }, [visible.menu, visible.notifications]);

    return (
        <Container>
            {/* Drawer */}
            <NavDrawer visible={visible.menu} setVisible={setVisible} />
            <NotiDrawer data={data} loading={loading} visible={visible.notifications} setVisible={setVisible} />
            {/* Drawer */}

            <Top>
                <NavBoxTop>
                    <NaviTop
                        onClick={() =>
                            setVisible({
                                notifications: false,
                                menu: true
                            })
                        }
                    >
                        <Title>
                            <AiOutlineMenu />
                        </Title>
                    </NaviTop>
                    <NaviTop>
                        <Title
                            onClick={() => {
                                history.push("/");
                                setSelected("/");
                            }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                height: "100%",
                                fontFamily: "'Poppins', sans-serif"
                            }}
                        >
                            Intalk
                        </Title>
                    </NaviTop>
                    <CountsBox>
                        <NaviTop
                            onClick={() => {
                                handelNotificationFetch();
                                setVisible({ menu: false, notifications: !visible.notifications });
                            }}
                        >
                            {count.notification !== 0 ? <span className="noti_count">{count.notification}</span> : null}
                            <AiOutlineBell />
                        </NaviTop>
                        <NaviTop
                            onClick={() => {
                                history.push("/messages");
                            }}
                        >
                            {count.message !== 0 ? <span className="noti_count">{count.message}</span> : null}
                            <AiOutlineMessage />
                        </NaviTop>
                    </CountsBox>
                </NavBoxTop>
            </Top>
            <Bottom>
                <NavBox>
                    <NaviBottom
                        className={selected === "/" ? "selected" : null}
                        onClick={() => {
                            history.push("/");
                            setSelected("/");
                        }}
                    >
                        <AiOutlineHome />
                    </NaviBottom>
                    <NaviBottom
                        className={selected === "/friends" ? "selected" : null}
                        onClick={() => {
                            history.push("/friends");
                            setSelected("/friends");
                        }}
                    >
                        <BsPeople />
                    </NaviBottom>
                    <NaviBottom
                        className={selected === "/add" ? "selected" : null}
                        onClick={() => {
                            history.push("/add");
                            setSelected("/add");
                        }}
                    >
                        <CgAddR />
                    </NaviBottom>
                    <NaviBottom
                        className={selected === "/group" ? "selected" : null}
                        onClick={() => {
                            history.push("/group");
                            setSelected("/group");
                        }}
                    >
                        <TiGroupOutline />
                    </NaviBottom>
                    <NaviBottom
                        className={selected === "/mypage" ? "selected" : null}
                        onClick={() => {
                            setSelected("/mypage");
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
