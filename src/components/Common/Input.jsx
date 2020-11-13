import React, { useState } from "react";
import styled from "styled-components";

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

export default ({ placeholer, onClick, width, height, onChange }) => {
    console.log(onChange);
    return <Input placeholer={placeholer} onClick={onClick} width={width} height={height} onChange={onChange} />;
};
