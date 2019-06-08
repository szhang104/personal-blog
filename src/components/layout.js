/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql, Link } from "gatsby"
import {Helmet} from "react-helmet";
import Header from "./header"
import {GlobalStyle, theme} from "./common"
import styled, {ThemeProvider} from 'styled-components';

// import scriptLoader from 'react-async-script-loader'

// import "./layout.css"


const renderMath_MathJax = () => {
  window.MathJax.Hub.Queue([
    "Typeset",
    window.MathJax.Hub,
    // this.myRef.current,
  ]);
};


const external_scripts = [
  {
    name: 'mathjax',
    url: "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML",
    onload: renderMath_MathJax,
    onupdate: renderMath_MathJax,
  },
];

class PageContained_ extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.external_scripts = props.external_scripts;
    this.external_scripts.forEach(s => {
      s.onload = s.onload.bind(this);
      s.onupdate = s.onupdate.bind(this);
    });
  }

  componentDidMount() {
    this.load_external_scripts();
  }

  load_external_scripts() {
    this.external_scripts.forEach(s => {
      let script = window.document.createElement("script");
      script.type = "text/javascript";
      script.src = s.url;
      script.onload = s.onload;
      window.document.getElementsByTagName("head")[0].appendChild(script);
    });
  }

  componentDidUpdate() {
    this.external_scripts.forEach(s => s.onupdate());
  }

  render() {
    return <div ref={this.myRef} id="global_layout" className={this.props.className}>{this.props.children}</div>;
  }
}


const PageContained = styled(PageContained_)`
  margin: 0 auto;
  // max-width: ${props => props.theme.maxWidth}px;
  padding: 0 1.0875rem 1.45rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  
  #content-container {
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 0;
    align-items: stretch;
    flex-basis: ${props => props.theme.mainWidth};
  }
`;


class Sidebar_ extends React.Component {
  render() {
    return (
      <div id="sidebar" className={this.props.className}>
        {/*<Image/> logo */}
        <div id="sidebar-nav">
          <Link to="/"> Home </Link>
          <Link to="/about-site">About This Site</Link>
          <Link to="/about-me">About Me </Link>
        </div>
        <div id="sidebar-links">
          <div>Useful Links</div>
          <a href={"www.google.com"}>Example Link</a>
        </div>
        <div id="sidebar-message">
          <p>Support the Free Software Movement!</p>
        </div>
      </div>
    )
  }
}

const Sidebar = styled(Sidebar_)`
  flex: 0 0 ${props => props.theme.sidebarWidth};
  margin: 0 4ch 0 1ch;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  margin-top: 3em;
  #sidebar-nav {
    display:flex;
    flex-direction: column;
    padding: 1em 0 1em 0;
    border-bottom: 1px dotted gray;
  }
  #sidebar-links {
    display:flex;
    flex-direction: column;
    padding: 1em 0 1em 0;
    border-bottom: 1px dotted gray;
  }
  #sidebar-message {
    padding: 1em 0 1em 0;
  }
`;

const Footer = styled.footer`
  text-align: center;
  margin: 10em 0 0 0;
`;


const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <ThemeProvider theme={theme}>
      <>
        <Helmet>
          <link rel="stylesheet" type="text/css"  href="https://rsms.me/inter/inter.css" />
          <script type="text/x-mathjax-config">
            {`MathJax.Hub.Config({extensions: ["jsMath2jax.js"],});`}
          </script>
        </Helmet>
        <GlobalStyle />
        <PageContained external_scripts={external_scripts}>
          <Sidebar/>
          <div id={`content-container`}>
            <Header siteMetaData={data.site.siteMetadata}/>
            {children}
            <Footer>
              © {new Date().getFullYear()}, Built with
              {` `}
              <a href="https://www.gatsbyjs.org">Gatsby</a>
            </Footer>
          </div>
        </PageContained>
      </>
      </ThemeProvider>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
