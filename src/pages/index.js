import React from "react";

import { Link, graphql } from "gatsby";
import styled from 'styled-components';
import Layout from "../components/layout";
import SEO from "../components/seo";

const TagBox = props => {
  let {tag, posts} = props;
  return (
      <div className={props.className + ' tag_container'} id={'tag_' + tag}>
        <h2>{tag}</h2>
        <ul>
          {posts.map(p => {
            return (
                <li key={p.node.fields.slug}>
                  <Link to={p.node.fields.slug}>{p.node.document.title}</Link>
                </li>);
          })}
        </ul>
      </div>
  );
};

class AllPosts_ extends React.Component {

  render () {
    let posts = [], tagged_posts = {};
    posts = posts.concat(this.props.data.allAsciidoc.edges);
    posts.forEach(p => {
      let t = p.node.document.primary_tag;
      if (tagged_posts.hasOwnProperty(t)) {
        tagged_posts[t].push(p);
      } else {
        tagged_posts[t] = [p];
      }
    });
    let res = [];
    for (const tag in tagged_posts) {
      if (tagged_posts.hasOwnProperty(tag)) {
        res.push(<TagBox key={tag} tag={tag} posts={tagged_posts[tag]}/>);
      }
    }
    return res;
  }
}

const AllPosts = styled(AllPosts_)`
    padding-left: 1em;
`;

class BlogIndex_ extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;
    return (
      <Layout>
        <SEO title={siteTitle} />
        <div id="index_page_layout" className={this.props.className + " content"}>
          <AllPosts data={data}/>
        </div>
      </Layout>
    )
  }
}

const BlogIndex = styled(BlogIndex_)`
  display: flex;
  justify-content: space-between;
  flex: 0 0 350px;
  flex-flow: row;
  flex-wrap: wrap;
  
  .tag_container {
    margin: 0 1em;
    max-width: 350px;
  }
`;

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allAsciidoc(sort: { fields: document___datetime, order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          document {
            title
            date
            excerpt
            primary_tag
          }
        }
      }
    }
  }
`;