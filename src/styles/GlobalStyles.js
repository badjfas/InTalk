import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle`
    ${reset};
    * {
          box-sizing:border-box;
    }
    
    body{        
        max-width:1024px;
        margin:0px auto;
        color:${props => props.theme.blackColor};
        background-color :#f8fbff;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    a{
        color:${props => props.theme.blueColor};
        text-decoration:none;
    }
    button{
        border: none;

    }
    input:focus{
        outline:none;
    }
`;
