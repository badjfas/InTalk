import React from "react";
import { gql, useQuery } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import Theme from "./styles/Theme";
import GlobalStyles from "./styles/GlobalStyles";

import Routes from "./Route";
const IS_LOGIN = gql`
    {
        isLogin @client
    }
`;

function App() {
    const {
        data: { isLogin }
    } = useQuery(IS_LOGIN);
    return (
        <ThemeProvider theme={Theme}>
            <Routes isLogin={isLogin} />
            <GlobalStyles />
        </ThemeProvider>
    );
}

export default App;
