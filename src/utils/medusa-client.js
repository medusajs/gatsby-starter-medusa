import Medusa from "@medusajs/medusa-js"

export const client = new Medusa({ baseUrl: process.env.GATSBY_STORE_URL || "http://localhost:9000" })
