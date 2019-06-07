import React from "react"
import {graphql, Link} from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

// math display using katex
import 'katex/dist/katex.min.css'; // without it can't display
import 'katex/contrib/copy-tex/copy-tex.css'; // click to select whole equation
// import katexReplaceWithTex from 'katex/contrib/copy-tex/katex2tex.js';
import 'katex/contrib/copy-tex/copy-tex.js';
import TeX from '@matejmazur/react-katex';

// to avoid using the dangerouslysetinnterhtml; use this to tranform a string of html tags to React elements
import ReactHtmlParser from 'react-html-parser';
import styled from "styled-components";
// import { convertNodeToElement } from 'react-html-parser';
// import generatePropsFromAttributes from 'react-html-parser/utils/generatePropsFromAttributes';

// const crypto = require('crypto');
// const str_hash_f = x => {
//   console.log(x);
//   return crypto.createHash("sha256").update(x, "binary").digest("base64");
// };



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




class NavBottom_ extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      next: this.props.context.next,
      previous: this.props.context.previous,
    };
  }

  render() {
    let next = this.state.next ?
      <Link to={this.state.next.fields.slug} rel="next">{this.state.next.document.title} →</Link> :
      "No More";
    let prev = this.state.previous ?
      <Link to={this.state.previous.fields.slug} rel="prev">← {this.state.previous.document.title}</Link> :
      "No More";
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
  
  #post_meta {
    text-align: center;
    margin: 0 0 1em 0;
  }
`;

const Article = styled.article`
  padding: 0 0 2em 0;
  border-bottom: 1px solid rgb(76, 86, 106);
`;

const PostTitle = styled.h1`
  width: 100%;
  text-align: center;
  margin: 1.7rem 0 1.5rem 0;
`;

// <div dangerouslySetInnerHTML={{ __html: post.html }} />
class BlogPostTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.post = this.props.data.asciidoc;
    this.state = {
      title: this.post.document.title,
      authors: this.post.document.authors,
      date: this.post.document.date,
      post_description: "nothing yet",
      html: this.post.html,
      post_context: this.props.pageContext,
    }
  }

  render() {
    return (
      <Layout>
        <SEO
          title={this.state.title}
          description={this.state.post_description}
        />
        <PostMain id="post_main" className={this.props.className}>
          <PostTitle id='post_title'>{this.state.title}</PostTitle>
          <p id="post_meta">{this.state.date + " by " + this.state.authors[0]}</p>
          <Article>
          {ReactHtmlParser(
            this.state.html,
            {transform: transform,})}
          </Article>
          <NavBottom context={this.state.post_context}/>
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
      }
    }
  }
  `;