"use client"

import { useState } from "react"
import Header from "@/components/Header"
import ProtectedRoute from "@/components/ProtectedRoute"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Copy, ExternalLink, QrCode, Wallet } from "lucide-react"

interface Asset {
  coin: string
  name: string
  total: number
  available: number
  inOrder: number
  value: number
}

interface Transaction {
  id: string
  type: "deposit" | "withdrawal"
  coin: string
  amount: number
  status: "completed" | "pending" | "failed"
  date: string
  txid: string
}

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedAsset, setSelectedAsset] = useState("")
  const [depositAddress, setDepositAddress] = useState("")
  const [withdrawalAmount, setWithdrawalAmount] = useState("")
  const [withdrawalAddress, setWithdrawalAddress] = useState("")
  const [showQrCode, setShowQrCode] = useState(false)

  // Mock data for assets
  const assets: Asset[] = [
    {
      coin: "BTC",
      name: "Bitcoin",
      total: 0.5432,
      available: 0.5,
      inOrder: 0.0432,
      value: 16423.56,
    },
    {
      coin: "ETH",
      name: "Ethereum",
      total: 4.2345,
      available: 4.0,
      inOrder: 0.2345,
      value: 8654.32,
    },
    {
      coin: "USDT",
      name: "Tether",
      total: 12500.75,
      available: 10000.0,
      inOrder: 2500.75,
      value: 12500.75,
    },
    {
      coin: "XRP",
      name: "Ripple",
      total: 5000.0,
      available: 5000.0,
      inOrder: 0.0,
      value: 2839.5,
    },
    {
      coin: "SOL",
      name: "Solana",
      total: 50.0,
      available: 45.0,
      inOrder: 5.0,
      value: 5289.0,
    },
  ]

  // Mock transaction history
  const transactions: Transaction[] = [
    {
      id: "tx1",
      type: "deposit",
      coin: "BTC",
      amount: 0.25,
      status: "completed",
      date: "2025-03-15T14:32:45",
      txid: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t",
    },
    {
      id: "tx2",
      type: "withdrawal",
      coin: "ETH",
      amount: 2.0,
      status: "completed",
      date: "2025-03-10T09:15:22",
      txid: "0xa1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
    },
    {
      id: "tx3",
      type: "deposit",
      coin: "USDT",
      amount: 5000.0,
      status: "completed",
      date: "2025-03-05T18:45:33",
      txid: "0xz1y2x3w4v5u6t7s8r9q0p1o2n3m4l5k6j7i8h9g0",
    },
    {
      id: "tx4",
      type: "withdrawal",
      coin: "BTC",
      amount: 0.1,
      status: "pending",
      date: "2025-04-01T10:05:12",
      txid: "0x9a8b7c6d5e4f3g2h1i0j9k8l7m6n5o4p3q2r1s0t",
    },
  ]

  // Calculate the total portfolio value
  const totalValue = assets.reduce((total, asset) => total + asset.value, 0)

  const handleDeposit = (asset: string) => {
    setSelectedAsset(asset)
    setDepositAddress(`bc1q${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`)
    setActiveTab("deposit")
  }

  const handleWithdrawal = (asset: string) => {
    setSelectedAsset(asset)
    setWithdrawalAmount("")
    setWithdrawalAddress("")
    setActiveTab("withdraw")
  }

  const handleWithdrawalSubmit = () => {
    if (!withdrawalAmount || !withdrawalAddress) {
      toast.error("Please enter both amount and address")
      return
    }

    const amount = Number.parseFloat(withdrawalAmount)
    const asset = assets.find(a => a.coin === selectedAsset)

    if (!asset) {
      toast.error("Invalid asset selected")
      return
    }

    if (amount <= 0) {
      toast.error("Please enter a valid amount")
      return
    }

    if (amount > asset.available) {
      toast.error(`Insufficient ${selectedAsset} balance`)
      return
    }

    // In a real app, this would call the API to process the withdrawal
    toast.success(`Withdrawal request for ${amount} ${selectedAsset} has been submitted`)
    setWithdrawalAmount("")
    setWithdrawalAddress("")
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Address copied to clipboard")
  }

  return (
    <ProtectedRoute>
      <main className="flex min-h-screen flex-col">
        <Header />

        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-6">Wallet</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="deposit">Deposit</TabsTrigger>
              <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Balance</CardTitle>
                  <CardDescription>Your current portfolio value</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">${totalValue.toLocaleString()}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Assets</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[120px]">Asset</TableHead>
                        <TableHead>Total Balance</TableHead>
                        <TableHead>Available</TableHead>
                        <TableHead className="hidden md:table-cell">In Order</TableHead>
                        <TableHead className="text-right">Value (USD)</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assets.map((asset) => (
                        <TableRow key={asset.coin}>
                          <TableCell>
                            <div className="font-medium">{asset.coin}</div>
                            <div className="text-xs text-muted-foreground">{asset.name}</div>
                          </TableCell>
                          <TableCell>{asset.total}</TableCell>
                          <TableCell>{asset.available}</TableCell>
                          <TableCell className="hidden md:table-cell">{asset.inOrder}</TableCell>
                          <TableCell className="text-right">${asset.value.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="outline" onClick={() => handleDeposit(asset.coin)}>
                                Deposit
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleWithdrawal(asset.coin)}>
                                Withdraw
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Coin</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Date</TableHead>
                        <TableHead className="text-right">Details</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell>
                            <Badge variant={tx.type === "deposit" ? "outline" : "secondary"}>
                              {tx.type === "deposit" ? "Deposit" : "Withdrawal"}
                            </Badge>
                          </TableCell>
                          <TableCell>{tx.coin}</TableCell>
                          <TableCell>{tx.amount}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                tx.status === "completed"
                                  ? "default"
                                  : tx.status === "pending"
                                  ? "outline"
                                  : "destructive"
                              }
                            >
                              {tx.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {new Date(tx.date).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Transaction Details</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="grid grid-cols-4 gap-4">
                                    <div className="col-span-1 font-medium">Type:</div>
                                    <div className="col-span-3 capitalize">{tx.type}</div>

                                    <div className="col-span-1 font-medium">Coin:</div>
                                    <div className="col-span-3">{tx.coin}</div>

                                    <div className="col-span-1 font-medium">Amount:</div>
                                    <div className="col-span-3">{tx.amount}</div>

                                    <div className="col-span-1 font-medium">Status:</div>
                                    <div className="col-span-3 capitalize">{tx.status}</div>

                                    <div className="col-span-1 font-medium">Date:</div>
                                    <div className="col-span-3">{new Date(tx.date).toLocaleString()}</div>

                                    <div className="col-span-1 font-medium">TXID:</div>
                                    <div className="col-span-3 flex items-center gap-2 text-xs md:text-sm truncate">
                                      {tx.txid}
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        className="h-6 w-6 p-0"
                                        onClick={() => copyToClipboard(tx.txid)}
                                      >
                                        <Copy className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button asChild>
                                    <a
                                      href={`https://blockchain.com/explorer/transactions/${tx.txid}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      View on Explorer
                                    </a>
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="deposit">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>Deposit {selectedAsset}</CardTitle>
                  <CardDescription>
                    Send only {selectedAsset} to this deposit address. Sending any other coin may result in permanent loss.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!selectedAsset ? (
                    <div className="py-8 text-center">
                      <Wallet className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">Select an asset to deposit</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Choose from the dropdown below to get a deposit address
                      </p>
                      <Select
                        value={selectedAsset}
                        onValueChange={(value) => {
                          setSelectedAsset(value)
                          setDepositAddress(`bc1q${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`)
                        }}
                      >
                        <SelectTrigger className="mt-4 w-[240px] mx-auto">
                          <SelectValue placeholder="Select a coin" />
                        </SelectTrigger>
                        <SelectContent>
                          {assets.map((asset) => (
                            <SelectItem key={asset.coin} value={asset.coin}>
                              {asset.coin} - {asset.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <>
                      <div className="rounded-lg border p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-medium">{selectedAsset} Deposit Address</h3>
                          <div className="flex items-center gap-2">
                            <Dialog open={showQrCode} onOpenChange={setShowQrCode}>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <QrCode className="h-4 w-4 mr-1" />
                                  QR Code
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-sm">
                                <DialogHeader>
                                  <DialogTitle>{selectedAsset} Deposit Address</DialogTitle>
                                </DialogHeader>
                                {/* Placeholder for QR Code, in a real app would use a QR code library */}
                                <div className="mx-auto w-48 h-48 flex items-center justify-center border rounded-md bg-card my-4">
                                  <div className="text-center text-muted-foreground">QR Code would be displayed here</div>
                                </div>
                                <div className="text-center text-xs truncate">{depositAddress}</div>
                              </DialogContent>
                            </Dialog>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(depositAddress)}
                            >
                              <Copy className="h-4 w-4 mr-1" />
                              Copy
                            </Button>
                          </div>
                        </div>
                        <div className="bg-muted p-3 rounded text-sm font-mono break-all">
                          {depositAddress}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-medium text-lg">Important Notes:</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          <li>Send only {selectedAsset} to this address</li>
                          <li>Minimum deposit amount: 0.0001 {selectedAsset}</li>
                          <li>Deposits require network confirmations before being credited</li>
                          <li>The deposit address is generated specifically for your account and will not change</li>
                        </ul>
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("overview")}>
                    Back to Overview
                  </Button>
                  {selectedAsset && (
                    <Button
                      onClick={() => {
                        toast.success(`Your deposit address for ${selectedAsset} has been copied to clipboard`)
                        copyToClipboard(depositAddress)
                      }}
                    >
                      Copy Address
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="withdraw">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>Withdraw {selectedAsset}</CardTitle>
                  <CardDescription>
                    Withdraw your {selectedAsset} to an external wallet. Please double-check the address before confirming.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {!selectedAsset ? (
                    <div className="py-8 text-center">
                      <Wallet className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">Select an asset to withdraw</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Choose from the dropdown below to initiate a withdrawal
                      </p>
                      <Select
                        value={selectedAsset}
                        onValueChange={setSelectedAsset}
                      >
                        <SelectTrigger className="mt-4 w-[240px] mx-auto">
                          <SelectValue placeholder="Select a coin" />
                        </SelectTrigger>
                        <SelectContent>
                          {assets.map((asset) => (
                            <SelectItem key={asset.coin} value={asset.coin}>
                              {asset.coin} - {asset.name} ({asset.available})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="withdraw-address" className="block text-sm font-medium">
                          Recipient Address
                        </label>
                        <Input
                          id="withdraw-address"
                          placeholder={`Enter ${selectedAsset} address`}
                          value={withdrawalAddress}
                          onChange={(e) => setWithdrawalAddress(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label htmlFor="withdraw-amount" className="block text-sm font-medium">
                            Amount
                          </label>
                          <span className="text-xs text-muted-foreground">
                            Available: {assets.find(a => a.coin === selectedAsset)?.available} {selectedAsset}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Input
                            id="withdraw-amount"
                            type="number"
                            placeholder="0.0"
                            min="0"
                            step="0.0001"
                            value={withdrawalAmount}
                            onChange={(e) => setWithdrawalAmount(e.target.value)}
                          />
                          <Button
                            variant="outline"
                            onClick={() => {
                              const asset = assets.find(a => a.coin === selectedAsset)
                              if (asset) {
                                setWithdrawalAmount(asset.available.toString())
                              }
                            }}
                          >
                            MAX
                          </Button>
                        </div>
                      </div>

                      <div className="bg-muted p-3 rounded">
                        <div className="flex justify-between text-sm">
                          <span>Network Fee:</span>
                          <span>0.0005 {selectedAsset}</span>
                        </div>
                        <div className="flex justify-between text-sm font-medium mt-2">
                          <span>You will receive:</span>
                          <span>
                            {withdrawalAmount
                              ? Math.max(0, Number.parseFloat(withdrawalAmount) - 0.0005).toFixed(6)
                              : "0.0"}{" "}
                            {selectedAsset}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 pt-4">
                        <h3 className="font-medium">Important Notes:</h3>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          <li>Make sure the address is correct. Transactions cannot be reversed.</li>
                          <li>Network fee: 0.0005 {selectedAsset}</li>
                          <li>Minimum withdrawal amount: 0.001 {selectedAsset}</li>
                          <li>Processing time: 10-30 minutes after confirmation</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("overview")}>
                    Back to Overview
                  </Button>
                  {selectedAsset && (
                    <Button
                      onClick={handleWithdrawalSubmit}
                      disabled={!withdrawalAmount || !withdrawalAddress}
                    >
                      Confirm Withdrawal
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </ProtectedRoute>
  )
}
