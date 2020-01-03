require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `E-Commerce with Gatsby`,
    name: `Sentaro`,
    description: `This site is made with Gatsby`,
    siteUrl: `https://sentalog.netlify.com/`,
    social: [
      {
        url: `https://twitter.com/`,
      },
      {
        url: `https://github.com/`,
      },
      {
        url: `https://instagram.com/`,
      },
    ],
  },
  plugins: [
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
    `gatsby-plugin-stripe`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: ["Sku"],
        secretKey: process.env.STRIPE_SECRET_KEY,
        downloadFiles: true,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-functions`,
      options: {
        functionsSrc: `${__dirname}/functions`,
        functionsOutput: `${__dirname}/functions`,
      },
    },
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
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-functions`,
      options: {
        functionsSrc: `${__dirname}/src/functions`,
        functionsOutput: `${__dirname}/functions`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
