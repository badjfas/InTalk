import { useMutation } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { SEND_MESSAGE } from "../../apollo/Queries/chat";

const Input = () => {
    const [writer, setWriter] = useState("배진우");

    const [text, setText] = useState("");
    const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
        variables: {
            toId: 3,
            roomId: 2,
            message: text
        }
    });
    return (
        <div style={{ paddingTop: 50, display: "flex", flexDirection: "column", justfyContents: "center" }}>
            <input
                type="text"
                value={text}
                placeholder="내용을 입력하세요"
                onChange={e => {
                    setText(e.target.value);
                }}
                onKeyPress={e => {
                    if (e.key === "Enter") {
                        setText("");
                        sendMessageMutation();
                    }
                }}
            />
            <button
                onClick={() => {
                    setText("");
                    sendMessageMutation();
                }}
            >
                확인
            </button>
        </div>
    );
};

export default Input;
