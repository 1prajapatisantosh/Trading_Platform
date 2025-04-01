"use client"

import { useState, useEffect } from "react"

interface OrderBookProps {
  symbol: string
}

interface OrderItem {
  price: number
  amount: number
  total: number
  type: "ask" | "bid"
}

export default function OrderBook({ symbol }: OrderBookProps) {
  const [orderBook, setOrderBook] = useState<{
    asks: OrderItem[]
    bids: OrderItem[]
  }>({
    asks: [],
    bids: []
  })

  useEffect(() => {
    // Generate fake order book data based on the symbol
    const basePrice = symbol.includes("BTC") ? 30000 : symbol.includes("ETH") ? 2000 : 1
    const asks: OrderItem[] = []
    const bids: OrderItem[] = []

    // Generate 15 ask orders (sell orders higher than market price)
    let askPrice = basePrice * 1.001
    let askTotal = 0
    for (let i = 0; i < 15; i++) {
      const amount = Number((Math.random() * 2).toFixed(3))
      askTotal += amount
      asks.push({
        price: Number(askPrice.toFixed(2)),
        amount,
        total: Number(askTotal.toFixed(3)),
        type: "ask"
      })
      // Increase price by a small random percentage
      askPrice += askPrice * (0.0001 + Math.random() * 0.0005)
    }

    // Generate 15 bid orders (buy orders lower than market price)
    let bidPrice = basePrice * 0.999
    let bidTotal = 0
    for (let i = 0; i < 15; i++) {
      const amount = Number((Math.random() * 2).toFixed(3))
      bidTotal += amount
      bids.push({
        price: Number(bidPrice.toFixed(2)),
        amount,
        total: Number(bidTotal.toFixed(3)),
        type: "bid"
      })
      // Decrease price by a small random percentage
      bidPrice -= bidPrice * (0.0001 + Math.random() * 0.0005)
    }

    // Sort asks in descending order (highest ask first)
    asks.sort((a, b) => b.price - a.price)
    // Sort bids in descending order (highest bid first)
    bids.sort((a, b) => b.price - a.price)

    setOrderBook({ asks, bids })
  }, [symbol])

  // Find the highest total value to calculate percentage widths
  const maxTotal = Math.max(
    ...[...orderBook.asks, ...orderBook.bids].map(order => order.total)
  )

  return (
    <div className="text-xs">
      <div className="p-2 grid grid-cols-3 font-medium text-muted-foreground">
        <div>Price ({symbol.slice(-4)})</div>
        <div>Amount ({symbol.slice(0, -4)})</div>
        <div>Total</div>
      </div>

      {/* Ask orders (sell orders) */}
      <div className="max-h-[200px] overflow-y-auto">
        {orderBook.asks.map((ask, i) => (
          <div
            key={`ask-${ask.price}-${i}`}
            className="grid grid-cols-3 relative p-1"
          >
            <div className="text-red-500 z-10">{ask.price.toLocaleString()}</div>
            <div className="z-10">{ask.amount}</div>
            <div className="z-10">{ask.total}</div>
            <div
              className="absolute right-0 top-0 bottom-0 bg-red-500/10"
              style={{ width: `${(ask.total / maxTotal) * 100}%` }}
            ></div>
          </div>
        ))}
      </div>

      {/* Spread */}
      <div className="py-1 px-2 bg-muted/30 text-center text-muted-foreground flex justify-between">
        <span>Spread:</span>
        <span>
          {orderBook.asks[0] && orderBook.bids[0]
            ? (orderBook.asks[0].price - orderBook.bids[0].price).toFixed(2)
            : "0.00"} ({orderBook.asks[0] && orderBook.bids[0]
              ? ((orderBook.asks[0].price - orderBook.bids[0].price) / orderBook.asks[0].price * 100).toFixed(2)
              : "0.00"}%)
        </span>
      </div>

      {/* Bid orders (buy orders) */}
      <div className="max-h-[200px] overflow-y-auto">
        {orderBook.bids.map((bid, i) => (
          <div
            key={`bid-${bid.price}-${i}`}
            className="grid grid-cols-3 relative p-1"
          >
            <div className="text-green-500 z-10">{bid.price.toLocaleString()}</div>
            <div className="z-10">{bid.amount}</div>
            <div className="z-10">{bid.total}</div>
            <div
              className="absolute right-0 top-0 bottom-0 bg-green-500/10"
              style={{ width: `${(bid.total / maxTotal) * 100}%` }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  )
}
