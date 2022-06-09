import { gql } from "@apollo/client";

export const GET_STREAM_STATE = gql`
    query getStreamState($uid: String!) {
        getStreamState(uid: $uid) {
            state
            path
        }
    }
`;

export const GET_USERNAME_FROM_ID = gql `
    query GetUser($id: String!){
        GetUser(id: $id){
            username
            status
            email
        }
    }
`

export const GET_ID_FROM_USERNAME = gql `
    query GetId($username: String!){
        GetId(username: $username){
            id
        }
    }
`


