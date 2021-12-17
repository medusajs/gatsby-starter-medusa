import React, { Fragment } from "react"

const SplitField = ({ children }) => {
  return (
    <div className="flex items-baseline mt-4 w-full">
      {children.map((child, index) => {
        return (
          <Fragment key={index}>
            {child}
            {index < children.length - 1 && <div className="mx-2" />}
          </Fragment>
        )
      })}
    </div>
  )
}

export default SplitField
