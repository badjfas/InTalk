import { gql } from "@apollo/client";

export const SEE_MAJORS = gql`
    {
        seeMajors {
            id
            departmentName
        }
    }
`;
