import React, { useEffect, useState } from "react"
import SearchEngineOptimization from "../components/seo"
import { useOrder } from "../hooks/use-order"

const Swap = ({ location }) => {
  const [swap, setSwap] = useState(undefined)
  const [items, setItems] = useState([])
  const [currencyCode, setCurrencyCode] = useState("eur")
  const [refundAmount, setRefundAmount] = useState(0)
  const [loading, setLoading] = useState(true)

  const {
    actions: { retrieve },
  } = useOrder()

  useEffect(() => {
    const getReturn = async () => {
      const state = location.state
      const stateSwap = state?.swap

      if (stateSwap) {
        setSwap(stateSwap)

        console.log(stateSwap)
      }
      setLoading(false)
    }

    getReturn()
  }, [location.state])

  return !loading && swap ? (
    <div className="layout-base flex justify-center pb-16">
      <SearchEngineOptimization title="Exchange" />
      <div className="max-w-xl">
        <span className="text-xs font-medium mb-2">THANK YOU</span>
        <h1>Return Confirmed</h1>
        <p className="text-md font-light mt-3">
          Your return was successful. If you purchased return shipping you will
          receive an email with further instruction shortly.
        </p>
        {/* <div className="my-8">
          {items.map((item, index) => {
            return <ReturnCompletedItem key={index} item={item} />
          })}
        </div> */}
      </div>
    </div>
  ) : (
    <div>
      <p>loading...</p>
    </div>
  )
}

export default Swap
