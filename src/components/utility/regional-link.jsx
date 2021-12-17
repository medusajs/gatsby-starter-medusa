import { Link } from "gatsby"
import React from "react"
import { useRegion } from "../../hooks/use-region"
import { toKebab } from "../../utils/to-kebab"

const RegionalLink = ({ to, children }) => {
  const { region } = useRegion()

  return <Link to={`/${toKebab(region?.name)}/${to}`}>{children}</Link>
}

export default RegionalLink
