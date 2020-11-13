import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { useState } from "react";
import { useRef } from "react";
import { SEE_POSTS, UPLOAD_POST } from "../../../pages/Feed/post";
import Portal from "../../../libs/portal";
import axios from "axios";

const PostPopup = ({ setVisible, visible, setText, text, refetch, user }) => {
    const fileImageRef = useRef(null);
    const [imageDetail, setImageDetail] = useState([]);
    const [imageDetailFile, setImageDetailFile] = useState([]);
    const [imageDetailName, setImageDetailName] = useState([]);
    const [actived, setActived] = useState(0);

    const [postUploadMutation, { error, data }] = useMutation(UPLOAD_POST, {
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

    return (
        <Portal elementId={"popup_root"}>
            <div className="post_popup">
                <div
                    className="overlay"
                    onClick={() => {
                        setVisible(!visible);
                    }}
                ></div>
                <div className="box">
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
                </div>
            </div>
        </Portal>
    );
};

export default PostPopup;
