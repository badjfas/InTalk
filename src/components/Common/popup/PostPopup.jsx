import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { SEE_POSTS, UPLOAD_POST } from "../../../pages/Feed/post";
import Portal from "../../../libs/portal";
import axios from "axios";
import styled from "styled-components";

const PostPopup = ({ setVisible, visible, setText, text, refetch, user, inputRef }) => {
    const fileImageRef = useRef(null);
    const [imageDetail, setImageDetail] = useState([]);
    const [imageDetailFile, setImageDetailFile] = useState([]);
    const [imageDetailName, setImageDetailName] = useState([]);
    const [actived, setActived] = useState(0);

    const [postUploadMutation] = useMutation(UPLOAD_POST, {
        refetchQueries: [
            {
                query: SEE_POSTS,
                variables: {
                    itemNum: 3,
                    departmentId: 0
                }
            }
        ]
    });

    const deletePhoto = index => {
        let imgList = imageDetail.slice(0),
            imgFileList = imageDetailFile.slice(0),
            imgFileNameList = imageDetailName.slice(0);
        imgList.splice(index, 1);
        imgFileList.splice(index, 1);
        imgFileNameList.splice(index, 1);
        setImageDetail(imgList);
        setImageDetailFile(imgFileList);
        setImageDetailName(imgFileNameList);
        if (index > 0) {
            setActived(index - 1);
        } else {
            setActived(0);
        }
    };

    const onClickDot = index => {
        setActived(index);
    };

    const onSubmit = async e => {
        e.preventDefault();
        let formData = new FormData();
        imageDetailFile.forEach(file => {
            formData.append("post", file);
        });

        try {
            if (text === "") {
                return;
            } else {
                const { data: fileData } = await axios.post(`${process.env.REACT_APP_UPLOAD}`, formData, {
                    header: {
                        "content-type": "multipart/form-data"
                    }
                });
                await postUploadMutation({
                    variables: {
                        title: "1",
                        contents: text,
                        fileData: JSON.stringify(fileData),
                        userId: user.id
                    }
                });
                setVisible(false);
                setText("");
                const { data } = await refetch();
                return data;
            }
        } catch (e) {
            console.log(e);
            alert("서버 오류");
        }
    };
    const asyncFileRead = file => {
        return new Promise(resolve => {
            let reader = new FileReader();
            reader.onload = e => {
                return resolve(e.target.result);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleFileMultiple = async () => {
        let imgList = imageDetail.slice(0),
            imgFileList = imageDetailFile.slice(0),
            imgFileNameList = imageDetailName.slice(0);

        for (var i = 0; i < fileImageRef.current.files.length; i++) {
            var file = fileImageRef.current.files[i];
            const img = await asyncFileRead(file);
            imgList.push(img);
            imgFileList.push(file);
            imgFileNameList.push(file.name);
        }
        setImageDetail(imgList);
        setImageDetailFile(imgFileList);
        setImageDetailName(imgFileNameList);
    };
    //모덜 포커싱
    useEffect(() => {
        console.log("postpopup mounted");
        inputRef.current.focus();
        // window.history.pushState({ page: "/" }, document.title, "/");
        return () => {
            console.log("postpopup unmounted");
            setText("");
        };
    }, []);
    //모달 스크롤 방지
    useEffect(() => {
        document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`;
        return () => {
            const scrollY = document.body.style.top;
            document.body.style.cssText = `position: ""; top: "";`;
            window.scrollTo(0, parseInt(scrollY || "0") * -1);
        };
    }, []);
    return (
        <Portal elementId={"popup_root"}>
            <Wrapper className="post_popup">
                <Overlay
                    className="overlay"
                    onClick={() => {
                        setVisible(!visible);
                    }}
                />
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
                    <button onClick={onSubmit}>게시</button>
                </Box>
            </Wrapper>
        </Portal>
    );
};

export default PostPopup;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 100;
    position: fixed;
    height: fit-content;
    left: 0;
    top: 25%;
    right: 0;
`;

const Overlay = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
    position: fixed;
`;

const Box = styled.div`
    max-height: 750px;
    max-width: 500px;
    margin: 0px auto;
    width: 100%;
    z-index: 1000;
    padding: 12px;
    position: relative;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    .title {
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #e6e6e6;
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
                border: none;
                padding: 0.5rem;
            }
        }
    }
    > button {
        margin-top: 1rem;
        width: 100%;
        border: 1px solid #1877f2;
        border-radius: 10px;
        height: 36px;
        background-color: #1877f2;
        color: #fff;
    }
    .file_upload_box {
        display: flex;
        justify-content: flex-end;
        .upload_btn {
            display: none;
        }
    }
`;
