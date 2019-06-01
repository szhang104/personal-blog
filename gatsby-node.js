const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`);
const asciidoctor = require(`asciidoctor`)();
const katex = require('katex');

class ReactAsciidocConverter {
  constructor () {
    this.baseConverter = asciidoctor.Html5Converter.$new();
  }

  convert (node, transform) {
    // if (node.getNodeName() === 'paragraph') {
    //   return `<p>${node.getContent()}</p>`;
    // }
    let content = "";
    if (node.getNodeName() === 'stem' || node.getNodeName() === `latexmath` ) {
      // corresponds to display math
      // essentially a asciidoc block
      // generate a virtual DOM according to
      // https://github.com/MatejBransky/react-katex
      content = node.getContent();
      console.log(content);
      return katex.renderToString(content, {
        throwOnError: false,
        displayMode: true,
      });
    }
    if (node.getNodeName() === 'inline_quoted') {
      // asciidoctor treats inline math as inline_quoted node.
      // node.getContent() does not seem to work
      // search $convert_inline_quoted in asciidoctor.js
      content = node.text;
      if (node.type == 'latexmath') {
        return katex.renderToString(content, {
          throwOnError: false,
          displayMode: false,
      });
      }
      return this.baseConverter.convert(node, transform) 
    }
    return this.baseConverter.convert(node, transform) 
  }
}
asciidoctor.ConverterFactory.register(new ReactAsciidocConverter(), ['html5']);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(
    `
      {
        allAsciidoc(
          sort: { fields: document___date, order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
	          document {
	            title
	          }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allAsciidoc.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })

    return null
  })
}


 const onCreateNode = (arg1) => {
  let { node, actions, getNode } = arg1;
  // modify the node that is a an asciidocpost, add a node field 'slug'
  if (node.internal.type == `File` && [`adoc`, `asciidoc`].includes(node.extension)) {
    return createAsciidocNode(arg1);
  }
  if (node.internal.type === `Asciidoc`) {
    const value = createFilePath({ node, getNode });
    actions.createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
}



async function createAsciidocNode({
  node, 
  actions,
  pathPrefix,
  loadNodeContent,
  createNodeId,
  reporter,
  createContentDigest}) {
  const createNode = actions.createNode,
        createParentChildLink = actions.createParentChildLink;


  const content = await loadNodeContent(node); // yield
  const asciidocOptions = {}
  let doc = await asciidoctor.load(content, asciidocOptions); // doc may be modified, yield

  try {
    const html = doc.convert(); // Use "partition" option to be able to get title, subtitle, combined

    const title = doc.getDocumentTitle({
      partition: true
    });

    let revision = doc.getRevisionInfo();

    let authors = doc.getAuthors();

    let pageAttributes = extractPageAttributes(doc.getAttributes());

    const asciiNode = {
      id: createNodeId(`${node.id} >>> ASCIIDOC`),
      parent: node.id,
      internal: {
        type: `Asciidoc`,
        mediaType: `text/html`,
        contentDigest: null,
      },
      children: [],
      html,
      document: {
        title: title.getCombined(),
        authors: authors ? authors.map(x => x.getName()) : [],
        date: revision.getDate(),
      },
      title,
      revision,
      authors,
      pageAttributes
    };
    asciiNode.internal.contentDigest = createContentDigest(asciiNode);
    createNode(asciiNode);
    createParentChildLink({
      parent: node,
      child: asciiNode
    });
  } catch (err) {
    reporter.panicOnBuild(`Error processing Asciidoc ${node.absolutePath ? `file ${node.absolutePath}` : `in node ${node.id}`}:\n
    ${err.message}`);
  }  

}

const extractPageAttributes = allAttributes => Object.entries(allAttributes).reduce((pageAttributes, [key, value]) => {
  if (key.startsWith(`page-`)) {
    pageAttributes[key.replace(/^page-/, ``)] = value;
  }

  return pageAttributes;
}, {});

exports.onCreateNode = onCreateNode