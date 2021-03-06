import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
    mutation sendMessage($toId: Int!, $message: String!, $timestamp: String!) {
        sendMessage(toId: $toId, message: $message, timestamp: $timestamp) {
            messageId: id
            room {
                id
            }
            fromUser {
                fullName
            }
            toUser {
                fullName
            }

            text
        }
    }
`;

export const NEW_MESSAGE = gql`
    subscription newMessage($id: Int) {
        newMessage(id: $id) {
            id
            toUser {
                id
                fullName
                avatar
            }
            fromUser {
                id
                fullName
                avatar
            }
            text
            createdAt
        }
    }
`;

export const GET_MESSEGES = gql`
    query getMessages($sender: Int, $receiver: Int, $roomId: Int) {
        getMessages(sender: $sender, receiver: $receiver, roomId: $roomId) {
            id
            room {
                id
            }
            toUser {
                id
                avatar
                fullName
            }
            fromUser {
                id
                avatar
                fullName
            }
            text
            createdAt
        }
    }
`;
