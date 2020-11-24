import { useMutation } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { SEE_POSTS, UPLOAD_POST } from "../Feed/post";
import AddPresenter from "./AddPresenter";
import axios from "axios";
import { DecodeToken } from "../../libs/decodeToken";

export default props => {
    const fileImageRef = useRef(null);
    const inputRef = useRef(null);

    const [imageDetail, setImageDetail] = useState([]);
    const [imageDetailFile, setImageDetailFile] = useState([]);
    const [imageDetailName, setImageDetailName] = useState([]);
    const [actived, setActived] = useState(0);
    const [text, setText] = useState("");
    const { user } = DecodeToken(localStorage.getItem("token"));

    const [postUploadMutation] = useMutation(UPLOAD_POST);

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
                const { data: fileData } = await axios.post(`http://1.229.102.77:4000/api/uploadFile`, formData, {
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
                setText("");
                window.location.href = "/";
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
        inputRef.current.focus();
        return () => {
            setText("");
        };
    }, []);

    return (
        <AddPresenter
            fileImageRef={fileImageRef}
            inputRef={inputRef}
            imageDetail={imageDetail}
            actived={actived}
            deletePhoto={deletePhoto}
            onClickDot={onClickDot}
            onSubmit={onSubmit}
            handleFileMultiple={handleFileMultiple}
            text={text}
            setText={setText}
            user={user}
        />
    );
};
