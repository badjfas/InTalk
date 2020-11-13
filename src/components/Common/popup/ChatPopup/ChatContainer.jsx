import React, { useEffect, useState } from "react";
import ChatPresenter from "./ChatPresenter";
import { GET_MESSEGES, NEW_MESSAGE, SEND_MESSAGE } from "./chat";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { DecodeToken } from "../../../../libs/decodeToken";
import { ME } from "../../../../libs/SharedQuery";
let roomId;
export default ({ to }) => {
    const { user: userData } = DecodeToken(localStorage.getItem("token"));

    const { data: myInfo } = useQuery(ME);

    const [text, setText] = useState("");

    const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
        variables: {
            toId: parseInt(to.id),
            message: text
        }
    });

    roomId = myInfo?.me?.rooms?.filter(e => {
        if (e.participantId === parseInt(to.id)) {
            return e.participantId === parseInt(to.id);
        } else {
            return e.myId === parseInt(to.id);
        }
    });

    const [messages, setMessages] = useState([]);

    const { data: oldMessages, error } = useQuery(GET_MESSEGES, {
        variables: {
            userId: parseInt(to.id),
            _userId: parseInt(userData.id)
        },
        onCompleted: () => setMessages(oldMessages.getMessages)
    });

    const { data } = useSubscription(NEW_MESSAGE, {
        variables: {
            id: parseInt(roomId[0]?.id)
        }
    });

    const handleNewMessage = () => {
        if (data !== undefined) {
            const { newMessage } = data;
            setMessages(prev => [...prev, newMessage]);
        }
    };
    console.log(to, roomId);

    useEffect(() => {
        handleNewMessage();
    }, [data]);
    return (
        <ChatPresenter
            text={text}
            setText={setText}
            messages={messages}
            sendMessageMutation={sendMessageMutation}
            userData={userData}
            to={to}
            myInfo={myInfo}
        />
    );
};
