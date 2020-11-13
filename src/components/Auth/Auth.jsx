import React, { Fragment } from "react";
import styled from "styled-components";
import JoinPopup from "../Common/popup/JoinPopup";
const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #802438;
`;

const AuthBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    ::placeholder {
        font-weight: 400;
    }
`;

const Input = styled.input`
    height: 3rem;
    width: 20rem;
    padding: 1rem;
    margin-bottom: 2rem;
    background-color: #f7f9fa;
    border: none;
    font-weight: 400;
`;

const LoginBtn = styled.button`
    background-color: #ffc548;
    width: 20rem;
    height: 3rem;
    color: #882438;
    margin-bottom: 1rem;
    border-radius: 5px;
    font-weight: 400;
`;

const JoinBtn = styled.button`
    background-color: #ffc548;
    width: 20rem;
    height: 3rem;
    color: #882438;
    border-radius: 5px;
    font-weight: 400;
`;

const Auth = ({ visible, setVisible, onClickJoin, loginData, setLoginData, onSubmit, history }) => {
    return (
        <Wrapper>
            {visible ? <JoinPopup visible={visible} history={history} setVisible={setVisible} /> : null}

            <div className="flex_box">
                <div className="flex_box flex_center box ">
                    <AuthBox className="flex_box login_box flex_center">
                        <Input
                            className="login_content"
                            placeholder="이메일 또는 전화번호"
                            onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                        />
                        <Input
                            className="login_content"
                            placeholder="비밀번호"
                            type="password"
                            onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                        />
                        <LoginBtn className=" login_content login_btn" onClick={e => onSubmit(e)}>
                            로그인
                        </LoginBtn>
                        <JoinBtn className="join_btn" onClick={onClickJoin}>
                            새 계정 만들기
                        </JoinBtn>
                    </AuthBox>
                </div>
            </div>
        </Wrapper>
    );
};

export default Auth;
