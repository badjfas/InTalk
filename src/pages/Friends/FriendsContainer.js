import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ME, MY_CHAT_ROOMS } from "../../libs/SharedQuery";
import { CREATE_ROOM, FOLLOW, SEE_PROFILE, SEE_USERS } from "./friends";
import FriendsPresenter from "./FriendsPresenter";

const FriendsContainer = props => {
    const [visible, setVisible] = useState({
        id: 0,
        open: false
    });

    //모든 유저
    const { data: usersData } = useQuery(SEE_USERS);

    //나의 챗룸
    const [getRooms, { data: roomsData }] = useLazyQuery(MY_CHAT_ROOMS);

    //상대방 프로필
    const { data: userProfile } = useQuery(SEE_PROFILE, {
        variables: {
            userId: parseInt(visible.id)
        }
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
                },
                refetchQueries: [
                    {
                        query: SEE_PROFILE,
                        variables: {
                            userId: parseInt(visible.id)
                        }
                    }
                ]
            });
        } catch {
            alert("잠시 후 다시 시도해주세요.");
        }
    };

    useEffect(() => {
        getRooms();
        return () => {
            setVisible({
                id: 0,
                open: false
            });
        };
    }, []);
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
        />
    );
};

export default FriendsContainer;
