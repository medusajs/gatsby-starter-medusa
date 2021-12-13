import React, { Fragment } from "react"

const DividedContainer = ({ children }) => {
  return (
    <div className="inline-flex items-center">
      {children.map((child, index) => {
        return (
          <Fragment key={index}>
            {child}
            {index !== children.length - 1 && (
              <div className="w-px h-4 bg-ui-medium mx-4"></div>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

export default DividedContainer
