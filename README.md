<p align="center">
  <a href="https://www.medusa-commerce.com">
    <img alt="Medusa" src="https://user-images.githubusercontent.com/7554214/153162406-bf8fd16f-aa98-4604-b87b-e13ab4baf604.png" width="100" />
  </a>
</p>
<h1 align="center">
  Medusa Gatsby Starter
</h1>
<p align="center">
Medusa is an open-source headless commerce engine that enables developers to create amazing digital commerce experiences.
</p>
<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Medusa is released under the MIT license." />
  </a>
  <a href="https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>

> :warning: **This storefront is deprecated and may not work with the latest versions of Medusa. It's recommended to use the [Next.js storefront](https://github.com/medusajs/nextjs-starter-medusa) instead.**

## 🚀 Quick Start

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/medusajs/gatsby-starter-medusa)

1. **Create a new Gatsby project**

```zsh
  npx gatsby new my-medusa-storefront https://github.com/medusajs/gatsby-starter-medusa

  # or

  git clone https://github.com/medusajs/gatsby-starter-medusa.git my-medusa-storefront
```

2. **Install dependencies**

```zsh
  cd my-medusa-storefront
  yarn
```

3. **Link to your backend**

In the folder `my-medusa-storefront` you should have a `.env.template` file with the following content:

```shell
GATSBY_MEDUSA_BACKEND_URL=http://localhost:9000
```

Before you can start developing your site you first need to copy this file into a new file named `.env.development`.

```zsh
mv .env.template .env.development
```

Per default your Medusa server should be running on `localhost:9000`, but if you have changed this you will then need to replace `GATSBY_MEDUSA_BACKEND_URL` with the URL of your Medusa server.

```zsh
GATSBY_MEDUSA_BACKEND_URL=<link to your server>
```

4. **Start development**

You should now be able to start developing your site.

```zsh
yarn start
```

5. **Open the source code and start editing!**

   Your site is now running at `http://localhost:8000`!

   _Note: You'll also see a second link: _`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.com/tutorial/part-five/#introducing-graphiql)._

   Open the `my-medusa-starter` directory in your code editor of choice and edit `src/pages/index.jsx`. Save your changes and the browser will update in real time!
