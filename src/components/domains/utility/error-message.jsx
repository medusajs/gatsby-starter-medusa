import React from "react"

const ErrorMessage = ({ error }) => {
  return (
    <div
      role="alert"
      className="flex items-center text-gray-700 text-xs bg-red-300 px-4 py-2 rounded-md mt-4"
    >
      <div className="bg-red-400 text-white w-4 h-4 rounded-lg text-center mr-2">
        !
      </div>
      <span>{error}</span>
    </div>
  )
}

export default ErrorMessage
