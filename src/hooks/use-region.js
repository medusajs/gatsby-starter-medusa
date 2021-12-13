import { useContext } from "react"
import RegionContext from "../context/region-context"

export const useRegion = () => {
  const context = useContext(RegionContext)

  if (!context) {
    throw new Error(
      "useRegion hook was used but a RegionContext.Provider was not found in the parent tree. Make sure useRegion is used in a child of a RegionProvider"
    )
  }

  return {
    region: context.region,
    country: context.country,
    regions: context.regions,
    actions: { updateRegion: context.updateRegion },
  }
}
