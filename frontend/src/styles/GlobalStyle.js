import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  
  * {
   box-sizing: border-box;
  }

  pre {
    font-size: 20px;
    border-radius: 10px;
  }

  body {
    color: ${props => props.theme.color};
    background: ${props => props.theme.background};
    font-family: ${props => props.theme.fontFamily};
    transition: all 0.25s linear;
  }
`

export default GlobalStyle
