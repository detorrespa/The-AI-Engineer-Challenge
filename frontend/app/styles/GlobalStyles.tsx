'use client'

import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
    font-family: 'Courier New', monospace;
    background-color: #000000;
    color: #00ff00;
    line-height: 1.6;
  }

  body {
    background: linear-gradient(135deg, #000000 0%, #001100 100%);
    min-height: 100vh;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* Scrollbar styling for Matrix theme */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #000000;
  }

  ::-webkit-scrollbar-thumb {
    background: #00ff00;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #00cc00;
  }

  /* Selection styling */
  ::selection {
    background: #00ff00;
    color: #000000;
  }

  /* Focus outline for accessibility */
  *:focus {
    outline: 2px solid #00ff00;
    outline-offset: 2px;
  }

  /* Matrix rain effect for background */
  @keyframes matrix-rain {
    0% {
      transform: translateY(-100vh);
    }
    100% {
      transform: translateY(100vh);
    }
  }
`

export default GlobalStyles
