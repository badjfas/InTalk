import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ME } from "../../libs/SharedQuery";
import { CREATE_ROOM, FOLLOW, SEE_PROFILE, SEE_USERS } from "./friends";
import FriendsPresenter from "./FriendsPresenter";
const FriendsContainer = props => {
    const [visible, setVisible] = useState({
        id: 0,
        open: false
    });

    const { data: usersData } = useQuery(SEE_USERS);

    const { data: userProfile } = useQuery(SEE_PROFILE, {
        variables: {
            userId: parseInt(visible.id)
        }
    });

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
        />
    );
};

export default FriendsContainer;
