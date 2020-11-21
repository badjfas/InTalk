import React, { useCallback, useEffect, useState } from "react";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import Theme from "./styles/Theme";
import GlobalStyles from "./styles/GlobalStyles";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Routes from "./Route";
import { NEW_MESSAGE, SUBSCRIBTION_COMMENT, SUBSCRIBTION_COMMENT_CHILD, GET_NOTIFICATIONS } from "./libs/SharedQuery";
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

    const { data: getNotifications, refetch } = useQuery(GET_NOTIFICATIONS, {});

    const [userData, setUser] = useState({});
    const { data } = useSubscription(NEW_MESSAGE, {
        variables: {
            id: parseInt(userData.id)
        }
    });
    const { data: data2 } = useSubscription(SUBSCRIBTION_COMMENT, {
        variables: {
            id: parseInt(userData.id)
        }
    });
    const { data: data3 } = useSubscription(SUBSCRIBTION_COMMENT_CHILD, {
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

    const handleNewComment = useCallback(() => {
        if (data2 !== undefined) {
            toast.warning(`게시글에 새로운 댓글이 달렸습니다.`, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        }
    }, [data2]);

    const handleNewChildComment = useCallback(() => {
        if (data3 !== undefined) {
            toast.dark(`새로운 댓글이 달렸습니다.`, {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            });
        }
    }, [data3]);
    useEffect(() => {
        if (isLogin) {
            const { user } = DecodeToken(localStorage.getItem("token"));
            setUser({ ...user });
        } else {
            return;
        }
        if (getNotifications === undefined) {
            return;
        } else {
            refetch();
        }
        handleNewMessage();
        handleNewComment();
        handleNewChildComment();
    }, [data, isLogin, handleNewMessage, handleNewComment, handleNewChildComment]);

    return (
        <ThemeProvider theme={Theme}>
            <Routes isLogin={isLogin} getNotifications={getNotifications} />
            <ToastContainer />
            <GlobalStyles />
        </ThemeProvider>
    );
}

export default App;
