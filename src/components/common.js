// import React from "react";
import {createGlobalStyle} from 'styled-components';

const theme = {
  shadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  colors: {
    border: '#4C566A',
    link: '#3c3c3c',
  },
  maxWidth: 1200,
  sidebarWidth: `8em`,
  mainWidth: `700px`,
  fontSize: {
    small: '80%',
    normal: '100%',
  },
  baseFontSize: `15px`,
  baseLinSpace: 1.4,
  baseFont: `IBM Plex Serif`,
};

const GlobalStyle = createGlobalStyle`
/* cyrillic-ext */
@font-face {
  font-family: 'IBM Plex Serif';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('IBM Plex Serif'), local('IBMPlexSerif'), url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizDREVNn1dOx-zrZ2X3pZvkTiUS2zcLig.woff2) format('woff2');
  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
}
/* cyrillic */
@font-face {
  font-family: 'IBM Plex Serif';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('IBM Plex Serif'), local('IBMPlexSerif'), url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizDREVNn1dOx-zrZ2X3pZvkTiUb2zcLig.woff2) format('woff2');
  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* latin-ext */
@font-face {
  font-family: 'IBM Plex Serif';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('IBM Plex Serif'), local('IBMPlexSerif'), url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizDREVNn1dOx-zrZ2X3pZvkTiUR2zcLig.woff2) format('woff2');
  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: 'IBM Plex Serif';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: local('IBM Plex Serif'), local('IBMPlexSerif'), url(https://fonts.gstatic.com/s/ibmplexserif/v7/jizDREVNn1dOx-zrZ2X3pZvkTiUf2zc.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}




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
  font-family: ${props => props.theme.baseFont}, sans-serif;
  text-rendering: optimizeLegibility;
  line-height: 1.4;
  font-size: ${props => props.theme.baseFontSize};
}

body {
  background: #ffffff;
  color: #3a343a;
}

/* A tufte-css style link */

a {
  color: inherit;
  text-decoration: none;
}

.content a {
  outline: none;
  text-decoration: none;
  color: #3c3c3c;
  background-image:
      linear-gradient(#fff, #fff),
      linear-gradient(#fff, #fff),
      linear-gradient(#333, #333);
  background-size:
      0.05em 1px,
      0.05em 1px,
         1px 1px;
  background-repeat:
      no-repeat,
      no-repeat,
      repeat-x;
  background-position:
        0 90%,
      100% 90%,
        0 90%;
  text-shadow: 0.03em 0       #fff,         -0.03em 0       #fff,          0      0.03em  #fff,          0     -0.03em  #fff,          0.06em 0       #fff,         -0.06em 0       #fff,          0.09em 0       #fff,         -0.09em 0       #fff,          0.12em 0       #fff,         -0.12em 0       #fff,          0.15em 0       #fff,         -0.15em 0       #fff;
  /*  Disable oldstyle nums in underlined links because the oldstyle nums are almost subscript-like and overlap */
  font-variant-numeric: lining-nums;

}

table {
  margin: 0 auto;
}

.gatsby-resp-image-link {
  border-bottom: none;
}

h1 {
  font-size: 2.3rem;
  line-height: 1.2;
  margin-top: 1.3rem;
  margin-bottom: 0.5rem;
}

h2, h3, h4, h5, h6 {
  line-height: 1.2;
  margin-bottom: 0.3rem;
}

h2 {
  margin-top: 1rem;
  font-size: 1.4rem;
}


h3 {
  margin-top: 1rem;
  font-size: 1.2rem;
}

/* this is the title for blocks */
div.title {
  font-size: 95%;
  color: #888888;
  font-weight: 500;
}

div.paragraph div.title {
  font-size: 100%;
  color: black;
  font-weight: 500;
  display: inline;

}

blockquote {
  font-style: italic;
  border-left: 2px solid #2E3440;
  padding-left: 1.4rem;
  margin-left: -1.4rem;
}

/**************/
/* PARAGRAPHS */
/**************/

p {
    margin: 0;
}
.paragraph {
    margin-bottom: 0.2em;
}

.paragraph + .paragraph {
    text-indent: 2em;
}
@media only screen and (max-width: 64.9ch) {
    .paragraph + .paragraph {
        text-indent: 1em;
    }
}

/*********/
/* LISTS */
/*********/
ul,
ol {
    list-style-type: none;
    margin: 0;
    padding: 0 0 0 2em;
    overflow: hidden;
}

/* the div after a list should add space */
div .ulist + div {
  margin-top: 1em;
}

div .olist + div {
  margin-top: 1em;
}

li > ul,
li > ol {
    margin: 0.5rem 0;
}

ul > li,
ol > li {
    position: relative;
    margin: 0;
}
ul > li:nth-of-type(n+2),
ol > li:nth-of-type(n+2) {
    margin: 0.3rem 0 0 0;
}

ul > li::before,
ol > li::before {
    position: absolute;
    z-index: 1;
}

@media only screen and (max-width: 64.9ch) {
    ul,
    ol {
        padding: 0 0 0 1.75em;
    }
}
/*=-----------------------=*/
/*= Bulleted list markers =*/
/*=-----------------------=*/
ul > li::before {
    color: #888;
    font-size: 0.875em;
    top: 0.125em;
    left: -1.375em;
}

ul > li::before,
ul ul ul > li::before {
    content: "\\2727";
}
ul ul > li::before,
ul ul ul ul > li::before {
    content: "\\2726";
}

/*=-----------------------=*/
/*= Numbered list markers =*/
/*=-----------------------=*/

ol {
    counter-reset: ol;
}
ol > li {
    counter-increment: ol;
}
ol > li::before {
    content: counter(ol) ".";
    width: 2em;
    right: calc(100% + 0.5em);
    text-align: right;
    font-feature-settings: 'onum';
    color: #444;
}

ol ol {
    list-style-type: lower-roman;
}
ol ol > li {
    padding: 0 0 0 0.25em;
}
ol ol > li::before {
    content: none;
}

ol ol ol {
    list-style-type: lower-alpha;
}

/*=------------------=*/
/*= Weird edge cases =*/
/*=------------------=*/

li > ul + p,
li > ol + p {
    margin-top: 1em;
}


/*=-----------------------=*/
/*= other blocks---------=*/
/*=-----------------------=*/

div .dlist {
  margin-bottom: 0.15em;
}

dd {
  text-indent: 3em;
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

export {GlobalStyle, theme};