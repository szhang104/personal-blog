import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';
import ReactHtmlParser from 'react-html-parser';
import katexReplaceWithTex from 'katex/contrib/copy-tex/katex2tex.js';
import 'katex/contrib/copy-tex/copy-tex.css';

// used by reacthtmlparser for custom node translation
function transform(node) {
  if (node.type === 'tag' && node.name === 'div' && node.attribs !== undefined && node.attribs.class === 'inline-math') {
    return React.createElement(TeX, {}, node.children[0].data);
  }
  if (node.type === 'tag' && node.name === 'div' && node.attribs !== undefined && node.attribs.class === 'block-math') {
    return React.createElement(TeX, {block: true }, node.children[0].data);
  }
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
        <SEO
          title={post_title}
          description={post_description}
        />
        <h1>{post_title}</h1>
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

      </Layout>
    )
  }

  componentDidMount() {
    document.addEventListener('copy', function(event) {
    const selection = window.getSelection();
    if (selection.isCollapsed) {
        return;  // default action OK if selection is empty
    }
    const fragment = selection.getRangeAt(0).cloneContents();
    if (!fragment.querySelector('.katex-mathml')) {
        return;  // default action OK if no .katex-mathml elements
    }
    // Preserve usual HTML copy/paste behavior.
    const html = [];
    for (let i = 0; i < fragment.childNodes.length; i++) {
        html.push(fragment.childNodes[i].outerHTML);
    }
    event.clipboardData.setData('text/html', html.join(''));
    // Rewrite plain-text version.
    event.clipboardData.setData('text/plain',
        katexReplaceWithTex(fragment).textContent);
    // Prevent normal copy handling.
    event.preventDefault();
});
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