import { gql } from "@apollo/client";

export const SEE_USERS = gql`
    {
        seeUsers {
            userId: id
            fullName
            isFollow
            isMe
            avatar
            departmentName
        }
    }
`;

export const SEE_PROFILE = gql`
    query seeProfile($userId: Int) {
        seeProfile(userId: $userId) {
            userId: id
            fullName
            isMe
            isFollow
            avatar
            departmentName
        }
    }
`;

export const FOLLOW = gql`
    mutation follow($followId: Int!) {
        follow(followId: $followId)
    }
`;

export const CREATE_ROOM = gql`
    mutation createRoom($toId: Int) {
        createRoom(toId: $toId) {
            id
        }
    }
`;
