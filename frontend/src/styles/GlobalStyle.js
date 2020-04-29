import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap');

  /* left for debugging purposes */
  /* * { outline: solid 0.5px hsla(210, 100%, 100%, 0.5); } */
  
  * {
    padding: 5px;
  }

  pre {
    font-size: 20px;
  }

  body {
    color: ${(props) => props.theme.color};
    background: ${(props) => props.theme.background};
    font-family: ${(props) => props.theme.fontFamily};
    transition: all 0.25s linear;

  }


`;

export default GlobalStyle;
