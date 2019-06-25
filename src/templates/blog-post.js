import React from "react"
import {graphql, Link} from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

// math display using katex
// import 'katex/dist/katex.min.css'; // without it can't display
// import 'katex/contrib/copy-tex/copy-tex.css'; // click to select whole equation
// import katexReplaceWithTex from 'katex/contrib/copy-tex/katex2tex.js';
// import 'katex/contrib/copy-tex/copy-tex.js';
// import TeX from '@matejmazur/react-katex';

import styled from "styled-components";

import AsciidocDisplay from '../components/asciidoc_display';

class NavBottom_ extends React.Component {
  render() {
    let next = this.props.context.next, previous = this.props.context.previous;
    next = next ?
      <Link to={next.fields.slug} rel="next">{next.document.title} →</Link> :
      "No More Newer";
    let prev = previous ?
      <Link to={previous.fields.slug} rel="prev">← {previous.document.title}</Link> :
      "No More Older";
    return (
      <div id="nav-bottom" className={this.props.className}>
        <div>{prev}</div>
        <div>{next}</div>
      </div>
    )
  }
}

const NavBottom = styled(NavBottom_)`
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          list-style: none;
          padding: 0.7em 0 0 0;
`;

const PostMain = styled.main`
  margin: 0 auto 0.3em 0;
  padding-bottom: 0.5em;
  display: flex;
  flex-direction: column;
  width: 100%;
  
  #post_meta {
    margin: 0 0 1em 0;
  }
  
  #post_date {
    text-align: left;
  }
  
  #post_tags {
    text-align: left;
  }
  
  #post_tldr {
    margin: 0 0 0.5em 0;
    font-style: italic;
  }
`;

const Article = styled.article`
  padding: 0 0 2em 0;
  border-bottom: 1px solid rgb(76, 86, 106);
`;

const PostTitle = styled.h1`
  text-align: center;
`;

// <div dangerouslySetInnerHTML={{ __html: post.html }} />
class BlogPostTemplate extends React.Component {
  render() {
    let post = this.props.data.asciidoc;
    let authors = post.document.authors.map((a, i, arr) => {
      if (i === 0) {
        return " by " + a;
      } else if (i === arr.length - 1) {
        return " and " + a;
      } else {
        return " " + a;
      }
    });
    authors = authors.concat();
    let date = new Date(post.document.date).toLocaleDateString('en-US');
    let tags = post.document.tags.map((t, i, arr) => {
      return (
        <span key={t}>{t + (i < arr.length - 1 ? ', ' : '')}</span>
      );
    });
    let excerpt = post.document.excerpt ? <div id={"post_tldr"}>{post.document.excerpt}</div> : null;

    return (
      <Layout>
        <SEO
          title={post.document.title}
          description={"nothing yet"}
        />
        <PostMain id="post_main" className={this.props.className + " content"}>
          <PostTitle id='post_title'>{post.document.title}</PostTitle>
          <div id="post_meta">
            {excerpt}
            <div id="post_date">last updated: {date}</div>
            {authors.length !== 0 ? <div id="post_authors">{authors}</div> : null}
            {tags.length !== 0 ? <div id="post_tags">{tags}</div> : null}
          </div>
          <Article id="markdownOutput" className={this.props.className}>
            <AsciidocDisplay inner={post.html}/>
          </Article>
          <NavBottom context={this.props.pageContext}/>
        </PostMain>
      </Layout>
    )
  }

}


export default BlogPostTemplate;

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
        tags
        excerpt
      }
    }
  }
  `;