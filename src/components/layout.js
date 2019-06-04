/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import {Helmet} from "react-helmet";
import Header from "./header"
import {GlobalStyle, theme} from "./common"
import styled, {ThemeProvider} from 'styled-components';

// import "./layout.css"

const PageContained = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth}px;
  padding: 0 1.0875rem 1.45rem;
  padding-top: 0;
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
        </Helmet>
        <GlobalStyle />
        <PageContained id="global_layout">
          <Header siteMetaData={data.site.siteMetadata} />
          {children}
          <footer>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </PageContained>
      </>
      </ThemeProvider>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout
