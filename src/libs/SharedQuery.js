import { gql } from "@apollo/client";

export const ME = gql`
    {
        me {
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
