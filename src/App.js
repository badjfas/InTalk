import React, { useCallback, useEffect, useState } from "react";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import Theme from "./styles/Theme";
import GlobalStyles from "./styles/GlobalStyles";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import Routes from "./Route";
import { NEW_MESSAGE } from "./libs/SharedQuery";
import { DecodeToken } from "./libs/decodeToken";
const IS_LOGIN = gql`
    {
        isLogin @client
    }
`;

function App() {
    const {
        data: { isLogin }
    } = useQuery(IS_LOGIN);
    const [userData, setUser] = useState({});
    const { data } = useSubscription(NEW_MESSAGE, {
        variables: {
            id: parseInt(userData.id)
        }
    });

    const handleNewMessage = useCallback(() => {
        if (data !== undefined) {
            const { newMessageForNotification } = data;
            toast.dark(`${newMessageForNotification.fromUser.fullName} : ${newMessageForNotification.text}`, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        }
    }, [data]);

    useEffect(() => {
        if (isLogin) {
            const { user } = DecodeToken(localStorage.getItem("token"));
            setUser({ ...user });
        } else {
            return;
        }
        handleNewMessage();
    }, [data, isLogin, handleNewMessage]);

    return (
        <ThemeProvider theme={Theme}>
            <Routes isLogin={isLogin} />
            <ToastContainer />
            <GlobalStyles />
        </ThemeProvider>
    );
}

export default App;
