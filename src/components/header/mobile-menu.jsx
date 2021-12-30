import { Dialog, Transition } from "@headlessui/react"
import { Link } from "gatsby"
import React, { Fragment } from "react"
import { useCustomer } from "../../hooks/use-customer"
import { useRegion } from "../../hooks/use-region"
import { useRegionDisabled } from "../../hooks/use-region-disabled"
import { classNames } from "../../utils/class-names"

const MobileMenu = ({ open, setOpen }) => {
  const pages = [
    {
      name: "Create return",
      path: "/create-return",
    },
    {
      name: "FAQ",
      path: "/faq",
    },
    {
      name: "Terms & Conditions",
      path: "/terms-and-conditions",
    },
  ]

  const {
    regions,
    region,
    country,
    actions: { updateRegion },
  } = useRegion()

  const disabled = useRegionDisabled()

  const { customer } = useCustomer()

  const handleRegionChange = e => {
    const { region, country } = JSON.parse(e.target.value)
    updateRegion(region, country)
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

            <div className="border-t border-gray-200 py-6 px-4 space-y-6">
              <div className="flow-root">
                <Link
                  to={"/products"}
                  className="-m-2 p-2 block font-medium text-gray-900"
                  onClick={() => setOpen(false)}
                >
                  Products
                </Link>
              </div>
              <div className="flow-root">
                <Link
                  to={"/collections"}
                  className="-m-2 p-2 block font-medium text-gray-900"
                  onClick={() => setOpen(false)}
                >
                  Collections
                </Link>
              </div>
            </div>

            <div className="border-t border-gray-200 py-6 px-4 space-y-6">
              {pages.map(page => (
                <div key={page.name} className="flow-root">
                  <Link
                    to={page.path}
                    className="-m-2 p-2 block font-medium text-gray-900"
                    onClick={() => setOpen(false)}
                  >
                    {page.name}
                  </Link>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 py-6 px-4 space-y-6">
              {customer ? (
                <Fragment>
                  <div className="flow-root">
                    <Link
                      to="/account"
                      className="-m-2 p-2 block font-medium text-gray-900"
                      onClick={() => setOpen(false)}
                    >
                      Account
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      to="/account/order-history"
                      className="-m-2 p-2 block font-medium text-gray-900"
                      onClick={() => setOpen(false)}
                    >
                      Order History
                    </Link>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <div className="flow-root">
                    <Link
                      to="/sign-in"
                      className="-m-2 p-2 block font-medium text-gray-900"
                      onClick={() => setOpen(false)}
                    >
                      Sign in
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      to="/sign-up"
                      className="-m-2 p-2 block font-medium text-gray-900"
                      onClick={() => setOpen(false)}
                    >
                      Create account
                    </Link>
                  </div>
                </Fragment>
              )}
            </div>

            <div
              className={classNames(
                disabled ? "hidden" : "border-t border-gray-200 py-6 px-4"
              )}
            >
              <select
                className="shadow rounded-md border-none"
                onChange={handleRegionChange}
                defaultValue={JSON.stringify({ region, country })}
              >
                {regions.map((region, index) => {
                  return (
                    <Fragment key={index}>
                      {region.countries.map(country => {
                        return (
                          <option
                            key={country.display_name}
                            value={JSON.stringify({
                              region: region,
                              country: country.display_name,
                            })}
                          >
                            {country.display_name} /{" "}
                            {region.currency_code.toUpperCase()}
                          </option>
                        )
                      })}
                    </Fragment>
                  )
                })}
              </select>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  )
}

export default MobileMenu
