import React from "react";
import styled from "styled-components";

const Container = styled.div`
    position: relative;
    top: 0;
    height: 100%;
    border: none;
`;

const Image = styled.img`
    background-color: #b7c5d3;
    border: 1px solid #b7c5d3;
    outline: none;
    border-radius: ${props => props.radius}%;
    width: ${props => props.size}rem;
    height: ${props => props.size}rem;
`;

const Avatar = ({ src, size, radius }) => {
    return (
        <Container>
            <Image src={`/img/avatar${Math.floor(Math.random() * 3)}.png`} size={size} radius={radius} alt={null} />
        </Container>
    );
};

export default Avatar;
