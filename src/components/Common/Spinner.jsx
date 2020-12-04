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
    z-index: 9999;
    position: absolute;
    top: 3rem;
    svg {
        font-size: ${props => props.size}rem;
        animation: ${Indicatior} 2s linear infinite;
    }
`;
const Spinner = ({ size }) => {
    return (
        <Wrapper>
            <AiOutlineLoading3Quarters size={size} />
        </Wrapper>
    );
};

export default Spinner;
