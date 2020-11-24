import React from "react";
import styled from "styled-components";
import { BsX } from "react-icons/bs";
const Container = styled.div`
    display: ${props => (props.visible ? "flex" : "none")};
    width: ${props => (props.visible ? "100%" : "0")};
    max-width: 1024px;
    height: 100vh;
    z-index: 2000;
    background-color: #fff;
    top: 0;
    flex-direction: column;
    position: fixed;
`;

const Header = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 3rem;
    border-bottom: 1px solid #ddd;
    svg {
        font-size: 2rem;
    }
    span {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 3rem;
    }
`;

const MenuBox = styled.div`
    display: flex;
    flex-direction: column;
    .title1 {
        display: flex;
        height: 3rem;
        align-items: center;
        padding: 1rem;
        color: #8e8e8e;
        border-bottom: 1px solid #ddd;
    }
    > button {
        background: #fff;
        height: 3rem;
        text-align: start;
        border-bottom: 1px solid #ddd;
    }
`;
const Drawer = ({ visible, setVisible, fullName, queryData, setQueryData }) => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location = "/";
    };
    console.log(fullName);
    return (
        <Container visible={visible}>
            <Header onClick={() => setVisible(!visible)}>
                <span>메뉴</span>
                <BsX />
            </Header>
            <MenuBox>
                <div className="title1">계정</div>
                <button
                    onClick={() =>
                        setQueryData({
                            ...queryData,
                            edit: fullName
                        })
                    }
                >
                    프로필 편집
                </button>
                <button onClick={handleLogout}>로그아웃</button>
            </MenuBox>
        </Container>
    );
};

export default Drawer;
