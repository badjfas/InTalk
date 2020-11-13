import React, { Fragment, useState } from "react";
import { BsArrowReturnRight } from "react-icons/bs";
import styled from "styled-components";
import Avatar from "../Common/Avatar";

const ParentComment = styled.div`
    display: flex;
    justify-content: flex-start;
    .user_box_container {
        background-color: #eee;
        border-radius: 15px;
        padding: 0.7rem;
        line-height: 1.2rem;
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
        input {
            display: flex;
            align-items: center;
            width: 100%;
            height: 2.2rem;
            border: none;
            border-radius: 10px;
            background-color: #eee;
            padding-left: 1rem;
            overflow: hidden;
            cursor: pointer;
        }
    }
    &:hover {
        color: #090909;
    }
`;

const ChildComment = styled.div`
    //답글
    display: flex;
    flex-direction: column;
    height: 100%;
    .open_child {
        //답글달기
        border: none;
        width: 10rem;
        margin-left: 1rem;
        background-color: transparent;
    }

    .clicked {
        display: none;
    }

    .child_comments {
        margin-left: 1rem;
        display: flex;
        padding-left: 1rem;
        margin-bottom: 1rem;
        .child_comment_avatar {
            border-radius: 70%;
            width: 2rem;
            height: 2rem;
            margin-right: 1rem;
        }
        .child_comment {
            display: flex;
            flex-direction: column;
            background-color: #eee;
            border-radius: 15px;
            padding: 0.7rem;
            .name {
                font-size: 0.9rem;
                width: 100%;
            }
            > div {
                padding-top: 0.2rem;
                .target_name {
                    font-weight: 600;
                    font-size: 0.8rem;
                    width: 100%;
                }
                .text {
                    padding-left: 0.4rem;
                    font-size: 0.9rem;
                    width: 100%;
                }
            }
        }
    }
`;

const Comment = ({ comment, addChildComment }) => {
    const [commentVisible, setCommentVisible] = useState(false);
    const [childInput, setChildInput] = useState({
        targetCommentId: "",
        targetUserId: "",
        text: "",
        visible: false
    });

    const onClick = ({ target, visible, rootTarget }) => {
        console.log(target, rootTarget);

        setChildInput({
            targetCommentId: target.commentId ? target.commentId : rootTarget.commentId,
            targetUserId: target.user.id ? target.user.id : target.user.myId,
            text: "",
            visible: visible
        });
    };
    return (
        <Fragment>
            <Fragment key={comment.commentId}>
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
                    <span onClick={() => onClick({ target: comment, visible: !childInput.visible })}>답글달기</span>
                    {childInput.visible ? (
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                addChildComment({
                                    ...childInput
                                });
                                setChildInput({
                                    targetCommentId: "",
                                    targetUserId: "",
                                    text: "",
                                    visible: childInput.visible
                                });
                            }}
                        >
                            <input
                                value={childInput.text}
                                onChange={e => setChildInput({ ...childInput, text: e.target.value })}
                            />
                        </form>
                    ) : (
                        ""
                    )}
                </AddChildBtn>
            </Fragment>
            <ChildComment className="child" key={comment.commentId * 5}>
                {comment.childComments.length !== 0 ? (
                    <button
                        className={`${`open_child ${commentVisible === true ? "clicked" : null}`}`}
                        onClick={() => setCommentVisible(!commentVisible)}
                    >
                        <BsArrowReturnRight /> {comment.childComments.length + "개 댓글 더 보기"}
                    </button>
                ) : null}

                {comment.childComments.map(childComment => {
                    return (
                        <Fragment key={childComment.childId}>
                            {commentVisible ? (
                                <div
                                    key={childComment.childId}
                                    className="child_comments"
                                    onClick={() =>
                                        onClick({
                                            target: childComment,
                                            rootTarget: comment,
                                            visible: !childInput.visible
                                        })
                                    }
                                >
                                    <img className="child_comment_avatar" src={childComment.user.avatar} alt="" />
                                    <div className="child_comment">
                                        <span className="name">{childComment.user.fullName}</span>
                                        <div>
                                            <span className="target_name">
                                                {"@" + childComment.targetUser.fullName}
                                            </span>
                                            <span className="text">{childComment.text}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                        </Fragment>
                    );
                })}
            </ChildComment>
        </Fragment>
    );
};

export default Comment;
