// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
}

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

export const siteMetadata = {
  title: `Medusa Gatsby Starter`,
  description: `Kick off your next, great e-commerce project with this default starter with Medusa, Gatsby and common dev tools.`,
  author: `@medusajs`,
};
export const plugins = [
  `gatsby-plugin-react-helmet`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      path: `${__dirname}/src/images`,
    },
  },
  "gatsby-plugin-mdx",
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "info",
      path: `${__dirname}/src/content/info/`,
    },
  },
  `gatsby-plugin-image`,
  `gatsby-plugin-sharp`,
  `gatsby-transformer-sharp`,
  {
    resolve: `gatsby-plugin-postcss`,
    options: {
      postCssPlugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  {
    resolve: `gatsby-plugin-purgecss`,
    options: {
      printRejected: false,
      develop: false,
      tailwind: true,
    },
  },
  {
    resolve: `gatsby-source-medusa`,
    options: {
      storeUrl:
        process.env.GATSBY_MEDUSA_BACKEND_URL || `http://localhost:9000`,
    },
  },
];
