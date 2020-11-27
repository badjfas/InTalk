import React, { Fragment, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    position: absolute;
    top: 3rem;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    font-weight: 600;
    font-size: 0.8rem;
    left: 0;
    cursor: pointer;
`;

const Box = styled.div`
    display: flex;
    align-items: center;
    font-size: 0.7rem;
    height: 3rem;
    position: relative;
    .add_btn {
        background-color: #eee;
        width: 2.3rem;
        height: 2.3rem;
        border-radius: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 0.5rem;
    }
`;

const AddBtn = ({ setTab }) => {
    return (
        <Fragment>
            <Wrapper className="participants" onClick={() => setTab(true)}>
                <Box className="add">
                    <span className="add_btn">+</span>
                    대화상대 초대
                </Box>
            </Wrapper>
        </Fragment>
    );
};

export default AddBtn;
