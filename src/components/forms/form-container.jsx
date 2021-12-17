import React from "react"

const FormContainer = ({ title, description, handleSubmit, children }) => {
  return (
    <div className="shadow rounded-lg overflow-hidden bg-white">
      <form
        onSubmit={e => {
          handleSubmit(e)
        }}
      >
        <div className="px-8 pt-8 pb-10">
          <h2>{title}</h2>
          <p className="text-sm font-light text-ui-dark">{description}</p>
          <div className="mt-4">{children}</div>
        </div>
        <div className="bg-ui-light flex items-center justify-end w-full px-8 py-4">
          <button className="btn-ui" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default FormContainer
