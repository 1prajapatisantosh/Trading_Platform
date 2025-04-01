"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

interface TradeFormProps {
  symbol: string
  orderType: string
  setOrderType: (type: string) => void
}

export default function TradeForm({
  symbol,
  orderType,
  setOrderType,
}: TradeFormProps) {
  const [price, setPrice] = useState("")
  const [amount, setAmount] = useState("")
  const [total, setTotal] = useState("0.00")
  const [sliderValue, setSliderValue] = useState(0)
  const [isBuy, setIsBuy] = useState(true)
  const [advancedOptions, setAdvancedOptions] = useState(false)

  // Extract currency names from symbol
  const baseCurrency = symbol.slice(0, -4) // e.g., BTC
  const quoteCurrency = symbol.slice(-4) // e.g., USDT

  // Mock current market price
  const marketPrice = symbol.includes("BTC") ? 30000 : symbol.includes("ETH") ? 2000 : 1

  useEffect(() => {
    // Set default price when symbol changes
    setPrice(marketPrice.toFixed(2))
  }, [symbol, marketPrice])

  // Calculate total when price or amount changes
  useEffect(() => {
    if (price && amount) {
      setTotal((Number.parseFloat(price) * Number.parseFloat(amount)).toFixed(2))
    } else {
      setTotal("0.00")
    }
  }, [price, amount])

  // Handle amount slider change
  const handleSliderChange = (value: number[]) => {
    const sliderVal = value[0]
    setSliderValue(sliderVal)

    // Calculate amount based on slider percentage (mock wallet balance)
    const maxAmount = isBuy
      ? Number.parseFloat((1000 / Number.parseFloat(price || "1")).toFixed(6))
      : 1

    const newAmount = ((sliderVal / 100) * maxAmount).toFixed(6)
    setAmount(newAmount)
  }

  // Handle trade submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!price || !amount) {
      toast.error("Please enter valid price and amount")
      return
    }

    // In a real app, this would call the API to place the order
    toast.success(`${isBuy ? 'Buy' : 'Sell'} order placed: ${amount} ${baseCurrency} at ${price} ${quoteCurrency}`)

    // Reset form
    setAmount("")
    setSliderValue(0)
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <Tabs value={isBuy ? "buy" : "sell"} onValueChange={(val) => setIsBuy(val === "buy")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="buy" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">Buy</TabsTrigger>
          <TabsTrigger value="sell" className="data-[state=active]:bg-red-500 data-[state=active]:text-white">Sell</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-3">
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
            Stop-Limit
          </Button>
        </div>

        {orderType !== "market" && (
          <div>
            <Label htmlFor="price">Price ({quoteCurrency})</Label>
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
          <Label htmlFor="amount">Amount ({baseCurrency})</Label>
          <Input
            id="amount"
            type="number"
            step="0.000001"
            min="0"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="py-2">
          <Slider
            value={[sliderValue]}
            min={0}
            max={100}
            step={1}
            className="my-4"
            onValueChange={handleSliderChange}
          />
          <div className="grid grid-cols-5 text-xs text-muted-foreground">
            <span>0%</span>
            <span>25%</span>
            <span className="text-center">50%</span>
            <span className="text-right">75%</span>
            <span className="text-right">100%</span>
          </div>
        </div>

        <div>
          <Label htmlFor="total">Total ({quoteCurrency})</Label>
          <Input
            id="total"
            type="text"
            readOnly
            value={total}
          />
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Switch
            id="advanced"
            checked={advancedOptions}
            onCheckedChange={setAdvancedOptions}
          />
          <Label htmlFor="advanced">Advanced options</Label>
        </div>

        {advancedOptions && (
          <div className="space-y-3 pt-2 border-t">
            {orderType === "stop" && (
              <div>
                <Label htmlFor="stop">Stop Price ({quoteCurrency})</Label>
                <Input
                  id="stop"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                />
              </div>
            )}

            <div>
              <Label htmlFor="tif">Time in force</Label>
              <select
                id="tif"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="GTC">Good Till Cancel</option>
                <option value="IOC">Immediate or Cancel</option>
                <option value="FOK">Fill or Kill</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <Button
        type="submit"
        className={`w-full ${isBuy ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}`}
      >
        {isBuy ? `Buy ${baseCurrency}` : `Sell ${baseCurrency}`}
      </Button>

      <div className="text-xs text-muted-foreground flex justify-between pt-2">
        <span>Available:</span>
        <span>
          {isBuy
            ? `1,000.00 ${quoteCurrency}`
            : `1.00000000 ${baseCurrency}`}
        </span>
      </div>
    </form>
  )
}
