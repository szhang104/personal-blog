import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import 'katex/dist/katex.min.css';
import 'katex/dist/katex.min.js';
import TeX from '@matejmazur/react-katex';
import renderMathInElement from 'katex/contrib/auto-render/auto-render.js';

// <div dangerouslySetInnerHTML={{ __html: post.html }} />



class BlogPostTemplate extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const post = this.props.data.asciidoc
    const post_title = post.document.title
    const post_date = post.document.date
    const post_description = "nothing yet"
    const post_authors = post.document.authors
    const rendered = post.html;
    
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post_title}
          description={post_description}
        />
        <h1>{post_title}</h1>
        <p className="meta">{post_date + " by " + post_authors[0]}</p>
        <div dangerouslySetInnerHTML={{ __html: rendered }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <p> <TeX>\int_0^\infty x^2 dx</TeX> </p>

        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.document.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.document.title} →
              </Link>
            )}
          </li>
        </ul>

      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    asciidoc(fields: { slug: { eq: $slug } }) {
      id
      html
      document {
        title
        authors
        date
      }
    }
  }
  `