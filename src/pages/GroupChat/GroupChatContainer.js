import { useMutation, useQuery, useSubscription } from "@apollo/client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import TimeStamp from "../../libs/DatePicker";
import { DecodeToken } from "../../libs/decodeToken";
import { ME } from "../../libs/SharedQuery";
import { GET_GROUP_MESSAGE, INVITE_CHAT, NEW_GROUP_MESSAGE, SEE_ROOM_INFO, SEND_GROUP_MESSAGE } from "./group";
import GroupChatPresenter from "./GroupChatPresenter";

const GroupChatContainer = props => {
    let arr = [];

    const inputMessageRef = useRef(null);
    const messageBoxRef = useRef(null);
    const {
        match: {
            params: { id }
        }
    } = props;

    const { user } = DecodeToken(localStorage.getItem("token"));

    //타임 스탬프
    const timestamp = TimeStamp();
    //친구 초대목록 핸들링
    const [invite, setInvite] = useState([]);
    const toggleInvite = id => {
        const isExist = invite.find(e => e === id);
        if (isExist) {
            setInvite(invite.filter(e => e !== id));
            return;
        } else {
            setInvite([...invite, id]);
        }
    };
    //내 정보
    const { data: userData } = useQuery(ME);

    //메시지 목록
    const [message, setMessages] = useState([]);
    const { data: oldMessage, loading } = useQuery(GET_GROUP_MESSAGE, {
        variables: {
            roomId: parseInt(id)
        },
        onCompleted: () => setMessages(oldMessage.getGroupMessage)
    });
    //참여자 정보
    const [receivers, setReceivers] = useState([]);
    const { data: participants } = useQuery(SEE_ROOM_INFO, {
        variables: {
            roomId: parseInt(id)
        },
        onCompleted: () => {
            participants.seeRoom.participants.map(e => {
                arr.push(e.id);
            });
            setReceivers(arr.filter(e => parseInt(e) !== user.id).join(","));
        }
    });

    //메시지 입력
    const [text, setText] = useState("");
    const [sendMessageMutation] = useMutation(SEND_GROUP_MESSAGE, {
        variables: {
            roomId: parseInt(id),
            text: text,
            timestamp: timestamp,
            isRead: receivers
        }
    });

    //Subscription
    const { data } = useSubscription(NEW_GROUP_MESSAGE, {
        variables: {
            id: parseInt(id)
        }
    });

    //상대 초대
    const [inviteChatMutation] = useMutation(INVITE_CHAT, {
        variables: {},
        refetchQueries: [
            {
                query: SEE_ROOM_INFO,
                variables: {
                    roomId: parseInt(id)
                }
            }
        ]
    });
    //메시지 업데이트
    const handleNewMessage = () => {
        if (data !== undefined) {
            console.log(data);
            const { newGroupMessage } = data;
            setMessages(prev => [newGroupMessage, ...prev]);
        }
    };
    useEffect(() => {
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
        <GroupChatPresenter
            userData={userData}
            messages={message}
            inputMessageRef={inputMessageRef}
            messageBoxRef={messageBoxRef}
            text={text}
            participants={participants}
            setText={setText}
            sendMessageMutation={sendMessageMutation}
            inputMessageRef={inputMessageRef}
            messageBoxRef={messageBoxRef}
            inviteChatMutation={inviteChatMutation}
            invite={invite}
            setInvite={setInvite}
            toggleInvite={toggleInvite}
            roomId={id}
        />
    );
};

export default GroupChatContainer;
