import React, { Fragment } from "react";
import styled from "styled-components";
import { IoMdArrowRoundBack } from "react-icons/io";

const Overlay = styled.div`
    display: ${props => (props.visible ? "flex" : "none")};
    flex-direction: column;
    position: fixed;
    z-index: 100;
    width: ${props => (props.visible ? "100%" : "0px")};
    height: 100%;
    top: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9000;
`;

const Wrapper = styled.div`
    max-width: 20rem;
    display: flex;
    width: ${props => (props.visible ? "50%" : "0px")};
    transition: width 0.2s ease-in;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #fff;
    z-index: 9999;

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

const Items = styled.div`
    display: flex;
    position: absolute;
    top: 3rem;
    flex-direction: column;
    width: 100%;
`;

const Item = styled.div`
    display: flex;
    width: 100%;
    height: 3rem;
    justify-content: center;
    align-items: center;
    font-weight: 500;
`;

const NavDrawer = ({ setVisible, visible, participants, setTab }) => {
    return (
        <Fragment>
            <Wrapper visible={visible}>
                <div className="back_arrow">
                    <IoMdArrowRoundBack onClick={() => setVisible({ menu: false, participants: false })} />
                </div>
                {visible ? (
                    <Fragment>
                        <Items>
                            <Item onClick={() => (window.location.href = "http://student.induk.ac.kr/KR/login.do")}>
                                학교 홈페이지
                            </Item>
                        </Items>
                    </Fragment>
                ) : null}
            </Wrapper>
            <Overlay visible={visible} onClick={() => setVisible({ menu: false, participants: false })} />
        </Fragment>
    );
};

export default NavDrawer;
