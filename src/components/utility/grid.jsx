import { Link } from "gatsby"
import React from "react"
import Arrow from "../../icons/arrow"

const Grid = ({ title, cta, children }) => {
  return (
    <div>
      {title && cta ? (
        <div className="flex items-center justify-between mb-6">
          <p className="text-2xl font-semibold text-gray-700">{title}</p>
          <Link to={cta.to} className="text-ui-dark flex items-center">
            <span className="mr-2 text-ui-dark">{cta.text}</span>
            <Arrow />
          </Link>
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {children}
      </div>
    </div>
  )
}

export default Grid
