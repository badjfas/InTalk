import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ME, MY_CHAT_ROOMS } from "../../libs/SharedQuery";
import { CREATE_ROOM, FOLLOW, SEE_PROFILE, SEE_USERS } from "./friends";
import FriendsPresenter from "./FriendsPresenter";

const FriendsContainer = props => {
    const [visible, setVisible] = useState({
        id: 0,
        open: false
    });
    const [usersData, setUserData] = useState({});

    //모든 유저
    const { data: userData } = useQuery(SEE_USERS, {
        onCompleted: () => setUserData(userData)
    });

    //나의 챗룸
    const [getRooms, { data: roomsData }] = useLazyQuery(MY_CHAT_ROOMS);

    //상대방 프로필
    const [userProfile, setUserProfile] = useState({});
    const [getProfile, { data: userProfileData, refetch, loading }] = useLazyQuery(SEE_PROFILE, {
        variables: {
            userId: parseInt(visible.id)
        },
        onCompleted: () => setUserProfile({ ...userProfileData })
    });

    //프로필 클릭시 챗룸 생성
    const [createChatRoom] = useMutation(CREATE_ROOM, {
        variables: {
            toId: parseInt(visible.id)
        },
        refetchQueries: [
            {
                query: ME
            }
        ]
    });

    const [followMutation] = useMutation(FOLLOW);
    const onClickAddFriend = async friendId => {
        try {
            await followMutation({
                variables: {
                    followId: parseInt(friendId)
                }
            });
            const { data } = await refetch();
            setUserProfile({ ...data });
        } catch {
            alert("잠시 후 다시 시도해주세요.");
        }
    };
    useEffect(() => {
        getRooms();
        if (visible.id !== 0) {
            getProfile();
        }
    }, [visible]);
    return (
        <FriendsPresenter
            {...props}
            usersData={usersData}
            userProfileData={userProfile}
            onClickAddFriend={onClickAddFriend}
            visible={visible}
            setVisible={setVisible}
            createChatRoom={createChatRoom}
            roomsData={roomsData}
            loading={loading}
        />
    );
};

export default FriendsContainer;
