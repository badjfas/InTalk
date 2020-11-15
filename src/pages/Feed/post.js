import { gql } from "@apollo/client";

export const UPLOAD_POST = gql`
    mutation uploadPost($title: String!, $contents: String!, $fileData: String, $userId: Int) {
        uploadPost(title: $title, contents: $contents, fileData: $fileData, userId: $userId) {
            id
            title
        }
    }
`;
export const SEE_POSTS = gql`
    query seePosts($itemNum: Int, $departmentId: Int) {
        seePosts(itemNum: $itemNum, departmentId: $departmentId) {
            rows {
                postId: id
                contents
                isLiked
                likesCount
                user {
                    fullName
                    departmentName
                    avatar
                }
                avatar
                files
                comments {
                    commentId: id
                    text
                    user {
                        id
                        avatar
                        fullName
                    }
                    childComments {
                        childId: id
                        text
                        user {
                            myId: id
                            avatar
                            fullName
                        }
                        targetUser {
                            targetId: id
                            avatar
                            fullName
                        }
                    }
                }
            }
        }
    }
`;

export const TOGGLE_LIKE = gql`
    mutation toggleLike($postId: Int!) {
        toggleLike(postId: $postId)
    }
`;

export const ADD_COMMENT = gql`
    mutation addComment($postId: Int!, $text: String!) {
        addComment(postId: $postId, text: $text) {
            commentId: id
            text
            user {
                id
                avatar
                fullName
            }
            childComments {
                childId: id
                text
                user {
                    myId: id
                    avatar
                    fullName
                }
                targetUser {
                    targetId: id
                    avatar
                    fullName
                }
            }
        }
    }
`;

export const ADD_CHILD_COMMENT = gql`
    mutation addChildComment($targetUserId: Int, $targetCommentId: Int, $text: String) {
        addChildComment(targetUserId: $targetUserId, targetCommentId: $targetCommentId, text: $text) {
            text
        }
    }
`;
