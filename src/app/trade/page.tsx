"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import TradingViewWidget from "@/components/TradingView"
import OrderBook from "@/components/OrderBook"
import TradeForm from "@/components/TradeForm"
import MarketData from "@/components/MarketData"
import Header from "@/components/Header"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function TradePage() {
  const [activeSymbol, setActiveSymbol] = useState("BTCUSDT")
  const [orderType, setOrderType] = useState("limit")

  return (
    <ProtectedRoute>
      <main className="flex min-h-screen flex-col">
        <Header />

        <div className="flex-1 container py-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Market Data */}
          <div className="lg:col-span-12 flex items-center mb-2 overflow-x-auto">
            <MarketData />
          </div>

          {/* Trading Chart */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <div className="h-[500px] rounded-lg border overflow-hidden">
              <div className="flex items-center justify-between p-2 border-b">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold">{activeSymbol}</h2>
                  <Badge variant="outline" className="text-green-500">+2.45%</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">1h</Button>
                  <Button variant="outline" size="sm">4h</Button>
                  <Button variant="secondary" size="sm">1d</Button>
                  <Button variant="outline" size="sm">1w</Button>
                </div>
              </div>
              <TradingViewWidget symbol={activeSymbol} />
            </div>

            {/* Order History */}
            <Card className="mt-4">
              <Tabs defaultValue="openOrders">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="openOrders">Open Orders</TabsTrigger>
                  <TabsTrigger value="orderHistory">Order History</TabsTrigger>
                  <TabsTrigger value="tradeHistory">Trade History</TabsTrigger>
                </TabsList>
                <TabsContent value="openOrders" className="p-4">
                  <div className="text-center text-muted-foreground p-8">
                    You have no open orders
                  </div>
                </TabsContent>
                <TabsContent value="orderHistory" className="p-4">
                  <div className="text-center text-muted-foreground p-8">
                    No order history found
                  </div>
                </TabsContent>
                <TabsContent value="tradeHistory" className="p-4">
                  <div className="text-center text-muted-foreground p-8">
                    No trade history found
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Order Book and Trade Form */}
          <div className="lg:col-span-4 space-y-4 order-1 lg:order-2">
            <Card>
              <Tabs defaultValue="orderBook">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="orderBook">Order Book</TabsTrigger>
                  <TabsTrigger value="recentTrades">Recent Trades</TabsTrigger>
                </TabsList>
                <TabsContent value="orderBook" className="p-0">
                  <OrderBook symbol={activeSymbol} />
                </TabsContent>
                <TabsContent value="recentTrades" className="p-0">
                  <div className="p-2 text-xs grid grid-cols-3 font-medium text-muted-foreground">
                    <div>Price</div>
                    <div>Amount</div>
                    <div>Time</div>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto space-y-1 p-2">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="grid grid-cols-3 text-xs">
                        <div className={i % 2 === 0 ? "text-green-500" : "text-red-500"}>
                          ${(30000 + Math.random() * 300).toFixed(2)}
                        </div>
                        <div>{(0.01 + Math.random() * 0.5).toFixed(4)}</div>
                        <div className="text-muted-foreground">1m ago</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            <Card>
              <Tabs defaultValue="spot">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="spot">Spot</TabsTrigger>
                  <TabsTrigger value="margin">Margin</TabsTrigger>
                  <TabsTrigger value="futures">Futures</TabsTrigger>
                </TabsList>
                <TabsContent value="spot">
                  <TradeForm
                    symbol={activeSymbol}
                    orderType={orderType}
                    setOrderType={setOrderType}
                  />
                </TabsContent>
                <TabsContent value="margin">
                  <div className="text-center text-muted-foreground p-8">
                    Margin trading coming soon
                  </div>
                </TabsContent>
                <TabsContent value="futures">
                  <div className="text-center text-muted-foreground p-8">
                    Futures trading coming soon
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  )
}
