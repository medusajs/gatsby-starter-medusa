import React, { useEffect, useState } from "react"
import ReturnCompletedItem from "../components/returns/return-completed.item"
import SearchEngineOptimization from "../components/utility/seo"
import { useRetrieveOrder } from "../hooks/use-order"
import { formatPrice } from "../utils/format-price"

const ReturnConfirmed = ({ location }) => {
  const [confirmedReturn, setConfirmedReturn] = useState(undefined)
  const [items, setItems] = useState([])
  const [currencyCode, setCurrencyCode] = useState("eur")
  const [refundAmount, setRefundAmount] = useState(0)
  const [loading, setLoading] = useState(true)

  const retrieve = useRetrieveOrder(location.state?.confirmedReturn?.order_id)

  useEffect(() => {
    const getReturn = async () => {
      const state = location.state
      const stateReturn = state?.confirmedReturn

      if (stateReturn) {
        setConfirmedReturn(stateReturn)

        setRefundAmount(stateReturn.refund_amount)

        const order = await retrieve()

        if (order) {
          setCurrencyCode(order.currency_code)

          const itemIds = stateReturn.items.map(({ item_id }) => item_id)

          const returnedItems = []

          order.items.forEach(item => {
            if (itemIds.includes(item.id)) {
              const quantity = stateReturn.items.find(
                ({ item_id }) => item_id === item.id
              ).quantity
              returnedItems.push({ ...item, quantity })
            }
          })

          setItems(returnedItems)
        }
      }
      setLoading(false)
    }

    getReturn()
  }, [location.state, retrieve])

  return !loading && confirmedReturn ? (
    <div className="layout-base flex justify-center pb-16">
      <SearchEngineOptimization title="Return Confirmed" />
      <div className="max-w-xl">
        <span className="text-xs font-medium mb-2">THANK YOU</span>
        <h1>Return Confirmed</h1>
        <p className="text-md font-light mt-3">
          Your return was successful. If you purchased return shipping you will
          receive an email with further instruction shortly. Once the return is
          processed, your refund of{" "}
          <span className="font-semibold">
            {formatPrice(refundAmount, currencyCode)}
          </span>{" "}
          will be released to your account.
        </p>
        <div className="my-8">
          {items.map((item, index) => {
            return <ReturnCompletedItem key={index} item={item} />
          })}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <p>loading...</p>
    </div>
  )
}

export default ReturnConfirmed
