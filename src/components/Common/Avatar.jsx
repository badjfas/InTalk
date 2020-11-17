import React from "react";
import styled from "styled-components";

const Container = styled.div`
    position: relative;
`;

const Image = styled.img`
    border-radius: ${props => props.radius}%;
    width: ${props => props.size}rem;
    height: ${props => props.size}rem;
`;

const Avatar = ({ src, size, radius }) => {
    return (
        <Container>
            <Image src={src} size={size} radius={radius} />
        </Container>
    );
};

export default Avatar;
