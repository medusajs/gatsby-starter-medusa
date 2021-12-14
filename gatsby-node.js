const Medusa = require("@medusajs/medusa-js").default

const toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join("-")

const getFilterables = products => {
  const filterables = {}
  products.forEach(product => {
    product.options.forEach(option => {
      const { title, values } = option
      if (!filterables[title]) {
        filterables[title] = {
          title: title,
          values: [],
        }
      }
      values.forEach(value => {
        if (!filterables[title].values.find(v => v === value.value)) {
          filterables[title].values.push(value.value)
        }
      })
    })
  })

  return filterables
}

const BASE_URL =
  process.env.GATSBY_MEDUSA_BACKEND_URL || "http://localhost:9000"

// This method should be deleted once you have added collections to your store
exports.sourceNodes = async function ({
  actions,
  createNodeId,
  createContentDigest,
  reporter,
}) {
  const client = new Medusa({ baseUrl: BASE_URL })
  const { createNode } = actions

  const count = await client.collections
    .list()
    .then(({ count }) => count)
    .catch(_ => 0)

  if (count === 0) {
    const dummyCollection = {
      handle: "dummy-collection",
      title: "Dummy Collection",
    }

    const nodeContent = JSON.stringify(dummyCollection)

    const nodeMeta = {
      id: createNodeId(`prodcol_dummy`),
      parent: null,
      children: [],
      internal: {
        type: "MedusaCollections",
        content: nodeContent,
        contentDigest: createContentDigest(dummyCollection),
      },
    }

    const node = Object.assign({}, dummyCollection, nodeMeta)

    reporter.warn(
      "📣 Your store does not have any collections. This starter expects you to have defined atleast one collection in your store, as they are referenced in several GraphQL queries throughout the site. To allow for you to still checkout the starter without having to add a collection, we will add a dummy collection. In a production environment you should either add collections to your store, or if you don't wish to make use of collections then remove all references to them throughout the project."
    )

    createNode(node)
  }
}

// This method can also be deleted once you have added collections to your store
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MedusaProducts implements Node {
      collection_id: String
    }
  `
  createTypes(typeDefs)
}

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMedusaRegions {
        edges {
          node {
            name
            currency_code
            id
            tax_rate
          }
        }
      }
      allMedusaProducts {
        edges {
          node {
            id
            title
            thumbnail {
              childImageSharp {
                gatsbyImageData
              }
            }
            handle
            collection_id
            options {
              values {
                value
              }
              title
            }
            variants {
              prices {
                amount
                currency_code
              }
            }
          }
        }
      }
      allMedusaCollections {
        edges {
          node {
            handle
            id
            title
          }
        }
      }
      allMdx {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  data.allMdx.edges.forEach(({ node }) => {
    actions.createPage({
      path: `/${node.slug}`,
      component: require.resolve(`./src/templates/mdx.js`),
      context: { id: node.id },
    })
  })

  data.allMedusaRegions.edges.forEach(({ node }) => {
    const { id, name, currency_code, tax_rate } = node
    const kebabCasedName = toKebabCase(name)

    data.allMedusaProducts.edges.forEach(({ node }) => {
      const handle = node.handle
      actions.createPage({
        path: `${kebabCasedName}/${handle}`,
        component: require.resolve(`./src/templates/product.js`),
        context: {
          handle: handle,
          regionId: id,
          currencyCode: currency_code,
          taxRate: tax_rate,
        },
      })
    })
  })

  const products = data.allMedusaProducts.edges.map(({ node }) => node)

  actions.createPage({
    path: "/products",
    component: require.resolve(`./src/templates/collection.js`),
    context: {
      title: "All Products",
      products: products,
      filterables: getFilterables(products),
    },
  })

  const isDummyCollection =
    data.allMedusaCollections.edges[0].node.id === "prodcol_dummy"

  if (!isDummyCollection) {
    data.allMedusaCollections.edges.forEach(({ node }) => {
      const { id, handle, title } = node

      const productsInCollection = products.filter(
        product => product.collection_id === id
      )

      actions.createPage({
        path: `collections/${handle}`,
        component: require.resolve(`./src/templates/collection.js`),
        context: {
          title: title,
          products: productsInCollection,
          filterables: getFilterables(productsInCollection),
        },
      })
    })
  }
}
