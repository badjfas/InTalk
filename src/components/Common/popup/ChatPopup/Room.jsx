import { useQuery, useSubscription } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { GET_MESSEGES, NEW_MESSAGE, SEND_MESSAGE } from "../../apollo/Queries/chat";
let unsub = null;
const style = {};
export default () => {
    const [messages, setMessages] = useState([]);

    const { data: oldMessages, loading } = useQuery(GET_MESSEGES, {
        variables: {
            roomId: 2
        },
        onCompleted: () => setMessages(oldMessages.getMessages)
    });

    const { data } = useSubscription(NEW_MESSAGE, {
        variables: {
            id: 2
        }
    });

    const handleNewMessage = () => {
        if (data !== undefined) {
            const { newMessage } = data;
            setMessages(prev => [...prev, newMessage]);
        }
    };
    console.log(messages);
    useEffect(() => {
        handleNewMessage();
    }, [data]);

    if (loading) {
        return "is Loading";
    } else {
        console.log();
        return (
            <div style={{ height: "100%", display: "flex", justifyContent: "center", flexDirection: "column" }}>
                {messages?.map(m => (
                    <span>{m.text}</span>
                ))}
            </div>
        );
    }
};
