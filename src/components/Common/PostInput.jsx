import React from "react";
import styled from "styled-components";
import Avatar from "../Common/Avatar";
import Input from "../Common/Input";

const Wrapper = styled.div`
    height: 5rem;
    width: 100%;
    max-width: 650px;
    display: flex;
    align-items: center;
    padding: 1rem;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.4);
    margin: 0px auto;
`;

const src =
    "https://instagram.famd3-1.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.famd3-1.fna.fbcdn.net&_nc_ohc=qr8CH9GVPs4AX_VHirk&oh=93ebddd76b9104d6126c4215eb50094d&oe=5FC5A70F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2";

export default ({ visible, setVisible, text }) => {
    return (
        <Wrapper>
            <Avatar src={src} size={2} radius={70} />
            <Input width={"100%"} height={2.2} onClick={setVisible} />
        </Wrapper>
    );
};
