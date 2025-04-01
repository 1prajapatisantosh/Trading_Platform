"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

interface CryptoData {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
}

export default function MarketData() {
  const [marketData, setMarketData] = useState<CryptoData[]>([])

  useEffect(() => {
    // In a real app, this would fetch from a cryptocurrency API
    // For now, we'll use mock data
    const mockData: CryptoData[] = [
      {
        id: "bitcoin",
        symbol: "BTC",
        name: "Bitcoin",
        price: 30245.67,
        change24h: 2.45,
        volume24h: 23456789012,
        marketCap: 567890123456,
      },
      {
        id: "ethereum",
        symbol: "ETH",
        name: "Ethereum",
        price: 2045.32,
        change24h: -1.23,
        volume24h: 12345678901,
        marketCap: 234567890123,
      },
      {
        id: "ripple",
        symbol: "XRP",
        name: "XRP",
        price: 0.5678,
        change24h: 5.67,
        volume24h: 2345678901,
        marketCap: 23456789012,
      },
      {
        id: "cardano",
        symbol: "ADA",
        name: "Cardano",
        price: 0.4523,
        change24h: 3.21,
        volume24h: 1234567890,
        marketCap: 12345678901,
      },
      {
        id: "solana",
        symbol: "SOL",
        name: "Solana",
        price: 105.78,
        change24h: -2.34,
        volume24h: 3456789012,
        marketCap: 34567890123,
      },
      {
        id: "polkadot",
        symbol: "DOT",
        name: "Polkadot",
        price: 6.789,
        change24h: 1.23,
        volume24h: 567890123,
        marketCap: 5678901234,
      },
    ]

    setMarketData(mockData)
  }, [])

  return (
    <div className="flex space-x-4 overflow-x-auto py-2 w-full">
      {marketData.map((crypto) => (
        <div
          key={crypto.id}
          className="flex-shrink-0 border rounded-md p-3 min-w-[180px] bg-card hover:border-primary/50 transition-colors cursor-pointer"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="font-bold">{crypto.symbol}</span>
              <span className="text-muted-foreground ml-2 text-xs">
                {crypto.name}
              </span>
            </div>
            <Badge
              variant="outline"
              className={
                crypto.change24h >= 0 ? "text-green-500" : "text-red-500"
              }
            >
              {crypto.change24h >= 0 ? "+" : ""}
              {crypto.change24h.toFixed(2)}%
            </Badge>
          </div>
          <div className="text-lg font-bold">${crypto.price.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}</div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Vol: ${formatLargeNumber(crypto.volume24h)}</span>
            <span>Cap: ${formatLargeNumber(crypto.marketCap)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function formatLargeNumber(num: number): string {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T'
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B'
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M'
  if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K'
  return num.toString()
}
