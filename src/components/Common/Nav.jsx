import React, { useEffect, useRef, useState } from "react";
import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { BsPeopleFill, BsPeopleCircle } from "react-icons/bs";
import { TiGroup } from "react-icons/ti";

import { NavLink, useHistory } from "react-router-dom";
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

const NaviTop = styled(NavLink)`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    width: 2rem;
    &:first-child {
        width: 100%;
        margin-left: 1rem;
    }
    &:last-child {
        margin-right: 1rem;
    }
    svg {
        width: 1.8rem;
        height: 1.8rem;
    }
`;
const NaviBottom = styled(NavLink)`
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
`;
const Title = styled.span`
    font-weight: 600;
    width: 100%;
`;
let tt = "Intalk";

const Nav = () => {
    let titleRef = useRef(null);
    const [clicked, setClick] = useState(false);
    const history = useHistory();
    const {
        location: { pathname }
    } = history;

    useEffect(() => {
        if (pathname === "/") {
            titleRef.current.innerText = "Intalk";
        } else if (pathname === "/messages") {
            titleRef.current.innerText = "메시지";
        } else if (pathname === "/friends") {
            titleRef.current.innerText = "친구";
        } else if (pathname === "/group") {
            titleRef.current.innerText = "학부";
        } else if (pathname === "/mypage") {
            titleRef.current.innerText = "내 정보";
        } else {
            titleRef.current.innerText = "Intalk";
        }
        return () => {
            setClick(false);
        };
    }, [clicked, pathname]);
    return (
        <Container>
            <Top>
                <NavBoxTop>
                    <NaviTop to="/" exact activeClassName="selected" onClick={() => setClick(!clicked)}>
                        <Title ref={titleRef}>{tt}</Title>
                    </NaviTop>
                    <NaviTop to="/messages" activeClassName="selected" onClick={() => setClick(!clicked)}>
                        <AiFillMessage />
                    </NaviTop>
                </NavBoxTop>
            </Top>
            <Bottom>
                <NavBox>
                    <NaviBottom to="/" exact activeClassName="selected" onClick={() => setClick(!clicked)}>
                        <AiFillHome />
                    </NaviBottom>
                    <NaviBottom to="/friends" activeClassName="selected" onClick={() => setClick(!clicked)}>
                        <BsPeopleFill />
                    </NaviBottom>
                    <NaviBottom to="/group" activeClassName="selected" onClick={() => setClick(!clicked)}>
                        <TiGroup />
                    </NaviBottom>
                    <NaviBottom to="/mypage" activeClassName="selected" onClick={() => setClick(!clicked)}>
                        <BsPeopleCircle />
                    </NaviBottom>
                </NavBox>
            </Bottom>
        </Container>
    );
};

export default Nav;
