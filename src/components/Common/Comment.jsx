import React, { Fragment, useEffect, useRef, useState } from "react";
import { BsArrowReturnRight } from "react-icons/bs";
import styled from "styled-components";
import Avatar from "../Common/Avatar";
import ChildComment from "./ChildComment";

const Comment = ({ comment, addChildComment, postId }) => {
    const inputRef = useRef(null);
    const [visible, setVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [text, setText] = useState("");
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
                        setVisible(!visible);
                        setName(comment.user.fullName);
                    }}
                >
                    답글달기
                </span>
                {visible ? (
                    <form
                        onSubmit={e => {
                            addChildComment({
                                e: e,
                                targetCommentId: comment.commentId,
                                targetUserId: comment.user.id,
                                text: text,
                                postId: postId
                            });
                            setVisible(false);
                            setText("");
                        }}
                    >
                        <span>@{name}</span>
                        <input value={text} onChange={e => setText(e.target.value)} ref={inputRef} />
                    </form>
                ) : (
                    ""
                )}
            </AddChildBtn>
            {comment?.childComments?.length !== 0 ? (
                <button
                    style={{ backgroundColor: "transparent", paddingLeft: "3.5rem" }}
                    className={`${`open_child ${true ? "clicked" : null}`}`}
                    onClick={() => setOpen(!open)}
                >
                    <BsArrowReturnRight /> {comment?.childComments?.length + "개 댓글 더 보기"}
                </button>
            ) : null}
            {open &&
                comment?.childComments?.map(child => {
                    return (
                        <ChildComment
                            key={child.childId}
                            child={child}
                            commentId={comment.commentId}
                            addChildComment={addChildComment}
                            postId={postId}
                        />
                    );
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
