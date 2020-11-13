import React, { Fragment } from "react";
import styled from "styled-components";
import Auth from "./Auth";

const Container = styled.div`
    width: 100%;
    height: 100%;
    max-width: 1024px;
`;

const Main = props => {
    return (
        <Container>
            <Auth {...props} />
        </Container>
    );
};

export default Main;
