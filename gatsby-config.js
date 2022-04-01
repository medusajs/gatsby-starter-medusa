require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    siteMetadata:
        {
    // @ts-ignore
    title: `Medusa Gatsby Starter`,
   description: `Kick off your next, great e-commerce project with this default starter with Medusa, Gatsby and common dev tools.`,
  author: `@medusajs`,
  siteUrl: 'https://gcn.netlify.app',
  image: '/images/share.jpg',
  menuLinks: [
      {
  name: 'Home',
  slug: '/',
      },
      {
  name: 'About',
  slug: '/about/',
      },
      {
  name: 'Contact',
  slug: '/contact/',
      },

  ],
    postsPerFirstPage: 7,
    postsPerPage: 6,
    basePath: '/',
  },


 plugin:[

   `gatsby-plugin-image`,
   `gatsby-plugin-sharp`,
   `gatsby-transformer-sharp`,
   `gatsby-plugin-lodash`,
   "gatsby-plugin-mdx",
   `gatsby-plugin-react-helmet`,

   {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "info",
      path: "${__dirname}/src/content/info/",
    },
  },
  {
      resolve: `gatsby-source-custom`,
      options: {
        apiKey: process.env.API_KEY,
      },
    },
{

    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'images',
      path: '${__dirname}/src/images',
      },
},
{
    resolve: `gatsby-plugin-postcss`,
    options: {
      postCssPlugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },

 {
    resolve: `gatsby-plugin-purgecss`,
    options: {
      printRejected: true,
      develop: true,
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
],
}
