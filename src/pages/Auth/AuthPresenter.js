import React, { Fragment } from "react";
import Auth from "../../components/Auth/Auth";

const AuthPresenter = ({ visible, setVisible, onClickJoin, loginData, setLoginData, onSubmit, hisotry }) => {
    return (
        <Fragment>
            <Auth
                hisotry={hisotry}
                visible={visible}
                setVisible={setVisible}
                onClickJoin={onClickJoin}
                loginData={loginData}
                setLoginData={setLoginData}
                onSubmit={onSubmit}
            />
        </Fragment>
    );
};

export default AuthPresenter;
