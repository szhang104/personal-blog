// theme
import React from "react";
import { Link } from "gatsby";
import styled, {createGlobalStyle} from 'styled-components';

const Title = styled.h1`
  width: 100%;
  text-align: center;
  margin: 2.1rem 0 1.8rem 0;
`;

const Main = styled.main`
  margin: 0 auto 0.3em 0;
  padding-bottom: 0.5em;
  border-bottom: 1px solid rgb(76, 86, 106);
`;


const theme = {
  shadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  colors: {
    border: '#4C566A'
  },
  maxWidth: 720,
  fontSize: {
    small: '80%'
  }
};

const base_global_style = `
::selection {
  background: #c9ecff;
}
::-moz-selection {
  background: #c9ecff;
}
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
  font-family: 'Inter', sans-serif;
  text-rendering: optimizeLegibility;
  line-height: 1.4;
}

body {
  background: #ffffff;
  color: #3a343a;
  font-size: 16px;
  text-rendering: optimizeLegibility;
}

a {
  outline: none;
  text-decoration: none;
  color: inherit;
}

p a, figcaption a {
  border-bottom: 1px solid ${props => props.theme.colors.border};
}

table {
  margin: 0 auto;
}

.gatsby-resp-image-link {
  border-bottom: none;
}


h1 {
  font-size: 230%;
  line-height: 1.2;
  margin-bottom: 0.2em;
}

h2, h3, h4, h5, h6 {
  line-height: 1.2;
  margin-bottom: 0rem;
}

h2 {
  margin-top: 1.2em;
  font-size: 1.4rem;
}


h3 {
  margin-top: 1rem;
  font-size: 1.2rem;
}

// p {
//   margin-top: 0.7rem;
//   margin-bottom: 1rem;
// }

blockquote {
  font-style: italic;
  border-left: 2px solid #2E3440;
  padding-left: 1.4rem;
  margin-left: -1.4rem;
}

li {
  margin-bottom: 0.7rem;
  padding-left: 1.4rem;
}

ul, ol {
  padding-left: 1.4rem;
}

hr {
  border-top: none;
  border-bottom: 1px solid black;
}

.gatsby-highlight {
    box-shadow: ${props => props.theme.shadow};
    font-family: 'Iosevka Web', 'monospace';
    font-size:90%;
    background-color: #2e3440;
    margin: 1em 0;
    padding: 1em;
    overflow: auto;
}

.gatsby pre, .gatsby pre code {
    font-family: 'Iosevka Web', 'monospace';
}

.gatsby-highlight pre[class*="language-"] {
 background-color: transparent;
 margin: 0;
 padding: 0;
 overflow: initial;
 float: left; /* 1 */
 min-width: 100%; /* 2 */
}

.gatsby-video-aspect-ratio {
    box-shadow: ${props => props.theme.shadow};
    margin: 1em 0;
}

.gatsby-resp-image-wrapper {
    max-width: none !important;
}

img[src$=gif] {
    background-color: #2E333F;
    box-shadow: ${props => props.theme.shadow};
    width: 100%;
}

img[src$="svg"] {
  width: 100%;
}

#disqus_thread {
  position: relative;
}

#disqus_thread::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 55px;
    background: #ffffff;
}

kbd {
  font-size: 90%;
  font-family: 'Iosevka Web', 'monospace';
  padding: .05em .4em;
  border-radius: 3px;
  border: 1px solid gray;
  background: #ECEFF4;
}

figure figcaption {
  padding: 0.7em 1.4em;
  font-size: ${props => props.theme.fontSize.small};
  background: #ECEFF4;
}

p {
  display: block;
}

`;

class NavBottom extends React.Component {
  constructor (props) {
    super(props);
    let {next, previous} = props;
    this.next = next ? <Link to={next.fields.slug} rel="next">{next.document.title} →</Link> : "No More";
    this.prev = previous ? <Link to={previous.fields.slug} rel="prev">← {previous.document.title}</Link> : "No More";
  }

  render() {
    return (
        <div
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <div>{this.prev}</div>
          <div>{this.next}</div>
        </div>
      )
  }
}


const GlobalStyle = createGlobalStyle`${base_global_style}`;

export {Title, Main, GlobalStyle, theme, NavBottom};