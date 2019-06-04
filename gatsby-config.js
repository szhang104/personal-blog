module.exports = {
  siteMetadata: {
    title: `<em>Biased</em> Representations`,
    description: `Because who live their lives <em>in expection</em>?`,
    author: `sz`,
    siteUrl: `http://localhost:8080/`,
    social: {
      twitter: `000`,
    },
  },
  plugins: [
    // {
    //   resolve: `gatsby-transformer-asciidoc`,
    //   options: {
    //   attributes: {
    // 	 showtitle: true,
    //   },
    //   },
    // },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `content/posts/`,
        name: "posts"
      }
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};