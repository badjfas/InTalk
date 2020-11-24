import React, { useEffect, useState } from "react";
import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { BsPeopleFill, BsPeopleCircle } from "react-icons/bs";
import { TiGroup } from "react-icons/ti";
import { CgAddR } from "react-icons/cg";
import { RiNotification3Fill } from "react-icons/ri";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
const Container = styled.div`
    width: 100%;
    height: 100%;
    max-width: 1024px;
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
        border-top: 3px solid #ffc548;
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
    background-color: #004680;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.01), 0 1px 1px rgba(0, 0, 0, 0.1);
    .selected {
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
    justify-content: space-between;
    align-items: center;
    background-color: #004680;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.01), 0 1px 1px rgba(0, 0, 0, 0.1);
`;

const NaviTop = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    width: 2rem;
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
    &:first-child {
        width: 100%;
        margin-left: 1rem;
    }
    &:nth-child(2) {
        margin-right: 0.6rem;
    }
    &:last-child {
        margin-right: 1rem;
    }
    svg {
        width: 1.8rem;
        height: 1.8rem;
    }
`;
const NaviBottom = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 9.7rem;
    height: 56px;
    color: white;

    svg {
        width: 1.8rem;
        height: 1.8rem;
    }
    :nth-child(3) {
        > svg {
            width: 1.8rem;
            height: 1.8rem;
        }
    }
`;
const Title = styled.span`
    font-weight: 600;
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
    useEffect(() => {
        if (pathname === "/") {
            setTitle("Intalk");
        } else if (pathname === "/messages") {
            setTitle("메시지");
        } else if (pathname === "/friends") {
            setTitle("친구");
        } else if (pathname === "/add") {
            setTitle("게시물 추가");
        } else if (pathname === "/group") {
            setTitle("학과");
        } else if (pathname === "/mypage") {
            setTitle("내 정보");
        } else {
            setTitle("알림");
        }
    }, [title, pathname]);
    return (
        <Container>
            <Top>
                <NavBoxTop>
                    <NaviTop
                        onClick={() => {
                            setTitle("Intalk");
                            history.push("/");
                        }}
                    >
                        <Title>{title}</Title>
                    </NaviTop>
                    <NaviTop
                        onClick={() => {
                            setTitle("알림");
                            history.push("/notifications");
                        }}
                    >
                        {count.notification !== 0 ? <span className="noti_count">{count.notification}</span> : null}
                        <RiNotification3Fill />
                    </NaviTop>
                    <NaviTop
                        onClick={() => {
                            setTitle("메세지");
                            history.push("/messages");
                        }}
                    >
                        {count.message !== 0 ? <span className="noti_count">{count.message}</span> : null}
                        <AiFillMessage />
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
                        <AiFillHome />
                    </NaviBottom>
                    <NaviBottom
                        className={pathname === "/friends" ? "selected" : null}
                        onClick={() => {
                            setTitle("친구");
                            history.push("/friends");
                        }}
                    >
                        <BsPeopleFill />
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
                        <TiGroup />
                    </NaviBottom>
                    <NaviBottom
                        className={pathname === "/mypage" ? "selected" : null}
                        onClick={() => {
                            setTitle("내 정보");
                            history.push("/mypage");
                        }}
                    >
                        <BsPeopleCircle />
                    </NaviBottom>
                </NavBox>
            </Bottom>
        </Container>
    );
};

export default Nav;
