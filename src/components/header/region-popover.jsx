import { Menu } from "@headlessui/react"
import React from "react"
import { useRegion } from "../../hooks/use-region"
import { useRegionDisabled } from "../../hooks/use-region-disabled"
import { classNames } from "../../utils/class-names"
import PopoverTransition from "../popover-transition"

const RegionPopover = () => {
  const {
    region,
    country,
    regions,
    actions: { updateRegion },
  } = useRegion()

  const disabled = useRegionDisabled()

  const handleSelect = async (region, country) => {
    updateRegion(region, country.display_name)
  }

  return (
    <Menu
      as="div"
      className={classNames(
        disabled ? "hidden" : "inline-block",
        "relative text-left"
      )}
    >
      <div>
        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:text-gray-600">
          {country} / {region?.currency_code?.toUpperCase()}
        </Menu.Button>
      </div>

      <PopoverTransition>
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 px-6 py-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {regions?.map(region => {
            return region.countries.map((country, i) => {
              return (
                <div className="border-b border-ui last:border-b-0" key={i}>
                  <Menu.Item>
                    {() => (
                      <button
                        onClick={() => handleSelect(region, country)}
                        className={classNames(
                          country === country.display_name
                            ? "text-black"
                            : "text-ui-dark",
                          "block py-3 text-sm w-full text-left hover:text-black"
                        )}
                      >
                        {country.display_name} /{" "}
                        {region.currency_code.toUpperCase()}
                      </button>
                    )}
                  </Menu.Item>
                </div>
              )
            })
          })}
        </Menu.Items>
      </PopoverTransition>
    </Menu>
  )
}

export default RegionPopover
