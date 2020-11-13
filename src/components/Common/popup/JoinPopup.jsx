import React, { useState } from "react";
import styled from "styled-components";
import Portal from "../../../libs/portal";
import { useMutation } from "@apollo/client";
import { JOIN } from "../../../pages/Auth/auth";

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 100;
    position: fixed;
    height: fit-content;
    left: 0;
    top: 25%;
    right: 0;
`;

const Overlay = styled.div`
    box-sizing: border-box;
    display: ${props => (props.visible ? "flex" : "none")};
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 10;
`;

const Input = styled.input`
    height: 3rem;
    width: 20rem;
    padding: 1rem;
    margin-bottom: 2rem;
    background-color: #f7f9fa;
    border: none;
    font-weight: 400;
    border-radius: 5px;
`;

const Btn = styled.button`
    background: #ffc548;
    width: 20rem;
    height: 3rem;
    color: #5a1c28;
    border-radius: 5px;
    font-weight: 400;
`;

const JoinPopup = ({ setVisible, visible, history }) => {
    const [joinData, setJoinData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const [JoinMutation] = useMutation(JOIN, {});

    const onSubmit = async e => {
        e.preventDefault();
        if (
            joinData.email !== "" &&
            joinData.password !== "" &&
            joinData.firstName !== "" &&
            joinData.lastName !== ""
        ) {
            try {
                const {
                    data: { join }
                } = await JoinMutation({ variables: { ...joinData } });
                console.log(join);
                if (!join) {
                    alert("다시 입력해주세요.");
                } else {
                    setVisible(false);
                }
            } catch {
                alert("다시 시도해주세요.");
                history.push("/feed");
            }
        } else {
            alert("다시 시도해주세요.");
        }
    };

    return (
        <Portal elementId={"popup_root"}>
            <Overlay visible={visible} onClick={() => setVisible(!visible)} />
            <Wrapper className="join_box">
                <div className="phone">
                    <Input
                        onChange={e => setJoinData({ ...joinData, email: e.target.value })}
                        type="number"
                        placeholder="학번"
                    />
                </div>
                <Input
                    className="first_name"
                    onChange={e => setJoinData({ ...joinData, firstName: e.target.value })}
                    placeholder="성"
                />
                <Input
                    className="last_name"
                    onChange={e => setJoinData({ ...joinData, lastName: e.target.value })}
                    placeholder="이름"
                />

                <div className="password">
                    <Input
                        className="input_password"
                        onChange={e => setJoinData({ ...joinData, password: e.target.value })}
                        type="password"
                        placeholder="비밀번호"
                    />
                </div>
                <div className="bottom">
                    <Btn onClick={onSubmit}>가입하기</Btn>
                </div>
            </Wrapper>
        </Portal>
    );
};

export default JoinPopup;
