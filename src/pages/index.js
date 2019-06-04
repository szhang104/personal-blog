import React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";


class AllPosts extends React.Component {
  constructor (props) {
    super(props);
    this.posts = [];
    this.posts = this.posts.concat(props.data.allAsciidoc.edges);
  }

  process_post( {node} ) {
    const title = node.document.title || node.fields.slug;
    const slug = node.fields.slug;
    const date = node.document.date;
    return <div id={slug}>
      <h3><Link to={slug}>{title}</Link></h3>
      <small>{date}</small>
      <p><small>{node.document.excerpt}</small></p>
    </div>
  }

  render () {
    return <div id="all_posts" style={{width: `1000px`}}>
      {this.posts.map(this.process_post)}
    </div>;
  }
}








class BlogIndex extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <div id="index_page_layout" style={{display: `flex`, justifyContent: `space-evenly`, marginBottom: `3em`}}>
          <Bio />
          <AllPosts data={data}/>
        </div>
      </Layout>
    )
  }
}



export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allAsciidoc(sort: { fields: document___date, order: DESC }) {
      edges {
        node {
          fields {
            slug
          }
          document {
            title
            date
            excerpt
          }
        }
      }
    }
  }
`;