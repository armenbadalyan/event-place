import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: "Ubuntu", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;    
    background: #f8f7fa;
  }
  button {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  .react-contexify {
    z-index: 100;
  }
`;

export default GlobalStyles;
