import { Disclosure } from "@headlessui/react"
import React from "react"

const Expandable = ({ title, children }) => {
  return (
    <Disclosure
      as="div"
      key={title}
      className="border-t last:border-b border-ui-medium py-6"
    >
      {({ open }) => (
        <>
          <h3 className="-my-3 flow-root">
            <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-lg">
              <span className="font-medium text-gray-900">{title}</span>
              <span className="ml-6 flex items-center">
                {open ? <span>—</span> : <span>+</span>}
              </span>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel className="pt-6">
            <div className="space-y-4 text-sm">{children}</div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Expandable
