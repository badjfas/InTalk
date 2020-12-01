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
                createdAt
                user {
                    fullName
                    departmentName
                    avatar
                }
                avatar
                files
                firstComment {
                    commentId: id
                    userId
                    fullName
                    avatar
                    text
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

export const SEE_POST = gql`
    query seePost($postId: Int!) {
        seePost(postId: $postId) {
            postId: id
            contents
            isLiked
            likesCount
            createdAt
            user {
                fullName
                departmentName
                avatar
            }
            avatar
            files
            firstComment {
                commentId: id
                userId
                fullName
                avatar
                text
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
    mutation addChildComment($targetUserId: Int, $targetCommentId: Int, $text: String, $postId: Int!) {
        addChildComment(targetUserId: $targetUserId, targetCommentId: $targetCommentId, text: $text, postId: $postId) {
            text
        }
    }
`;

export const SEE_ALL_COMMENTS = gql`
    query seeComments($postId: Int!) {
        seeComments(postId: $postId) {
            post {
                id
            }
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
