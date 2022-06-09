import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation CreateUser($user: CreateUserInput!) {
        CreateUser(CreateUserRequest: $user) {
            token
        }
    }
`;

export const VALIDATE_USER = gql`
    mutation ValidateUser($user: ValidateUserInput!) {
        ValidateUser(ValidateUserRequest: $user) {
            token
        }
    }
`;

export const SET_STREAM_KEY = gql`
    mutation setStreamKey($uid: String!) {
        setStreamKey(uid: $uid) {
            key
        }
    }
`;