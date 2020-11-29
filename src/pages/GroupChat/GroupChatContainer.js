import { useMutation, useQuery, useSubscription } from "@apollo/client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import TimeStamp from "../../libs/DatePicker";
import { DecodeToken } from "../../libs/decodeToken";
import { ME } from "../../libs/SharedQuery";
import {
    GET_GROUP_MESSAGE,
    INVITE_CHAT,
    ISONLINE,
    NEW_GROUP_MESSAGE,
    SEE_ROOM_INFO,
    SEND_GROUP_MESSAGE
} from "./group";
import GroupChatPresenter from "./GroupChatPresenter";

const GroupChatContainer = props => {
    let arr = [];
    const [moreMessages, setMoreMessages] = useState(false);
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
    const { data: oldMessage, loading, refetch } = useQuery(GET_GROUP_MESSAGE, {
        variables: {
            roomId: parseInt(id),
            limit: 50
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
    const handleNewMessage = async () => {
        if (data !== undefined) {
            const { newGroupMessage } = data;
            const { data: d } = await refetch();
            setMessages(prev => [
                // {
                //     ...newGroupMessage,
                //     isRead:
                //         newGroupMessage.isRead
                //             ?.split(",")
                //             ?.filter(e => parseInt(e) !== user.id)
                //             ?.join(",") ?? newGroupMessage.isRead
                // },
                ...d.getGroupMessage
            ]);
        }
    };

    useEffect(() => {
        inputMessageRef.current.focus();
        handleNewMessage();
    }, [data]);
    const config = { attributes: true, childList: true, subtree: true };

    const scrollToBottom = useCallback((mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === "childList") {
                mutation.target.scroll({ top: mutation.target.scrollHeight, behavior: "smooth" });
            }
        }
    }, []);

    useEffect(() => {
        if (messageBoxRef) {
            const observer = new MutationObserver(scrollToBottom);
            const targetNode = messageBoxRef.current;
            observer.observe(targetNode, config);
            return () => {
                observer.disconnect();
            };
        }
    });

    const fetchMore = async () => {
        const scrollHeight = document.getElementById("chatlistbox").scrollHeight;
        const scrollTop = document.getElementById("chatlistbox").scrollTop;
        const clientHeight = document.getElementById("chatlistbox").clientHeight;

        if (scrollTop - clientHeight - 50 <= -scrollHeight) {
            try {
                const { data } = await refetch({
                    roomId: parseInt(id),
                    limit: message?.length + 25
                });
                setMessages([...data.getGroupMessage]);
            } catch (e) {
                console.warn(e);
            }
        }
    };
    console.log(moreMessages);
    //스크롤 랜더링
    useEffect(() => {
        document.getElementById("chatlistbox").addEventListener("scroll", fetchMore);
        return () => {
            document.getElementById("chatlistbox").removeEventListener("scroll", fetchMore);
        };
    });
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
            loading={loading}
            setMoreMessages={setMoreMessages}
        />
    );
};

export default GroupChatContainer;
