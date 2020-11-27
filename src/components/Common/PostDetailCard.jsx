import { useLazyQuery } from "@apollo/client";
import React, { Fragment, useRef, useState } from "react";
import { AiOutlineLike, AiTwotoneLike, AiOutlineShareAlt } from "react-icons/ai";
import { BiDotsHorizontal } from "react-icons/bi";
import { VscComment } from "react-icons/vsc";
import styled from "styled-components";
import { SEE_ALL_COMMENTS } from "../../pages/Feed/post";
import Avatar from "../Common/Avatar";
import Comment from "./Comment";
import { PostPopup } from "./popup";

const PostDetailCard = ({
    isLiked,
    postId,
    likesCount,
    user,
    contents,
    comments,
    firstComment,
    toggleLike,
    addComment,
    addChildComment,
    files
}) => {
    const [isLikdes, setIsLikeds] = useState(isLiked);
    const [comment, setComment] = useState("");
    const [actived, setActived] = useState(0);
    const [open, setOpen] = useState(false);
    const splitFile = files?.split(",");
    const inputRef = useRef(null);
    const onClickDot = index => {
        if (splitFile.length <= index) {
            return setActived(0);
        } else {
            return setActived(index);
        }
    };

    const handleFocus = () => {
        inputRef.current.focus();
    };
    const [getComment, { data, loading }] = useLazyQuery(SEE_ALL_COMMENTS);

    const [touchState, setTouch] = useState({
        touchstartX: 0,
        touchstartY: 0,
        touchendX: 0,
        touchendY: 0,
        touchoffsetX: 0,
        touchoffsetY: 0
    });

    const onTouchStart = e => {
        var touch = e.touches[0];
        touchState.touchstartX = touch.clientX;
        touchState.touchstartY = touch.clientY;
    };

    const onTouchEnd = e => {
        if (e.touches.length === 0) {
            var touch = e.changedTouches[e.changedTouches.length - 1];
            touchState.touchendX = touch.clientX;
            touchState.touchendY = touch.clientY;

            touchState.touchoffsetX = touchState.touchendX - touchState.touchstartX;
            touchState.touchoffsetY = touchState.touchendY - touchState.touchstartY;

            if (Math.abs(touchState.touchoffsetX) >= 80 && Math.abs(touchState.touchoffsetY) <= 50) {
                if (touchState.touchoffsetX < 0) {
                    if (actived >= splitFile.length - 1) {
                        setActived(0);
                    } else {
                        setActived(actived + 1);
                    }
                } else if (actived !== 0) {
                    setActived(actived - 1);
                } else {
                    setActived(0);
                }
            }
        }
    };

    return (
        <Wrapper className="post" id={postId} key={postId}>
            <div className="post_posting">
                <UserBox className="title">
                    <Avatar src={user?.avatar} size={2} radius={70} />
                    <div className="department_box">
                        <span>{user?.fullName}</span>
                        <span className="department_name">{user?.departmentName}</span>
                    </div>
                    <button>
                        <BiDotsHorizontal />
                    </button>
                </UserBox>
                <ContentBox className="content">
                    <p>{contents}</p>
                    <div className="photo" onTouchStart={e => onTouchStart(e)} onTouchEnd={onTouchEnd}>
                        {files !== "" && splitFile ? (
                            <img
                                onClick={() => onClickDot(actived + 1)}
                                src={`http://1.229.102.77:4000/file/${splitFile[actived]}`}
                                alt=""
                            />
                        ) : (
                            ""
                        )}
                    </div>
                </ContentBox>
                <OptionBox className="opt_box">
                    <ul>
                        <li
                            onClick={e => {
                                setIsLikeds(!isLikdes);
                                toggleLike({ e, postId });
                            }}
                        >
                            {isLikdes ? <AiTwotoneLike fill="#004680" /> : <AiOutlineLike />}
                        </li>
                        <li onClick={handleFocus}>
                            <VscComment />
                        </li>
                        <li>
                            <AiOutlineShareAlt />
                        </li>
                    </ul>
                    <span>{likesCount}명이 좋아합니다.</span>
                    <div className="preview_dot">
                        {files !== "" &&
                            splitFile?.map((photo, index) => {
                                return (
                                    <span
                                        key={index}
                                        onClick={() => onClickDot(index)}
                                        className={`${actived === index ? "actived" : ""}`}
                                    >
                                        ●
                                    </span>
                                );
                            })}
                    </div>
                    {open ? (
                        <button
                            onClick={() => {
                                setOpen(!open);
                                getComment({
                                    variables: {
                                        postId: parseInt(0)
                                    }
                                });
                                setComment("");
                            }}
                        >
                            댓글 접기
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                setOpen(!open);
                                getComment({
                                    variables: {
                                        postId: parseInt(postId)
                                    }
                                });
                                setComment("");
                            }}
                        >
                            {comments?.length}개 댓글 더 보기
                        </button>
                    )}
                </OptionBox>
                <CommentBox className="add_comment_box">
                    <div className="add_comment">
                        <Avatar
                            size={2}
                            radius={70}
                            src={
                                "https://instagram.famd3-1.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.famd3-1.fna.fbcdn.net&_nc_ohc=qr8CH9GVPs4AX_VHirk&oh=93ebddd76b9104d6126c4215eb50094d&oe=5FC5A70F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2"
                            }
                        />
                        <form
                            style={{ width: "100%", margin: "0 1rem 0 1rem" }}
                            onSubmit={e => {
                                addComment({ event: e, postId: postId, text: comment });
                                setComment("");
                            }}
                        >
                            <Input
                                type="text"
                                value={comment}
                                style={{ padding: 15 }}
                                ref={inputRef}
                                height={2}
                                onChange={e => {
                                    setComment(e.target.value);
                                }}
                            />
                        </form>
                    </div>
                    {open ? null : !firstComment ? null : (
                        <FirstComment className="comments">
                            <div>
                                <Avatar src={firstComment?.avatar} size={2} radius={70} />
                                <div className="user_box_container">
                                    <div className="user_box">
                                        <span className="name">{firstComment?.fullName}</span>
                                        <span className="text">{firstComment?.text}</span>
                                    </div>
                                </div>
                            </div>
                        </FirstComment>
                    )}
                    {loading ? (
                        "is loading"
                    ) : (
                        <Comments className="comments">
                            {data?.seeComments?.map((comment, index) => {
                                return (
                                    <Comment
                                        key={comment.commentId}
                                        comment={comment}
                                        postId={postId}
                                        addChildComment={addChildComment}
                                    />
                                );
                            })}
                        </Comments>
                    )}
                </CommentBox>
            </div>
        </Wrapper>
    );
};
export default PostDetailCard;

