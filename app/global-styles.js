import { injectGlobal } from 'styled-components';

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
  }

  body.fontLoaded {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
  }

  #app {
    background-color: #fafafa;
    height: 100%;
    min-width: 100%;
  }

  p,
  label {
    line-height: 1.5em;
  }
`;
