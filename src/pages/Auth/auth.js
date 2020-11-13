import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;

export const JOIN = gql`
    mutation join($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        join(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
            id
            email
        }
    }
`;

export const LOCAL_LOG_IN = gql`
    mutation logUserIn($token: String!) {
        logUserIn(token: $token) @client
    }
`;

export const ADMIN_LOG_IN = gql`
    mutation isAdmin($email: String!, $token: String!) {
        isAdmin(email: $email, token: $token) @client
    }
`;

export const LOCAL_LOG_OUT = gql`
    mutation logUserOut {
        logUserOut @client
    }
`;
