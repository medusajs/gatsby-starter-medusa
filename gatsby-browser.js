import Medusa from "@medusajs/medusa-js"
import React from "react"
import Layout from "./src/components/layout"
import { MedusaProvider } from "./src/context/medusa-context"

const STORE_URL = process.env.GATSBY_STORE_URL || "http://localhost:9000"

const medusaClient = new Medusa({ baseUrl: STORE_URL })

export const wrapPageElement = ({ element, props }) => {
  return (
    <MedusaProvider client={medusaClient}>
      <Layout {...props}>{element}</Layout>
    </MedusaProvider>
  )
}
