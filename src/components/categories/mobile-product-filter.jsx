import { Dialog, Transition } from "@headlessui/react"
import React, { Fragment } from "react"

const MobileProductFilter = ({
  open,
  setOpen,
  filterables,
  activeFilters,
  setActiveFilters,
}) => {
  const handleChange = e => {
    const { key, value } = JSON.parse(e.target.value)
    const tmp = { ...activeFilters }

    if (e.target.checked) {
      if (!tmp[key]) {
        tmp[key] = []
      }

      tmp[key].push(value)
    } else {
      tmp[key] = tmp[key].filter(item => item !== value)

      if (tmp[key].length === 0) {
        delete tmp[key]
      }
    }

    setActiveFilters(tmp)
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 flex z-40 lg:hidden"
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative max-w-md w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
            <div className="px-4 pt-5 pb-2 flex">
              <button
                type="button"
                className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                &times;
              </button>
            </div>

            {Object.keys(filterables).map(key => {
              const filterable = filterables[key]
              const values = filterable.values
              const options = values.map(value => {
                const checked =
                  activeFilters?.[key] && activeFilters[key].includes(value)
                return (
                  <label
                    key={value}
                    className="block px-4 py-2 text-sm leading-5 text-gray-700"
                  >
                    <input
                      type="checkbox"
                      className="checkbox-ui"
                      value={JSON.stringify({ key, value })}
                      checked={checked}
                      onChange={handleChange}
                    />
                    <span className="ml-2">{value}</span>
                  </label>
                )
              })

              return (
                <div key={key} className="px-4 py-2">
                  <h3 className="text-sm leading-5 font-medium text-gray-900">
                    {filterable.title}
                  </h3>
                  <div className="mt-2">{options}</div>
                </div>
              )
            })}

            {/* <div className="border-t border-gray-200 py-6 px-4 space-y-6">
              {pages.map(page => (
                <div key={page.name} className="flow-root">
                  <Link
                    to={page.path}
                    className="-m-2 p-2 block font-medium text-gray-900"
                  >
                    {page.name}
                  </Link>
                </div>
              ))}
            </div> */}
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}

export default MobileProductFilter
