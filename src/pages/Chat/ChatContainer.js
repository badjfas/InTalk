import React, { useEffect, useRef, useState } from "react";
import ChatPresenter from "./ChatPresenter";
import { GET_MESSEGES, NEW_MESSAGE, SEND_MESSAGE } from "./chat";
import { useLazyQuery, useMutation, useQuery, useSubscription } from "@apollo/client";
import { DecodeToken } from "../../libs/decodeToken";
import { ME } from "../../libs/SharedQuery";
import { SEE_PROFILE } from "../Friends/friends";
const today = new Date();
export default props => {
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1; // 월
    let date = today.getDate(); // 날짜
    let hours = today.getHours(); // 시
    let minutes = today.getMinutes(); // 분
    let seconds = today.getSeconds(); // 초

    const timeStamp = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    const inputMessageRef = useRef(null);
    const messageBoxRef = useRef(null);
    const { user: userData } = DecodeToken(localStorage.getItem("token"));

    const {
        match: {
            params: { roomId, toId }
        }
    } = props;
    //상대방 정보 불러오기
    const [getUser, { data: to }] = useLazyQuery(SEE_PROFILE, {
        variables: {
            userId: parseInt(toId)
        }
    });
    //메시지 전송
    const [text, setText] = useState("");
    const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
        variables: {
            toId: parseInt(toId),
            message: text,
            timestamp: timeStamp
        }
    });

    //메시지 목록 불러오기
    const [messages, setMessages] = useState([]);
    const { data: oldMessages, error } = useQuery(GET_MESSEGES, {
        variables: {
            // receiver: parseInt(toId),
            sender: parseInt(toId),
            roomId: parseInt(roomId)
        },
        onCompleted: () => {
            setMessages(oldMessages.getMessages);
        }
    });

    //Subscription
    const { data } = useSubscription(NEW_MESSAGE, {
        variables: {
            id: parseInt(roomId)
        }
    });
    const handleNewMessage = () => {
        if (data !== undefined) {
            const { newMessage } = data;
            setMessages(prev => [...prev, newMessage]);
        }
    };
    useEffect(() => {
        getUser();
        inputMessageRef.current.focus();
        handleNewMessage();
    }, [data]);

    useEffect(() => {
        if (messageBoxRef) {
            messageBoxRef.current.addEventListener("DOMNodeInserted", event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: "smooth" });
            });
        }
    }, []);
    return (
        <ChatPresenter
            {...props}
            text={text}
            setText={setText}
            messages={messages}
            sendMessageMutation={sendMessageMutation}
            userData={userData}
            inputMessageRef={inputMessageRef}
            to={to}
            messageBoxRef={messageBoxRef}
        />
    );
};
