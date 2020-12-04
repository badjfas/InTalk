import { AiOutlineLoading3Quarters } from "react-icons/ai";
import React from "react";
import styled, { keyframes } from "styled-components";
const Indicatior = keyframes`
  100% {
      transform: rotate(360deg);
    }
`;
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    z-index: 9999;
    position: absolute;
    top: ${props => props.top};
    bottom: ${props => props.bottom};
    svg {
        font-size: ${props => props.size}rem;
        animation: ${Indicatior} 2s linear infinite;
    }
`;
const Spinner = ({ size, top, bottom }) => {
    return (
        <Wrapper top={top} bottom={bottom}>
            <AiOutlineLoading3Quarters size={size} />
        </Wrapper>
    );
};

export default Spinner;