const Wrapper = styled.div`
    max-width: 1024px;
    width: 100%;
    margin: 0px auto;
    .post_posting {
        display: flex;
        height: 100%;
        flex-direction: column;
        background-color: #fff;
        border-radius: $post_radius;
        margin-bottom: 48px;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 4px 4px rgba(0, 0, 0, 0.1);
    }
`;

const UserBox = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem;
    position: relative;
    border-bottom: 1px solid #eee;
    button {
        width: 2rem;
        height: 2rem;
        background-color: transparent;
        position: absolute;
        top: 5px;
        right: 5px;
    }
    .department_box {
        display: flex;
        font-size: 0.9rem;
        line-height: 1.3rem;
        flex-direction: column;
        margin-left: 0.5rem;
        .department_name {
            font-size: 0.75rem;
        }
    }
`;

const ContentBox = styled.div`
    margin-top: 1rem;
    width: 100%;
    min-height: 3rem;
    position: relative;
    span {
        cursor: pointer;
        &:not(:last-child) {
            margin-right: 0.5rem;
        }
    }
    > p {
        padding: 0 0.5rem 0.5rem 0.5rem;
        font-size: 0.9rem;
        line-height: 1.3rem;
        font-weight: 500;
        color: #000;
        word-break: break-all;
    }
    .photo {
        width: 100%;
        height: 100%;
        margin-bottom: 1rem;
        > img {
            width: 100%;
            height: 100%;
        }
    }
`;

const OptionBox = styled.div`
    position: relative;
    button {
        position: absolute;
        bottom: 0;
        background: transparent;
        border: none;
        right: 10px;
    }
    .preview_dot {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: -10px;
        color: #999;
        width: 100%;
    }
    .actived {
        color: #004680;
    }
    span {
        font-size: 0.8rem;
        padding-left: 0.5rem;
    }
    > ul {
        display: flex;
        align-items: center;
        li {
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0 0.5rem 0.5rem 0.5rem;
            span {
                height: 1.3rem;
                padding-top: 0.3rem;
            }
            svg {
                width: 1.3rem;
                height: 1.3rem;
            }
        }
    }
`;

const CommentBox = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 1rem;
    padding: 0 0.5rem 0.5rem 0.5rem;
    .add_comment {
        width: 100%;
        display: flex;
        form {
            width: 100%;
            input {
                &:focus {
                    background-color: #eee;
                    opacity: 0.8;
                }
            }
        }
    }
`;

const Comments = styled.div`
    margin-top: 1rem;
    width: 100%;
`;
const FirstComment = styled.div`
    margin-top: 1rem;
    width: 100%;
    div {
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
    }
`;

const Input = styled.input`
    display: flex;
    align-items: center;
    width: 100%;
    height: ${props => props.height}rem;
    border: none;
    border-radius: 10px;
    background-color: #eee;
    padding-left: 2rem;
    overflow: hidden;
    cursor: pointer;
    &:hover {
        background-color: #eee;
        opacity: 0.8;
    }
`;
