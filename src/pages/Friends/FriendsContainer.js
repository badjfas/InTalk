import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { DecodeToken } from "../../libs/decodeToken";
import { CREATE_CHAT_ROOM, ME, MY_CHAT_ROOMS } from "../../libs/SharedQuery";
import { CREATE_ROOM, FOLLOW, SEE_PROFILE, SEE_USERS } from "./friends";
import FriendsPresenter from "./FriendsPresenter";

const FriendsContainer = props => {
    const [visible, setVisible] = useState({
        id: 0,
        open: false
    });
    const [loading, setLoading] = useState(true);
    const [usersData, setUserData] = useState({});
    const { user: me } = DecodeToken(localStorage.getItem("token"));
    const { data: mes, loading: l } = useQuery(ME, {
        onCompleted: () => setLoading(false)
    });
    //모든 유저
    const { data: userData } = useQuery(SEE_USERS, {
        onCompleted: () => setUserData(userData)
    });

    //나의 챗룸
    const [getRooms, { data: roomsData }] = useLazyQuery(MY_CHAT_ROOMS, {});

    //상대방 프로필
    const [getProfile, { data: userProfileData, refetch }] = useLazyQuery(SEE_PROFILE, {});

    //프로필 클릭시 챗룸 생성
    const [createChatRoom] = useMutation(CREATE_CHAT_ROOM, {
        ignoreResults: false
    });

    const enterChatRoom = async ({ userId, src, title }) => {
        try {
            await createChatRoom({
                variables: {
                    userId: userId,
                    title: `${title},${me.fullName}`,
                    src: `${src}@${me.avatar}`
                }
            }).then(({ data: { createGroupChat: { id } } }) => props.history.push(`/groupchat/${id}`));
        } catch (e) {
            console.warn(e);
        }
    };

    const [followMutation] = useMutation(FOLLOW);
    const onClickAddFriend = async friendId => {
        try {
            await followMutation({
                variables: {
                    followId: parseInt(friendId)
                }
            });
            const { data } = await refetch();
        } catch {
            alert("잠시 후 다시 시도해주세요.");
        }
    };
    useEffect(() => {
        if (loading) {
            return;
        } else {
            getRooms();
        }
    }, [visible.id, loading]);

    return (
        <FriendsPresenter
            {...props}
            usersData={usersData}
            onClickAddFriend={onClickAddFriend}
            visible={visible}
            setVisible={setVisible}
            enterChatRoom={enterChatRoom}
            {...mes}
            roomsData={roomsData}
            getProfile={getProfile}
            userProfileData={userProfileData}
            loading={loading}
        />
    );
};

export default FriendsContainer;
