import { Menu } from "@headlessui/react"
import { Link } from "gatsby"
import React, { Fragment, useMemo } from "react"
import { useCustomer } from "../../hooks/use-customer"
import PopoverTransition from "../popover-transition"

const AccountPopover = () => {
  const { customer } = useCustomer()

  const customerName = useMemo(() => {
    if (customer && customer.first_name && customer.last_name) {
      return `${customer.first_name} ${customer.last_name}`
    }
    return null
  }, [customer])

  const links = [
    {
      label: "Account",
      to: "/account",
    },
    {
      label: "Order history",
      to: "/account/order-history",
    },
  ]

  return (
    <Fragment>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-600">
            {customer ? customerName : "Account"}
          </Menu.Button>
        </div>

        <PopoverTransition>
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 px-6 py-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            {customer ? (
              <Fragment>
                {links.map(({ label, to }, index) => {
                  return (
                    <div
                      className="border-b border-ui last:border-b-0"
                      key={index}
                    >
                      <Menu.Item>
                        {() => (
                          <Link
                            to={to}
                            className={
                              "text-ui-dark block py-3 text-sm w-full text-left hover:text-black"
                            }
                          >
                            {label}
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  )
                })}
              </Fragment>
            ) : (
              <Fragment>
                <div className="border-b border-ui">
                  <Menu.Item>
                    {() => (
                      <Link
                        to={"/sign-in"}
                        className={
                          "text-ui-dark block py-3 text-sm w-full text-left hover:text-black"
                        }
                      >
                        Sign in
                      </Link>
                    )}
                  </Menu.Item>
                </div>
                <div>
                  <Menu.Item>
                    {() => (
                      <Link
                        to={"/sign-up"}
                        className={
                          "text-ui-dark block py-3 text-sm w-full text-left hover:text-black"
                        }
                      >
                        Create account
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Fragment>
            )}
          </Menu.Items>
        </PopoverTransition>
      </Menu>
    </Fragment>
  )
}

export default AccountPopover
