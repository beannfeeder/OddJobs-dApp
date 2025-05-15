"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, CreditCard, Clock, ArrowDownRight, ArrowUpRight } from "lucide-react"

// Sample transaction data with USDC
const sampleTransactions = [
  {
    id: "tx1",
    type: "received",
    amount: "25 USDC",
    from: "Dog Walking",
    date: "2025-05-10T14:30:00Z",
    status: "completed",
    txHash: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  },
  {
    id: "tx2",
    type: "received",
    amount: "15 USDC",
    from: "Grocery Delivery",
    date: "2025-05-08T10:15:00Z",
    status: "completed",
    txHash: "0x8976F71C7656EC7ab88b098defB751B7401B5f6d",
  },
  {
    id: "tx3",
    type: "sent",
    amount: "5 USDC",
    to: "Gas Fee",
    date: "2025-05-07T09:45:00Z",
    status: "completed",
    txHash: "0xB5f6d8976F71C7656EC7ab88b098defB751B7401",
  },
]

export default function WalletPage() {
  const [balance, setBalance] = useState("0 USDC")
  const [transactions, setTransactions] = useState(sampleTransactions)
  const [myJobs, setMyJobs] = useState<any[]>([])

  useEffect(() => {
    // Load jobs from localStorage
    const myJobsStr = localStorage.getItem("myJobs")
    if (myJobsStr) {
      const jobs = JSON.parse(myJobsStr)
      setMyJobs(jobs)

      // Update transactions based on completed jobs
      const jobTransactions = jobs
        .filter((job: any) => job.status === "completed" || job.status === "paid")
        .map((job: any) => ({
          id: `job-${job.id}`,
          type: "received",
          amount: job.pay,
          from: job.title,
          date: job.completedAt || new Date().toISOString(),
          status: job.status === "paid" ? "completed" : "pending",
          txHash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`,
        }))

      setTransactions([...jobTransactions, ...sampleTransactions])

      // Calculate balance
      const totalEarned = jobs
        .filter((job: any) => job.status === "paid")
        .reduce((total: number, job: any) => {
          const usdcAmount = Number.parseFloat(job.pay.split(" ")[0])
          return total + usdcAmount
        }, 0)

      setBalance(`${totalEarned.toFixed(0)} USDC`)
    }
  }, [])

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold text-white mb-6">Wallet & Payments</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {/* Balance Card */}
        <Card className="bg-theme-dark-purple border-theme-cyan/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4 p-2 rounded-full bg-theme-cyan/20">
                <Wallet className="h-6 w-6 text-theme-cyan" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{balance}</div>
                <div className="text-xs text-muted-foreground">Stablecoin pegged to USD</div>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button className="flex-1 bg-theme-cyan text-theme-black hover:bg-theme-cyan/90 text-sm">Withdraw</Button>
              <Button variant="outline" className="flex-1 cyan-border text-white hover:bg-theme-dark-purple/50 text-sm">
                Deposit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Info Card */}
        <Card className="bg-theme-dark-purple border-theme-cyan/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">Wallet Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4 p-2 rounded-full bg-theme-cyan/20">
                <CreditCard className="h-6 w-6 text-theme-cyan" />
              </div>
              <div>
                <div className="text-sm font-medium text-white break-all">
                  0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                </div>
                <div className="text-xs text-muted-foreground">Connected via MetaMask</div>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="outline" className="w-full cyan-border text-white hover:bg-theme-dark-purple/50 text-sm">
                Copy Address
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pending Payments Card */}
        <Card className="bg-theme-dark-purple border-theme-cyan/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-white">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4 p-2 rounded-full bg-theme-cyan/20">
                <Clock className="h-6 w-6 text-theme-cyan" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {myJobs.filter((job) => job.status === "completed").length} Jobs
                </div>
                <div className="text-xs text-muted-foreground">Payments being processed</div>
              </div>
            </div>
            <div className="mt-4">
              <Button
                variant="outline"
                className="w-full cyan-border text-white hover:bg-theme-dark-purple/50 text-sm"
                asChild
              >
                <Link href="/dashboard/my-jobs">View Jobs</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-theme-darkest-purple border border-theme-cyan/20 mb-4">
          <TabsTrigger value="all" className="data-[state=active]:bg-theme-dark-purple data-[state=active]:text-white">
            All Transactions
          </TabsTrigger>
          <TabsTrigger
            value="received"
            className="data-[state=active]:bg-theme-dark-purple data-[state=active]:text-white"
          >
            Received
          </TabsTrigger>
          <TabsTrigger value="sent" className="data-[state=active]:bg-theme-dark-purple data-[state=active]:text-white">
            Sent
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <TransactionList transactions={transactions} />
        </TabsContent>

        <TabsContent value="received" className="mt-0">
          <TransactionList transactions={transactions.filter((tx) => tx.type === "received")} />
        </TabsContent>

        <TabsContent value="sent" className="mt-0">
          <TransactionList transactions={transactions.filter((tx) => tx.type === "sent")} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TransactionList({ transactions }: { transactions: any[] }) {
  if (transactions.length === 0) {
    return <p className="text-muted-foreground">No transactions found.</p>
  }

  return (
    <div className="space-y-4">
      {transactions.map((tx) => (
        <div key={tx.id} className="bg-theme-dark-purple border border-theme-cyan/20 rounded-lg p-4 flex items-center">
          <div className="mr-4 p-2 rounded-full bg-theme-cyan/10">
            {tx.type === "received" ? (
              <ArrowDownRight className="h-5 w-5 text-green-400" />
            ) : (
              <ArrowUpRight className="h-5 w-5 text-red-400" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex justify-between">
              <span className="font-medium text-white">{tx.type === "received" ? tx.from : tx.to}</span>
              <span className={`font-semibold ${tx.type === "received" ? "text-green-400" : "text-red-400"}`}>
                {tx.type === "received" ? "+" : "-"}
                {tx.amount}
              </span>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-muted-foreground">
                {new Date(tx.date).toLocaleDateString()} at {new Date(tx.date).toLocaleTimeString()}
              </span>
              <span className={tx.status === "completed" ? "text-theme-cyan" : "text-yellow-400"}>
                {tx.status === "completed" ? "Completed" : "Pending"}
              </span>
            </div>
            <div className="text-xs text-muted-foreground mt-1 truncate">TX: {tx.txHash}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
