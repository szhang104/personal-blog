import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {Helmet} from "react-helmet";

// aesthetics
import { rhythm, scale } from "../utils/typography"
import {Title, Main} from "../components/common";

// math display using katex
import 'katex/dist/katex.min.css'; // without it can't display
import 'katex/contrib/copy-tex/copy-tex.css'; // click to select whole equation
// import katexReplaceWithTex from 'katex/contrib/copy-tex/katex2tex.js';
import 'katex/contrib/copy-tex/copy-tex.js';
import TeX from '@matejmazur/react-katex';

// to avoid using the dangerouslysetinnterhtml; use this to tranform a string of html tags to React elements
import ReactHtmlParser from 'react-html-parser';
import { convertNodeToElement } from 'react-html-parser';
// import generatePropsFromAttributes from 'react-html-parser/utils/generatePropsFromAttributes';

const crypto = require('crypto');
const str_hash_f = x => {
  console.log(x);
  return crypto.createHash("sha256").update(x, "binary").digest("base64");
}



// used by reacthtmlparser for custom node translation; tranform should return a valid React component or null
function transform(node, index) {
  if (node.type === 'tag' && node.name === 'div' && node.attribs !== undefined && node.attribs.class === 'inline-math') {
    return React.createElement(TeX, {}, node.children[0].data);
  }
  if (node.type === 'tag' && node.name === 'div' && node.attribs !== undefined && node.attribs.class === 'block-math') {
    return React.createElement(TeX, {block: true }, node.children[0].data);
  }
  // if (node.type === 'tag' && node.name === 'li') {
  //   let p_children = node.children.filter( x => x.type == 'tag' && x.name == 'p')
  //   node.attribs["key"] = str_hash_f(p_children[0].children[0].data);
  //   return convertNodeToElement(node, index, transform);
  // }
}



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
      <Helmet>    
        <link rel="stylesheet" type="text/css"  href="https://rsms.me/inter/inter.css" />
      </Helmet>
        <SEO
          title={post_title}
          description={post_description}
        />
        <Main>
        <Title>{post_title}</Title>
        <p className="meta">{post_date + " by " + post_authors[0]}</p>
        <div> {ReactHtmlParser(post.html, {
          transform: transform,
        })} </div>
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
        </Main>
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