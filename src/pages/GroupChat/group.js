import { gql } from "@apollo/client";

export const SEND_GROUP_MESSAGE = gql`
    mutation sendGroupMessage($roomId: Int!, $text: String, $timestamp: String!, $isRead: String!) {
        sendGroupMessage(roomId: $roomId, text: $text, timestamp: $timestamp, isRead: $isRead) {
            id
            roomId
            sender {
                id
                fullName
                avatar
            }
            isRead
            createdAt
        }
    }
`;

export const NEW_GROUP_MESSAGE = gql`
    subscription newGroupMessage($id: Int!) {
        newGroupMessage(id: $id) {
            id
            roomId
            text
            sender {
                id
                avatar
                fullName
            }
            isRead
            createdAt
        }
    }
`;

export const INVITE_CHAT = gql`
    mutation inviteGroupChat($userId: String!, $roomId: Int!) {
        inviteGroupChat(userId: $userId, roomId: $roomId)
    }
`;

export const GET_GROUP_MESSAGE = gql`
    query getGroupMessage($roomId: Int!) {
        getGroupMessage(roomId: $roomId) {
            id
            createdAt
            text
            isRead
            sender {
                id
                fullName
                avatar
            }
        }
    }
`;

export const SEE_ROOM_INFO = gql`
    query seeRoom($roomId: Int!) {
        seeRoom(roomId: $roomId) {
            id
            title
            participants {
                avatar
                id
                fullName
            }
        }
    }
`;
