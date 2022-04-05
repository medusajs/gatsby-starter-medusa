import { useMemo } from "react"

export const useDiscount = discounts => {
  const appliedDiscount = useMemo(() => {
    if (!discounts || !discounts.length) {
      return null
    }

    const discount = discounts[0]

    const type = discount.rule.type
    const value = discount.rule.value
    const code = discount.code

    return {
      type,
      value,
      code,
    }
  }, [discounts])

  return appliedDiscount
}
