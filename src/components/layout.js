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
import scriptLoader from 'react-async-script-loader'

// import "./layout.css"

class PageContained_ extends React.Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
  }


  renderMath() {
    window.MathJax.Hub.Queue([
      "Typeset",
      window.MathJax.Hub,
      this.node.current,
    ]);
  }

  // componentDidMount() {
  //   this.renderMath();
  // }

  componentDidUpdate() {
    this.renderMath();
  }

  render() {
    return <div ref={this.node} id="global_layout" className={this.props.className}>{this.props.children}</div>;
  }
}


const PageContained = styled(PageContained_)`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth}px;
  padding: 0 1.0875rem 1.45rem;
  display: flex;
  flex-direction: column;
  
  #main_columns {
    display: flex;
    flex-direction: row;
    flex-grow: 0;
    flex-shrink: 0;
    align-items: flex-start;
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
  flex: 0 0 7em;
  margin: 0 4ch 0 1ch;
  display: flex;
  flex-direction: column;
  font-size: 15px;
  border-bottom: 1px solid black;
  #sidebar-nav {
    display:flex;
    flex-direction: column;
    padding: 1.5em 0 1.5em 0;
    border-bottom: 1px dotted gray;
  }
  #sidebar-links {
    display:flex;
    flex-direction: column;
    padding: 1.5em 0 1.5em 0;
    border-bottom: 1px dotted gray;
  }
  #sidebar-message {
    padding: 1.5em 0 1em 0;
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
          <script type="text/javascript">
            {`function renderMath() { MathJax.Hub.Rerender(); }`}
          </script>
          <script type="text/javascript" async onload="renderMath()"
                  src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML">
          </script>
        </Helmet>
        <GlobalStyle />
        <PageContained>
          <Header siteMetaData={data.site.siteMetadata} />
          <div id="main_columns">
            <Sidebar/>
            {children}
          </div>
          <Footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </Footer>
        </PageContained>
      </>
      </ThemeProvider>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default scriptLoader(
  [
    'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML',
  ],
)(Layout);
