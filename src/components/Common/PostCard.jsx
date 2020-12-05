import React, { useState } from "react";
import { AiOutlineLike, AiTwotoneLike, AiOutlineShareAlt } from "react-icons/ai";
import { BiDotsHorizontal } from "react-icons/bi";
import { VscComment } from "react-icons/vsc";
import styled from "styled-components";
import Avatar from "../Common/Avatar";

const PostCard = ({ isLiked, postId, likesCount, user, contents, comments, toggleLike, createdAt, files, history }) => {
    const [isLikdes, setIsLikeds] = useState(isLiked);
    const [actived, setActived] = useState(0);
    const splitFile = files?.split(",");
    const onClickDot = index => {
        if (splitFile.length <= index) {
            return setActived(0);
        } else {
            return setActived(index);
        }
    };

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
        <Wrapper className="post" id={postId}>
            <div className="post_posting">
                <UserBox className="title">
                    <Avatar src={user?.avatar} size={2} radius={30} />
                    <div className="department_box">
                        <span>{user?.fullName}</span>
                        <span className="department_name">{user?.departmentName}</span>{" "}
                        <span className="createdAt">{createdAt.split(" ")[0]}</span>
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
                            <span className="count">{likesCount}</span>
                        </li>
                        <li onClick={() => history.push(`/post/${postId}`)}>
                            <VscComment />
                            <span className="count">{comments?.length}</span>
                        </li>
                        <li>
                            <AiOutlineShareAlt />
                        </li>
                    </ul>
                    <div className="preview_dot">
                        {files !== "" &&
                            splitFile?.map((photo, index) => {
                                return (
                                    <span
                                        key={index}
                                        onClick={() => onClickDot(index)}
                                        className={`${actived === index ? "actived dot" : "dot"}`}
                                    >
                                        ●
                                    </span>
                                );
                            })}
                    </div>
                </OptionBox>
            </div>
        </Wrapper>
    );
};
export default PostCard;

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
        border-top: 1px solid #d9d9d9;
        border-bottom: 1px solid #d9d9d9;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
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
        position: relative;
        width: 100%;
        .department_name {
            font-size: 0.75rem;
        }
        .createdAt {
            font-size: 0.5rem;
            position: absolute;
            right: 0;
            bottom: 0;
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
    display: flex;
    justify-content: center;
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
        top: -15px;
        color: #999;
        width: 100%;
    }
    .actived {
        color: #004680;
        font-size: 0.1rem;
    }
    .dot {
        font-size: 0.1rem;
    }
    .count {
        margin-left: 0.5rem;
        font-size: 0.67rem;
        font-weight: 600;
    }
    > ul {
        display: flex;
        align-items: center;
        width: 100%;
        li {
            cursor: pointer;
            display: flex;
            width: 100%;
            justify-content: center;
            align-items: center;
            padding: 0.5rem 0.5rem 0.5rem 0.5rem;
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
