import { Menu } from "@headlessui/react"
import { Link } from "gatsby"
import React from "react"
import { useCart } from "../../hooks/use-cart"
import ShoppingBagIcon from "../../icons/shopping-bag"
import PopoverTransition from "../popover-transition"
import CartPopoverItem from "./cart-popover-item"

const CartPopover = () => {
  const { cart } = useCart()
  
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center justify-center w-full py-2 bg-white text-sm font-medium hover:opacity-1/2">
          <ShoppingBagIcon />
          <span>{cart.items.reduce((sum, i) => sum + i.quantity, 0)}</span>
        </Menu.Button>
      </div>

      <PopoverTransition>
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-96 px-6 py-4 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {cart.items < 1 ? (
              <div className="flex justify-center">
                <p>Your cart is empty</p>
              </div>
            ) : (
              <>
                {cart.items.map((item, i) => {
                  return (
                    <div className="py-2 first:pt-0" key={i}>
                      <Menu.Item>
                        {() => (
                          <CartPopoverItem
                            item={item}
                            currencyCode={cart.region.currency_code}
                          />
                        )}
                      </Menu.Item>
                    </div>
                  )
                })}
                <div className="flex flex-col mt-4">
                  <Menu.Item>
                    <Link to="/checkout">
                      <button className="btn-ui font-medium px-4 py-2 mb-2 text-sm w-full">
                        Checkout
                      </button>
                    </Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link to="/shopping-bag">
                      <button className="text-ui-dark py-2 text-sm w-full">
                        View Shopping Bag
                      </button>
                    </Link>
                  </Menu.Item>
                </div>
              </>
            )}
          </div>
        </Menu.Items>
      </PopoverTransition>
    </Menu>
  )
}

export default CartPopover
