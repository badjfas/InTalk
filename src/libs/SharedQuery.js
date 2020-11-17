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
                fullName
                isFollow
            }
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
