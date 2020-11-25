import { useMutation, useQuery, useSubscription } from "@apollo/client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import TimeStamp from "../../libs/DatePicker";
import { DecodeToken } from "../../libs/decodeToken";
import { GET_GROUP_MESSAGE, NEW_GROUP_MESSAGE, SEND_GROUP_MESSAGE } from "./group";
import GroupChatPresenter from "./GroupChatPresenter";

const GroupChatContainer = () => {
    const timestamp = TimeStamp();

    const inputMessageRef = useRef(null);
    const messageBoxRef = useRef(null);

    const [message, setMessages] = useState([]);

    const [text, setText] = useState("");
    const { user: userData } = DecodeToken(localStorage.getItem("token"));
    const { data: oldMessage, loading } = useQuery(GET_GROUP_MESSAGE, {
        variables: {
            roomId: 1
        },
        onCompleted: () => setMessages(oldMessage.getGroupMessage)
    });
    //

    const [sendMessageMutation] = useMutation(SEND_GROUP_MESSAGE, {
        variables: {
            roomId: parseInt(1),
            text: text,
            timestamp: timestamp
        }
    });

    //Subscription
    const { data } = useSubscription(NEW_GROUP_MESSAGE, {
        variables: {
            id: parseInt(1)
        }
    });
    const handleNewMessage = () => {
        if (data !== undefined) {
            const { newGroupMessage } = data;
            setMessages(prev => [newGroupMessage, ...prev]);
        }
    };

    useEffect(() => {
        inputMessageRef.current.focus();
        handleNewMessage();
    }, [data]);
    console.log(data);
    useEffect(() => {
        if (messageBoxRef) {
            messageBoxRef.current.addEventListener("DOMNodeInserted", event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: "smooth" });
            });
        }
    }, []);
    return (
        <GroupChatPresenter
            userData={userData}
            messages={message}
            inputMessageRef={inputMessageRef}
            messageBoxRef={messageBoxRef}
            text={text}
            setText={setText}
            sendMessageMutation={sendMessageMutation}
            inputMessageRef={inputMessageRef}
            messageBoxRef={messageBoxRef}
        />
    );
};

export default GroupChatContainer;
