import { gql } from "@apollo/client";

export const SEND_MESSAGE = gql`
    mutation sendMessage($toId: Int!, $message: String!) {
        sendMessage(toId: $toId, message: $message) {
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
        }
    }
`;
// export const NEW_MESSAGE = gql`
//     subscription {
//         newMessage(roomId: 2) {
//             messageId: id
//             toUser {
//                 fullName
//             }
//             fromUser {
//                 fullName
//             }
//             text
//         }
//     }
// `;

export const GET_MESSEGES = gql`
    query getMessages($userId: Int!, $_userId: Int!) {
        getMessages(userId: $userId, _userId: $_userId) {
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
        }
    }
`;
