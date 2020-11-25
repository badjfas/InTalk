import { gql } from "@apollo/client";

export const SEND_GROUP_MESSAGE = gql`
    mutation sendGroupMessage($roomId: Int!, $text: String, $timestamp: String!) {
        sendGroupMessage(roomId: $roomId, text: $text, timestamp: $timestamp) {
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

export const GET_GROUP_MESSAGE = gql`
    query getGroupMessage($roomId: Int!) {
        getGroupMessage(roomId: $roomId) {
            id
            createdAt
            text
            sender {
                id
                fullName
                avatar
            }
        }
    }
`;
