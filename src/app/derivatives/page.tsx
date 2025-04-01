"use client"

import { useState } from "react"
import Header from "@/components/Header"
import TradingViewWidget from "@/components/TradingView"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function DerivativesPage() {
  const [activeSymbol, setActiveSymbol] = useState("BTCUSDT_PERP")
  const [orderType, setOrderType] = useState("limit")
  const [price, setPrice] = useState("30250.50")
  const [amount, setAmount] = useState("")
  const [leverage, setLeverage] = useState(5)
  const [isBuy, setIsBuy] = useState(true)
  const [isHedged, setIsHedged] = useState(false)
  const [takeProfitPrice, setTakeProfitPrice] = useState("")
  const [stopLossPrice, setStopLossPrice] = useState("")
  const [advancedOptions, setAdvancedOptions] = useState(false)

  // Available futures contracts
  const contracts = [
    { symbol: "BTCUSDT_PERP", name: "Bitcoin USDT Perpetual", price: 30250.50, change24h: 2.56 },
    { symbol: "ETHUSDT_PERP", name: "Ethereum USDT Perpetual", price: 2047.45, change24h: -1.10 },
    { symbol: "SOLUSDT_PERP", name: "Solana USDT Perpetual", price: 106.80, change24h: -2.30 },
    { symbol: "ADAUSDT_PERP", name: "Cardano USDT Perpetual", price: 0.452, change24h: 3.25 },
  ]

  // Mock open positions
  const positions = [
    {
      symbol: "BTCUSDT_PERP",
      side: "long",
      size: 0.05,
      entryPrice: 29850.75,
      markPrice: 30250.50,
      liquidationPrice: 27500.20,
      margin: 149.25,
      pnl: 19.99,
      roe: 13.39,
      leverage: 10
    },
    {
      symbol: "ETHUSDT_PERP",
      side: "short",
      size: 1.2,
      entryPrice: 2080.50,
      markPrice: 2047.45,
      liquidationPrice: 2210.75,
      margin: 208.05,
      pnl: 39.66,
      roe: 19.06,
      leverage: 10
    }
  ]

  // Mock recent trades data
  const recentTrades = [
    { id: 1, symbol: "BTCUSDT_PERP", side: "buy", price: 30245.50, amount: 0.05, value: 1512.28, time: "1m ago" },
    { id: 2, symbol: "BTCUSDT_PERP", side: "sell", price: 30240.25, amount: 0.03, value: 907.21, time: "2m ago" },
    { id: 3, symbol: "ETHUSDT_PERP", side: "buy", price: 2045.75, amount: 0.5, value: 1022.88, time: "5m ago" },
    { id: 4, symbol: "BTCUSDT_PERP", side: "sell", price: 30235.50, amount: 0.10, value: 3023.55, time: "8m ago" },
    { id: 5, symbol: "ETHUSDT_PERP", side: "sell", price: 2047.25, amount: 1.2, value: 2456.70, time: "10m ago" },
  ]

  // Contract details for the currently selected symbol
  const selectedContract = contracts.find(c => c.symbol === activeSymbol)

  // Calculate estimated liquidation price
  const calculateLiquidationPrice = () => {
    // This is a simplified calculation for demonstration purposes only
    if (!amount || !price) return "N/A"

    const entryPrice = Number.parseFloat(price)
    const size = Number.parseFloat(amount)

    if (isBuy) {
      // Long position
      return (entryPrice * (1 - (0.85 / leverage))).toFixed(2)
    } else {
      // Short position
      return (entryPrice * (1 + (0.85 / leverage))).toFixed(2)
    }
  }

  // Handle order submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount) {
      toast.error("Please enter a valid quantity")
      return
    }

    if (orderType !== "market" && !price) {
      toast.error("Please enter a valid price")
      return
    }

    const orderDetails = {
      symbol: activeSymbol,
      type: orderType,
      side: isBuy ? "buy" : "sell",
      price: orderType === "market" ? "Market" : price,
      amount,
      leverage,
      ...(takeProfitPrice && { takeProfit: takeProfitPrice }),
      ...(stopLossPrice && { stopLoss: stopLossPrice }),
    }

    // In a real app, this would call an API to place the order
    toast.success(`${isBuy ? 'Buy' : 'Sell'} order placed successfully`)
    console.log(orderDetails)

    // Reset some form fields
    setAmount("")
    setTakeProfitPrice("")
    setStopLossPrice("")
  }

  return (
    <ProtectedRoute>
      <main className="flex min-h-screen flex-col">
        <Header />

        <div className="flex-1 container py-4 grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Contract Selector */}
          <div className="lg:col-span-12 flex items-center mb-2 bg-card p-2 rounded-lg overflow-x-auto">
            <div className="flex space-x-2">
              {contracts.map((contract) => (
                <Button
                  key={contract.symbol}
                  variant={activeSymbol === contract.symbol ? "secondary" : "outline"}
                  onClick={() => setActiveSymbol(contract.symbol)}
                  className="whitespace-nowrap"
                >
                  <div className="flex flex-col items-start">
                    <span>{contract.symbol.replace("_PERP", "")}</span>
                    <span className={`text-xs ${contract.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                      {contract.change24h >= 0 ? "+" : ""}{contract.change24h}%
                    </span>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Trading Chart */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <div className="h-[450px] rounded-lg border overflow-hidden">
              <div className="flex items-center justify-between p-2 border-b">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold">{activeSymbol}</h2>
                  <Badge variant="outline" className={selectedContract?.change24h && selectedContract.change24h >= 0 ? "text-green-500" : "text-red-500"}>
                    {selectedContract?.change24h && selectedContract.change24h >= 0 ? "+" : ""}
                    {selectedContract?.change24h}%
                  </Badge>
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

            {/* Positions and Orders */}
            <div className="mt-4">
              <Tabs defaultValue="positions">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="positions">Positions</TabsTrigger>
                  <TabsTrigger value="openOrders">Open Orders</TabsTrigger>
                  <TabsTrigger value="orderHistory">Order History</TabsTrigger>
                </TabsList>
                <TabsContent value="positions">
                  <Card className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Symbol</TableHead>
                          <TableHead>Side</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead className="hidden md:table-cell">Entry Price</TableHead>
                          <TableHead className="hidden md:table-cell">Mark Price</TableHead>
                          <TableHead className="hidden md:table-cell">Liq. Price</TableHead>
                          <TableHead>PnL (ROE%)</TableHead>
                          <TableHead className="text-right">Close</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {positions.length > 0 ? (
                          positions.map((position) => (
                            <TableRow key={`${position.symbol}-${position.side}`}>
                              <TableCell>{position.symbol.replace("_PERP", "")}</TableCell>
                              <TableCell>
                                <Badge variant={position.side === "long" ? "default" : "destructive"} className="capitalize">
                                  {position.side}
                                </Badge>
                              </TableCell>
                              <TableCell>{position.size} ({position.leverage}x)</TableCell>
                              <TableCell className="hidden md:table-cell">${position.entryPrice}</TableCell>
                              <TableCell className="hidden md:table-cell">${position.markPrice}</TableCell>
                              <TableCell className="hidden md:table-cell">${position.liquidationPrice}</TableCell>
                              <TableCell>
                                <span className={position.pnl >= 0 ? "text-green-500" : "text-red-500"}>
                                  ${position.pnl.toFixed(2)} ({position.roe.toFixed(2)}%)
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button size="sm" variant="outline">Close</Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                              No open positions
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </Card>
                </TabsContent>
                <TabsContent value="openOrders">
                  <Card className="p-0">
                    <div className="text-center text-muted-foreground p-8">
                      You have no open orders
                    </div>
                  </Card>
                </TabsContent>
                <TabsContent value="orderHistory">
                  <Card className="p-0">
                    <div className="text-center text-muted-foreground p-8">
                      No order history found
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Order Form and Recent Trades */}
          <div className="lg:col-span-4 space-y-4 order-1 lg:order-2">
            <Card className="overflow-hidden">
              <Tabs defaultValue="trade">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="trade">Trade</TabsTrigger>
                  <TabsTrigger value="recentTrades">Recent Trades</TabsTrigger>
                </TabsList>
                <TabsContent value="trade">
                  <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {/* Contract Info */}
                    <div className="flex justify-between text-sm">
                      <div>Mark Price: <span className="font-medium">${selectedContract?.price}</span></div>
                      <div>24h Change: <span className={`font-medium ${selectedContract?.change24h && selectedContract.change24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {selectedContract?.change24h && selectedContract.change24h >= 0 ? "+" : ""}
                        {selectedContract?.change24h}%
                      </span></div>
                    </div>

                    {/* Buy/Sell Toggle */}
                    <Tabs value={isBuy ? "buy" : "sell"} onValueChange={(val) => setIsBuy(val === "buy")}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="buy" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Buy/Long</TabsTrigger>
                        <TabsTrigger value="sell" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">Sell/Short</TabsTrigger>
                      </TabsList>
                    </Tabs>

                    {/* Order Type */}
                    <div className="grid grid-cols-3 gap-2">
                      <Button
                        type="button"
                        variant={orderType === "limit" ? "secondary" : "outline"}
                        onClick={() => setOrderType("limit")}
                        className="text-xs"
                      >
                        Limit
                      </Button>
                      <Button
                        type="button"
                        variant={orderType === "market" ? "secondary" : "outline"}
                        onClick={() => setOrderType("market")}
                        className="text-xs"
                      >
                        Market
                      </Button>
                      <Button
                        type="button"
                        variant={orderType === "stop" ? "secondary" : "outline"}
                        onClick={() => setOrderType("stop")}
                        className="text-xs"
                      >
                        Stop
                      </Button>
                    </div>

                    {/* Order Form */}
                    <div className="space-y-3">
                      {orderType !== "market" && (
                        <div>
                          <Label htmlFor="price">Price (USDT)</Label>
                          <Input
                            id="price"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                      )}

                      <div>
                        <Label htmlFor="amount">Quantity</Label>
                        <Input
                          id="amount"
                          type="number"
                          step="0.001"
                          min="0"
                          placeholder="0.00"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="leverage">Leverage: {leverage}x</Label>
                        <div className="grid grid-cols-5 gap-2">
                          {[1, 5, 10, 50, 100].map((lev) => (
                            <Button
                              key={lev}
                              type="button"
                              variant={leverage === lev ? "secondary" : "outline"}
                              onClick={() => setLeverage(lev)}
                              className="text-xs"
                            >
                              {lev}x
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t space-y-3">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="advanced"
                            checked={advancedOptions}
                            onCheckedChange={setAdvancedOptions}
                          />
                          <Label htmlFor="advanced">Advanced options</Label>
                        </div>

                        {advancedOptions && (
                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="takeProfit">Take Profit Price</Label>
                              <Input
                                id="takeProfit"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder={isBuy ? "Higher than entry" : "Lower than entry"}
                                value={takeProfitPrice}
                                onChange={(e) => setTakeProfitPrice(e.target.value)}
                              />
                            </div>

                            <div>
                              <Label htmlFor="stopLoss">Stop Loss Price</Label>
                              <Input
                                id="stopLoss"
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder={isBuy ? "Lower than entry" : "Higher than entry"}
                                value={stopLossPrice}
                                onChange={(e) => setStopLossPrice(e.target.value)}
                              />
                            </div>

                            <div className="flex items-center space-x-2">
                              <Switch
                                id="hedged"
                                checked={isHedged}
                                onCheckedChange={setIsHedged}
                              />
                              <Label htmlFor="hedged">Hedged Mode</Label>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Order Summary */}
                      <div className="bg-muted p-3 rounded text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Est. Liquidation Price:</span>
                          <span>{calculateLiquidationPrice()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cost:</span>
                          <span>
                            {price && amount
                              ? `$${((Number.parseFloat(price) * Number.parseFloat(amount)) / leverage).toFixed(2)}`
                              : "$0.00"}
                          </span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span>Max Position:</span>
                          <span>10 BTC</span>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className={`w-full ${isBuy ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
                      >
                        {isBuy ? "Buy / Long" : "Sell / Short"}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                <TabsContent value="recentTrades">
                  <div className="max-h-[600px] overflow-y-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Price</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead className="text-right">Time</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentTrades.filter(trade => trade.symbol === activeSymbol).map((trade) => (
                          <TableRow key={trade.id}>
                            <TableCell className={trade.side === "buy" ? "text-green-500" : "text-red-500"}>
                              ${trade.price}
                            </TableCell>
                            <TableCell>{trade.amount}</TableCell>
                            <TableCell className="text-right text-muted-foreground">{trade.time}</TableCell>
                          </TableRow>
                        ))}
                        {recentTrades.filter(trade => trade.symbol === activeSymbol).length === 0 && (
                          <TableRow>
                            <TableCell colSpan={3} className="text-center py-4 text-muted-foreground">
                              No recent trades
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Market Information */}
            <Card className="p-4">
              <h3 className="font-medium text-lg mb-2">Market Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contract Type:</span>
                  <span>Perpetual</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Settlement:</span>
                  <span>USDT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Funding Rate:</span>
                  <span className="text-green-500">+0.01%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Funding:</span>
                  <span>2h 15m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">24h Volume:</span>
                  <span>$1.25B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Open Interest:</span>
                  <span>$850.5M</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  )
}
