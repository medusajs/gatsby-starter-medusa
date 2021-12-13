export function pickDetails(product) {
  const { weight, height, material } = product

  if (!weight && !height && !material) {
    return {}
  }

  const details = {}

  if (weight) {
    // weight is in grams so to get the weight in kilos we need to divide by 1000.
    details.Weight = `${weight / 1000} kg`
  }

  if (height) {
    details.Height = height
  }

  if (material) {
    details.Material = material
  }

  return details
}
