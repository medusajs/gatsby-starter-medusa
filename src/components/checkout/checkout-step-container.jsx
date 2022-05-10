import { Disclosure, Transition } from "@headlessui/react"
import React from "react"
import Checkmark from "../../icons/checkmark.svg"

const CheckoutStepContainer = ({
  title,
  isCompleted,
  isOpen,
  setState,
  step,
  children,
}) => {
  const handleClick = e => {
    e.preventDefault()
    if (isCompleted && !isOpen) {
      setState(step)
    }
  }

  return (
    <button className="text-left mb-4 last:mb-0 w-full" onClick={handleClick}>
      <Disclosure defaultOpen={isOpen}>
        <div className="bg-white rounded-lg p-8 shadow">
          <Disclosure.Button className="w-full">
            <div className="flex items-center justify-between w-full">
              <h3>{title}</h3>
              {isCompleted && (
                <span className="w-8 h-8 rounded-3xl bg-ui-dark flex items-center justify-center">
                  <img
                    src={Checkmark}
                    alt=""
                    aria-hidden="true"
                    className="w-4 h-4"
                  />
                </span>
              )}
            </div>
          </Disclosure.Button>
          <Transition
            show={isOpen}
            enter="transition duration-300 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-300 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel static>{children}</Disclosure.Panel>
          </Transition>
        </div>
      </Disclosure>
    </button>
  )
}

export default CheckoutStepContainer
