import React from "react"
import Package from "../../icons/package.svg"
import User from "../../icons/user.svg"
import AccountNavLink from "./account-nav-link"

const AccountNav = () => {
  return (
    <div className="flex items-start lg:items-center lg:flex-col text-sm mt-8 lg:mt-0 lg:sticky lg:top-28">
      <AccountNavLink svg={User} label="Account" to="/account" />
      <div className="mx-1 lg:mx-0" />
      <AccountNavLink
        svg={Package}
        label="Order History"
        to="/account/order-history"
      />
    </div>
  )
}

export default AccountNav
