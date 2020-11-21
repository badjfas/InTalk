import React, { Fragment, useEffect, useRef, useState } from "react";
import { BsArrowReturnRight } from "react-icons/bs";
import styled from "styled-components";
import Avatar from "../Common/Avatar";
import ChildComment from "./ChildComment";

const Comment = ({ comment, addChildComment, postId }) => {
    const inputRef = useRef(null);
    const [commentVisible, setCommentVisible] = useState(false);
    const [childName, setChildName] = useState("");
    const [childInput, setChildInput] = useState({
        targetCommentId: "",
        targetUserId: "",
        text: "",
        visible: false
    });
    const onClick = ({ target, visible, rootTarget }) => {
        setChildInput({
            targetCommentId: target.commentId ? target.commentId : rootTarget.commentId,
            targetUserId: target.user.id ? target.user.id : target.user.myId,
            text: "",
            visible: visible
        });
    };

    useEffect(() => {
        if (inputRef.current === null) {
            return;
        } else {
            inputRef.current.focus();
        }
    }, [childInput]);

    return (
        <Fragment key={comment?.commentId}>
            <ParentComment className="comment">
                <Avatar src={comment?.user?.avatar} size={2} radius={70} />
                <div className="user_box_container">
                    <div className="user_box">
                        <span className="name">{comment?.user?.fullName}</span>
                        <span className="text">{comment?.text}</span>
                    </div>
                </div>
            </ParentComment>
            <AddChildBtn className="reply">
                <span
                    style={{ paddingLeft: "0.5rem" }}
                    onClick={() => {
                        setChildName(comment?.user?.fullName);
                        onClick({ target: comment, visible: !childInput.visible });
                    }}
                >
                    답글달기
                </span>
            </AddChildBtn>
            {comment?.childComments?.length !== 0 ? (
                <button
                    style={{ backgroundColor: "transparent", paddingLeft: "3.5rem" }}
                    className={`${`open_child ${commentVisible === true ? "clicked" : null}`}`}
                    onClick={() => setCommentVisible(!commentVisible)}
                >
                    <BsArrowReturnRight /> {comment?.childComments?.length + "개 댓글 더 보기"}
                </button>
            ) : null}
            {commentVisible &&
                comment?.childComments?.map((child) => {
                    return <ChildComment {...child} />;
                })}
        </Fragment>
    );
};
export default Comment;
const ParentComment = styled.div`
    display: flex;
    justify-content: flex-start;
    .user_box_container {
        background-color: #eee;
        border-radius: 15px;
        padding: 0.7rem;
        line-height: 1.2rem;
        margin-left: 0.5rem;
        .user_box {
            display: flex;
            flex-direction: column;
            .name {
                font-weight: 600;
                font-size: 0.8rem;
            }
            .text {
                font-size: 0.9rem;
                position: relative;
            }
        }
    }
`;

const AddChildBtn = styled.div`
    display: flex;
    font-size: 0.7rem;
    font-weight: 600;
    flex-direction: column;
    color: #999;
    height: 100%;
    padding: 0.2rem;
    margin-left: 2rem;
    > form {
        position: relative;
        span {
            position: absolute;
            top: 12px;
            left: 6px;
            width: 4rem;
        }
        input {
            display: flex;
            align-items: center;
            width: 100%;
            height: 2.2rem;
            border: none;
            border-radius: 10px;
            background-color: #eee;
            padding-left: 4rem;
            overflow: hidden;
            cursor: pointer;
        }
    }
    &:hover {
        color: #090909;
    }
`;

// const ChildComment = styled.div`
//     //답글
//     display: flex;
//     flex-direction: column;
//     height: 100%;
//     .open_child {
//         //답글달기
//         border: none;
//         width: 10rem;
//         margin-left: 1rem;
//         background-color: transparent;
//     }

//     .clicked {
//         display: none;
//     }

//     .child_comments {
//         margin-left: 1rem;
//         display: flex;
//         padding-left: 1rem;
//         margin-bottom: 1rem;
//         .child_comment_avatar {
//             border-radius: 70%;
//             width: 2rem;
//             height: 2rem;
//             margin-right: 1rem;
//         }
//         .child_comment {
//             display: flex;
//             flex-direction: column;
//             background-color: #eee;
//             border-radius: 15px;
//             padding: 0.7rem;
//             .name {
//                 font-size: 0.9rem;
//                 width: 100%;
//             }
//             > div {
//                 padding-top: 0.2rem;
//                 .target_name {
//                     font-weight: 600;
//                     font-size: 0.8rem;
//                     width: 100%;
//                 }
//                 .text {
//                     padding-left: 0.4rem;
//                     font-size: 0.9rem;
//                     width: 100%;
//                 }
//             }
//         }
//     }
// `;
