import { Link } from "gatsby"
import React from "react"

const HeaderLink = ({ to, text }) => {
  return (
    <Link
      to={to}
      className="block mt-4 mr-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-gray-600 last:mr-0"
    >
      {text}
    </Link>
  )
}

export default HeaderLink
