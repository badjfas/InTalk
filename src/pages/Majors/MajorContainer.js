import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { DecodeToken } from "../../libs/decodeToken";
import { CREATE_CHAT_ROOM, SEE_USERS } from "../../libs/SharedQuery";
import { FOLLOW, SEE_PROFILE } from "../Friends/friends";
import { SEE_MAJORS } from "./major";
import MajorPresenter from "./MajorPresenter";

const MajorContainer = props => {
    const { data, loading } = useQuery(SEE_USERS);

    const [visible, setVisible] = useState({
        id: 0,
        open: false
    });
    const { user: me } = DecodeToken(localStorage.getItem("token"));

    const [getProfile, { data: userProfileData, refetch }] = useLazyQuery(SEE_PROFILE, {});

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
    return (
        <MajorPresenter
            data={data}
            loading={loading}
            {...props}
            visible={visible}
            setVisible={setVisible}
            onClickAddFriend={onClickAddFriend}
            getProfile={getProfile}
            userProfileData={userProfileData}
            enterChatRoom={enterChatRoom}
            me={me}
        />
    );
};

export default MajorContainer;
