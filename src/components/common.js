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
    small: '80%'
  },
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
        0% 90%,
      100% 90%,
        0% 90%;
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

/* this is the title for blocks */
div .title {
  font-size: 95%;
  color: #888888;
  font-weight: 500;
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
    text-indent: 2.5em;
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
    margin: 0.1em 0 0em 0;
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
    margin: 0.5em 0;
}

ul > li,
ol > li {
    position: relative;
    margin: 0;
}
ul > li:nth-of-type(n+2),
ol > li:nth-of-type(n+2) {
    margin: 0.35em 0 0 0;
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

const GlobalStyle = createGlobalStyle`${base_global_style}`;

export {GlobalStyle, theme};