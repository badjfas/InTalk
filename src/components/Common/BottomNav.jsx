import React from "react";
import { ImFacebook2, ImOmega } from "react-icons/im";
import { AiFillHome } from "react-icons/ai";
import { BsPeopleFill, BsPeopleCircle, BsPlusCircleFill } from "react-icons/bs";
import { FiMonitor } from "react-icons/fi";
import { TiGroup } from "react-icons/ti";

import { FaFacebookMessenger, FaBell } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    position: fixed;
    bottom: 0;
    max-width: 1024px;
    display: flex;
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

const Navi = styled(NavLink)`
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

const Nav = () => {
    return (
        <Container>
            <Navi to="/" exact activeClassName="selected">
                <AiFillHome />
            </Navi>
            <Navi to="/friends" activeClassName="selected">
                <BsPeopleFill />
            </Navi>
            <Navi to="/group" activeClassName="selected">
                <TiGroup />
            </Navi>
            <Navi to="/undefinde2" activeClassName="selected">
                <BsPeopleCircle />
            </Navi>
        </Container>
    );
};

export default Nav;
