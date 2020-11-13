import React, { useState } from "react";
import { AiOutlineLike, AiTwotoneLike, AiOutlineShareAlt } from "react-icons/ai";
import { VscComment } from "react-icons/vsc";
import styled from "styled-components";
import Avatar from "../Common/Avatar";
import Comment from "./Comment";
const Wrapper = styled.div`
    max-width: 650px;
    width: 100%;
    margin: 0px auto;
    padding-top: 1rem;
    .post_posting {
        display: flex;
        height: 100%;
        flex-direction: column;
        background-color: #fff;
        border-radius: $post_radius;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.4);
    }
`;

const UserBox = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1rem;
    border-bottom: 1px solid #eee;
    .department_box {
        display: flex;
        font-size: 0.9rem;
        line-height: 1.3rem;
        flex-direction: column;
        .department_name {
            font-size: 0.75rem;
        }
    }
`;

const ContentBox = styled.div`
    margin-top: 1rem;
    width: 100%;
    min-height: 3rem;
    .preview_dot {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 0.7rem;
    }
    span {
        cursor: pointer;
        &:not(:last-child) {
            margin-right: 0.5rem;
        }
    }
    .actived {
        color: #1877f2;
    }
    > p {
        padding: 0 1rem 1rem 1rem;

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
    > ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        li {
            cursor: pointer;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            &:not(:last-child) {
                border-right: 1px solid #999;
            }
            span {
                height: 1.3rem;
                padding-top: 0.3rem;
            }
            svg {
                margin-right: 0.5rem;
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
    padding: 0 1rem 1rem 1rem;
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

const Input = styled.input`
    display: flex;
    align-items: center;
    width: ${props => props.width};
    height: ${props => props.height}rem;
    border: none;
    border-radius: 10px;
    background-color: #eee;
    padding-left: 1rem;
    overflow: hidden;
    cursor: pointer;
    &:hover {
        background-color: #eee;
        opacity: 0.8;
    }
`;

const PostCard = ({ isLiked, postId, user, contents, comments, toggleLike, addComment, addChildComment, files }) => {
    const [isLikdes, setIsLikeds] = useState(isLiked);
    const [comment, setComment] = useState("");
    const [actived, setActived] = useState(0);
    const splitFile = files?.split(",");
    const onClickDot = index => {
        if (splitFile.length <= index) {
            return setActived(0);
        } else {
            return setActived(index);
        }
    };
    return (
        <Wrapper className="post" id={postId} key={postId}>
            <div className="post_posting">
                <UserBox className="title">
                    <Avatar src={user.avatar} size={2} radius={70} />
                    <div className="department_box">
                        <span>{user.fullName}</span>
                        <span className="department_name">{user.departmentName}</span>
                    </div>
                </UserBox>
                <ContentBox className="content">
                    <p>{contents}</p>
                    <div className="preview_dot">
                        {files !== "" &&
                            splitFile?.map((photo, index) => {
                                return (
                                    <span
                                        onClick={() => onClickDot(index)}
                                        className={`${actived === index ? "actived" : ""}`}
                                    >
                                        ●
                                    </span>
                                );
                            })}
                    </div>
                    <div className="photo">
                        {files !== "" && splitFile ? (
                            <img
                                onClick={() => onClickDot(actived + 1)}
                                src={`http://1.229.102.77:4000/file/${splitFile[actived]?.split("^")[0]}`}
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
                            {isLikdes ? <AiTwotoneLike fill="#1877f2" /> : <AiOutlineLike />}
                            <span>좋아요</span>
                        </li>
                        <li>
                            <VscComment />
                            <span> 댓글 달기</span>
                        </li>
                        <li>
                            <AiOutlineShareAlt />
                            <span>공유하기</span>
                        </li>
                    </ul>
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
                            onSubmit={e => {
                                addComment({ event: e, postId: postId, text: comment });
                                setComment("");
                            }}
                        >
                            <Input
                                type="text"
                                value={comment}
                                width={"100%"}
                                height={2}
                                onChange={e => {
                                    setComment(e.target.value);
                                }}
                            />
                        </form>
                    </div>
                    <Comments className="comments">
                        {comments?.map(comment => {
                            return (
                                <Comment key={comment.commentId} comment={comment} addChildComment={addChildComment} />
                            );
                        })}
                    </Comments>
                </CommentBox>
            </div>
        </Wrapper>
    );
};
export default PostCard;
