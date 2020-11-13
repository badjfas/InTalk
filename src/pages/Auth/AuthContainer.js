import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { LOCAL_LOG_IN, LOGIN } from "./auth";
import AuthPresenter from "./AuthPresenter";

const AuthContainer = props => {
    const [visible, setVisible] = useState(false);

    const onClickJoin = e => {
        e.preventDefault();
        setVisible(true);
        if (visible) {
            setVisible(false);
        }
    };

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [loginMutation] = useMutation(LOGIN, {
        variables: {
            ...loginData
        }
    });
    const [localLogInMutation] = useMutation(LOCAL_LOG_IN, {});
    const onSubmit = async e => {
        e.preventDefault();
        if (loginData.email !== "" && loginData.password !== "") {
            try {
                const result = await loginMutation({ ...loginData });
                const {
                    data: { login: token }
                } = result;
                if (!token) {
                    return;
                } else {
                    props.history.push("/feed");

                    if (token !== "" && token !== undefined) {
                        const result = await localLogInMutation({ variables: { token } });
                        console.log(result);
                    } else {
                        alert("잠시후 다시 시도해주세요.");
                    }
                }
            } catch {
                alert("로그인 에러");
            }
        }
    };
    return (
        <AuthPresenter
            {...props}
            visible={visible}
            setVisible={setVisible}
            onClickJoin={onClickJoin}
            loginData={loginData}
            setLoginData={setLoginData}
            onSubmit={onSubmit}
        />
    );
};

export default AuthContainer;
