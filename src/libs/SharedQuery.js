import { gql } from "@apollo/client";

export const ME = gql`
    {
        me {
            meId: id
            fullName
            avatar
            departmentName
            rooms {
                id
                notReadMessagesCount
                participantId
                myId
            }
            followings {
                id
                fullName
                isFollow
                avatar
            }
            followers {
                avatar
                fullName
                isFollow
            }
        }
    }
`;
export const NEW_MESSAGE = gql`
    subscription newMessageForNotification($id: Int!) {
        newMessageForNotification(id: $id) {
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

export const SUB_ME = gql`
    subscription meForNotification($id: Int!) {
        meForNotification(id: $id)
    }
`;

export const SUBSCRIBTION_COMMENT = gql`
    subscription commentNotification($id: Int!) {
        commentNotification(id: $id) {
            message
            isRead
            postId
            roomId
            sender {
                id
            }
        }
    }
`;

export const SUBSCRIBTION_COMMENT_CHILD = gql`
    subscription childCommentNotification($id: Int!) {
        childCommentNotification(id: $id) {
            message
            isRead
            postId
            roomId
            sender {
                id
            }
        }
    }
`;
export const GET_MESSEGES = gql`
    query getMessagesForNotification($id: Int!) {
        getMessagesForNotification(id: $id) {
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
export const MY_CHAT_ROOMS = gql`
    {
        me {
            id
            rooms {
                id
                existMessage
                notReadMessagesCount
                participants {
                    id
                    avatar
                    departmentName
                    fullName
                }
            }
        }
    }
`;
export const GET_NOTIFICATIONS = gql`
    {
        getNotifications {
            id
            message
            isRead
            postId
            roomId
            createdAt
            sender {
                fullName
            }
        }
    }
`;
