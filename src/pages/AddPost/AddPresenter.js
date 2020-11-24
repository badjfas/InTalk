import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 3rem;
    min-height: 100vh;
    max-width: 1024px;
    margin-bottom: 7rem; ;
`;

const Box = styled.div`
    margin: 0px auto;
    width: 100%;
    padding: 12px;
    min-height: 93vh;
    border-radius: 10px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1), 2px 8px 16px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    .title {
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #e6e6e6;
        height: 3rem;
        .title_text {
            font-size: 1.3rem;
            font-weight: 600;
        }
    }
    .user {
        display: flex;
        align-items: center;
        padding-top: 1rem;
        img {
            border-radius: 70%;
            width: 2rem;
            height: 2rem;
        }
        .user_text {
            display: flex;
            flex-direction: column;
            padding-left: 3%;
            .name {
                font-weight: 550;
                font-size: 0.9rem;
                padding: 0.3rem;
            }
            .opt {
                font-weight: 600;
                padding: 0.3rem;
                font-size: 1rem;
                border-radius: 5px;
                background-color: #f0f2f5;
            }
        }
    }
    .content_box {
        display: flex;
        flex-direction: column;
        margin-top: 5%;
        width: 100%;
        height: 100%;
        > form {
            overflow-y: scroll;
            .preview_box {
                display: flex;
                .preview {
                    max-height: 450px;
                    .preview_dot {
                        display: flex;
                        justify-content: center;
                        align-items: center;
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
                    .preview_img {
                        position: relative;
                        > span {
                            cursor: pointer;
                            position: absolute;
                            top: 5px;
                            right: 0;
                            font-size: 2rem;
                        }
                        > img {
                            height: 100%;
                            width: 100%;
                            background-position: center center;
                            background-size: cover;
                        }
                    }
                }
            }
            textarea {
                resize: none;
                width: 100%;
                height: 100%;
                border: none;
                padding: 0.5rem;
                min-height: 50vh;
            }
        }
    }
    .file_upload_box {
        display: flex;
        justify-content: flex-end;
        .upload_btn {
            display: none;
        }
    }
`;

const Button = styled.button`
    max-width: 1024px;
    width: 100%;
    position: fixed;
    border: 1px solid #1877f2;
    height: 3rem;
    background-color: #1877f2;
    color: #fff;
    bottom: 3rem;
`;
export default ({
    fileImageRef,
    inputRef,
    imageDetail,
    actived,
    deletePhoto,
    onClickDot,
    onSubmit,
    handleFileMultiple,
    text,
    setText,
    user
}) => {
    return (
        <Wrapper className="post_popup">
            <Box className="box">
                <div className="title">
                    <span className="title_text">게시물 만들기</span>
                </div>
                <div className="user">
                    <img src={user?.avatar} alt="" />
                    <p className="user_text">
                        <span className="name">{user?.fullName}</span>
                        <span className="opt">{user?.department}</span>
                    </p>
                </div>
                <div className="content_box">
                    <form>
                        <textarea
                            value={text}
                            ref={inputRef}
                            placeholder={`${user?.fullName}님, 무슨 생각을 하고 계신가요?`}
                            onChange={e => setText(e.target.value)}
                        >
                            {text}
                        </textarea>

                        <div className="preview_box">
                            <div className="preview">
                                <div className="preview_dot">
                                    {imageDetail?.map((photo, index) => {
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
                                <div className="preview_img">
                                    <span onClick={() => deletePhoto(actived)}>✖︎</span>
                                    {imageDetail[0] !== undefined ? <img src={imageDetail[actived]} alt="" /> : ""}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="file_upload_box">
                    <input
                        id="file_upload_box"
                        type="file"
                        onChange={handleFileMultiple}
                        multiple
                        ref={fileImageRef}
                        className="upload_btn"
                    />
                    <label htmlFor="file_upload_box" style={{ fontSize: "2rem" }}>
                        📷
                    </label>
                </div>
            </Box>
            <Button onClick={onSubmit}>게시</Button>
        </Wrapper>
    );
};
