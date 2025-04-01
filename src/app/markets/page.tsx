"use client"

import { useState } from "react"
import Header from "@/components/Header"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Search } from "lucide-react"
import ProtectedRoute from "@/components/ProtectedRoute"

interface Market {
  symbol: string
  name: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  category: "spot" | "futures" | "margin"
}

export default function MarketsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("spot")

  // Mock market data
  const markets: Market[] = [
    {
      symbol: "BTCUSDT",
      name: "Bitcoin",
      price: 30245.67,
      change24h: 2.45,
      volume24h: 23456789012,
      marketCap: 567890123456,
      category: "spot",
    },
    {
      symbol: "ETHUSDT",
      name: "Ethereum",
      price: 2045.32,
      change24h: -1.23,
      volume24h: 12345678901,
      marketCap: 234567890123,
      category: "spot",
    },
    {
      symbol: "XRPUSDT",
      name: "XRP",
      price: 0.5678,
      change24h: 5.67,
      volume24h: 2345678901,
      marketCap: 23456789012,
      category: "spot",
    },
    {
      symbol: "ADAUSDT",
      name: "Cardano",
      price: 0.4523,
      change24h: 3.21,
      volume24h: 1234567890,
      marketCap: 12345678901,
      category: "spot",
    },
    {
      symbol: "SOLUSDT",
      name: "Solana",
      price: 105.78,
      change24h: -2.34,
      volume24h: 3456789012,
      marketCap: 34567890123,
      category: "spot",
    },
    {
      symbol: "DOTUSDT",
      name: "Polkadot",
      price: 6.789,
      change24h: 1.23,
      volume24h: 567890123,
      marketCap: 5678901234,
      category: "spot",
    },
    {
      symbol: "BTCUSDT_PERP",
      name: "Bitcoin",
      price: 30250.88,
      change24h: 2.56,
      volume24h: 34567890123,
      marketCap: 0,
      category: "futures",
    },
    {
      symbol: "ETHUSDT_PERP",
      name: "Ethereum",
      price: 2047.45,
      change24h: -1.10,
      volume24h: 23456789012,
      marketCap: 0,
      category: "futures",
    },
    {
      symbol: "BTCUSDT_M",
      name: "Bitcoin",
      price: 30245.67,
      change24h: 2.45,
      volume24h: 12345678901,
      marketCap: 0,
      category: "margin",
    },
    {
      symbol: "ETHUSDT_M",
      name: "Ethereum",
      price: 2045.32,
      change24h: -1.23,
      volume24h: 6789012345,
      marketCap: 0,
      category: "margin",
    },
  ]

  const filteredMarkets = markets.filter(
    (market) =>
      market.category === activeCategory &&
      (market.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        market.name.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  function formatLargeNumber(num: number): string {
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`
    return num.toString()
  }

  return (
    <ProtectedRoute>
      <main className="flex min-h-screen flex-col">
        <Header />

        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-6">Markets</h1>

          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search markets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Tabs
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-full md:w-auto"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="spot">Spot</TabsTrigger>
                <TabsTrigger value="futures">Futures</TabsTrigger>
                <TabsTrigger value="margin">Margin</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Pair</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>24h Change</TableHead>
                  <TableHead className="hidden md:table-cell">24h Volume</TableHead>
                  <TableHead className="hidden md:table-cell">Market Cap</TableHead>
                  <TableHead className="text-right">Trade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMarkets.length > 0 ? (
                  filteredMarkets.map((market) => (
                    <TableRow key={market.symbol}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span>{market.symbol}</span>
                          <span className="text-xs text-muted-foreground">
                            {market.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        ${market.price.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            market.change24h >= 0 ? "text-green-500" : "text-red-500"
                          }
                        >
                          {market.change24h >= 0 ? "+" : ""}
                          {market.change24h.toFixed(2)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        ${formatLargeNumber(market.volume24h)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {market.marketCap > 0
                          ? `$${formatLargeNumber(market.marketCap)}`
                          : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild size="sm">
                          <Link href={`/trade?symbol=${market.symbol}`}>Trade</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24">
                      No markets found matching your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  )
}
