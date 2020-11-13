import React from "react";
import { ImFacebook2, ImOmega } from "react-icons/im";
import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { BsPeopleFill, BsPeopleCircle, BsPlusCircleFill } from "react-icons/bs";
import { FiMonitor } from "react-icons/fi";
import { TiGroup } from "react-icons/ti";

import { FaFacebookMessenger, FaBell } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 3rem;
    position: fixed;
    max-width: 1024px;
    z-index: 102;
`;

const NavBox = styled.div`
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

const Navi = styled(NavLink)`
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    width: 2rem;
    &:first-child {
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

const Title = styled.span`
    font-weight: 600;
`;

const TopNav = () => {
    return (
        <Container>
            <NavBox>
                <Navi to="/" exact activeClassName="selected">
                    <Title>InTalk</Title>
                </Navi>
                <Navi to="/messages" activeClassName="selected">
                    <AiFillMessage />
                </Navi>
            </NavBox>
        </Container>
    );
};

export default TopNav;
