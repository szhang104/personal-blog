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

// to avoid using the dangerouslysetinnterhtml; use this to tranform a string of html tags to React elements
import ReactHtmlParser from 'react-html-parser';
import styled from "styled-components";
import {convertNodeToElement, processNodes} from 'react-html-parser';
import generatePropsFromAttributes from 'react-html-parser/lib/utils/generatePropsFromAttributes.js';


class Stack {
  constructor() {
    this.items = [];
    this.count = 0;
  }

  getLength() {
    return this.count;
  }

  push(item) {
    this.items.push(item);
    this.count = this.count + 1;
  }

  pop() {
    if (this.count > 0) {
      this.count = this.count - 1;
    }

    return this.items.pop();
  }

  peek() {
    return this.items.slice(-1)[0];
  }
}


const generate_li_key = (node, index) => {
  let prehash_str, cur_node;
  prehash_str = "";
  // perform a Depth First Search for a child node which has a non-empty data field
  let to_visit = new Stack();
  let visited = new Set();
  to_visit.push(node);
  while (to_visit.getLength()) {
    cur_node = to_visit.pop();
    if (cur_node.data && cur_node.data !== "\n") {
      prehash_str = cur_node.data + index.toString(); // in case two li has the same text child
      break;
    }
    if (cur_node.children) {
      cur_node.children.forEach(child => {
          if (!visited.has(child)) {
            to_visit.push(child);
          }
        }
      );
    }
    visited.add(node)
  }

  // by this point the prehash_str should be a string, possibly of zero length
  // apply the method to get a quick number
  let hash = 0, i, chr;
  if (prehash_str.length === 0) {
    return hash;
  }
  for (i = 0; i < prehash_str.length; i++) {
    chr = prehash_str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};


// used by reacthtmlparser for custom node translation; tranform should return a valid React component or null
const transform = (node, index) => {
  // if (node.type === 'tag' && node.name === 'span' && node.attribs !== undefined && node.attribs.class === 'inline-math') {
  //   return React.createElement(TeX, {}, node.children[0].data);
  // }
  // if (node.type === 'tag' && node.name === 'div' && node.attribs !== undefined && node.attribs.class === 'block-math') {
  //   return React.createElement(TeX, {block: true }, node.children[0].data);
  // }
  if (node.type === 'tag' && node.name === 'li') {
    node.attribs["react_key"] = generate_li_key(node, index);
    return convertNodeToElement(node, index, transform);
  }
  if (node.type === 'tag' && node.name === 'table') {
    // generate props
    let props = generatePropsFromAttributes(node.attribs, index);

    let children = processNodes(node.children, transform);
    const table_body_elements = <tbody>{children}</tbody>;
    return React.createElement('table', props, table_body_elements)
  }
};


class NavBottom_ extends React.Component {
  constructor(props) {
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
  text-align: center;
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
        <PostMain id="post_main" className={this.props.className + " content"}>
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