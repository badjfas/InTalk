import React from "react";
import styled from "styled-components";
import Avatar from "./Avatar";

const Wrapper = styled.div`
    width: 100%;
    padding: 0.8rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-left: 1rem;
    > span {
        margin-left: 1rem;
    }
`;
const ListBar = ({ text, src }) => {
    return (
        <Wrapper>
            <Avatar src={src} size={2.3} radius={70} />
            <span>{text}</span>
        </Wrapper>
    );
};

export default ListBar;
