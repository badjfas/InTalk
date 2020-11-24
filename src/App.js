import React, { useCallback, useEffect, useState } from "react";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import Theme from "./styles/Theme";
import GlobalStyles from "./styles/GlobalStyles";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Routes from "./Route";
import {
    NEW_MESSAGE,
    SUBSCRIBTION_COMMENT,
    SUBSCRIBTION_COMMENT_CHILD,
    GET_NOTIFICATIONS,
    MY_CHAT_ROOMS
} from "./libs/SharedQuery";
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
    const [notification, setNotification] = useState([]);
    const { data: getNotifications } = useQuery(GET_NOTIFICATIONS, {
        onCompleted: () => setNotification(getNotifications.getNotifications)
    });
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
    const [messageCount, setMessageCount] = useState(0);
    const { data: data4 } = useQuery(MY_CHAT_ROOMS, {
        onCompleted: ({ me: { rooms } }) => {
            let count = 0;
            rooms.map(m => {
                count = count + m.notReadMessagesCount;
            });
            setMessageCount(count);
        }
    });

    const handleNewMessage = useCallback(() => {
        if (data !== undefined) {
            const { newMessageForNotification } = data;
            let arr = [];
            arr.push(newMessageForNotification);
            setMessageCount(prev => {
                return prev + arr.length;
            });
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
            const { commentNotification } = data2;
            setNotification(prev => {
                return [...prev, commentNotification];
            });
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
            const { childCommentNotification } = data3;
            setNotification(prev => {
                return [...prev, childCommentNotification];
            });
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
    //
    useEffect(() => {
        if (isLogin) {
            const { user } = DecodeToken(localStorage.getItem("token"));
            setUser({ ...user });
        }
    }, [isLogin]);

    useEffect(() => {
        handleNewMessage();
    }, [data, handleNewMessage]);

    useEffect(() => {
        handleNewComment();
    }, [data2, handleNewComment]);

    useEffect(() => {
        handleNewChildComment();
    }, [data3, handleNewChildComment]);

    return (
        <ThemeProvider theme={Theme}>
            <Routes isLogin={isLogin} getNotifications={notification} messageCount={messageCount} />
            <ToastContainer />
            <GlobalStyles />
        </ThemeProvider>
    );
}

export default App;
