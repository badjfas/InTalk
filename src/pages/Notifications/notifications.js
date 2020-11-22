import { gql } from "@apollo/client";

export const SEE_MAJORS = gql`
    {
        seeMajors {
            id
            departmentName
        }
    }
`;

export const TOGGLE_NOTIFICATION = gql`
    mutation toggleNotification($id: Int!) {
        toggleNotification(id: $id)
    }
`;
