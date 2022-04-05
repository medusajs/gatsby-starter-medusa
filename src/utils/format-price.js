/**
 *
 * @param {number} amount the amount to format
 * @param {string} currencyCode the currency code to use for the price
 * @param {nunber} taxRate the tax rate to apply to the price
 * @param {number} quantity is optional and defaults to 1
 * @returns {string} the formatted price
 */
export const formatPrice = (amount, currencyCode, quantity = 1) => {
  return (
    parseFloat(((amount / 100) * quantity * 1).toFixed(2)) +
    " " +
    currencyCode.toUpperCase()
  )
}
