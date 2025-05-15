"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowLeft, ExternalLink, Copy, Clock } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const jobId = searchParams.get("jobId")

  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [paymentProcessed, setPaymentProcessed] = useState(false)
  const [txHash, setTxHash] = useState("")

  useEffect(() => {
    if (!jobId) {
      router.push("/dashboard/my-jobs")
      return
    }

    // Load job from localStorage
    const myJobsStr = localStorage.getItem("myJobs")
    if (myJobsStr) {
      const myJobs = JSON.parse(myJobsStr)
      const foundJob = myJobs.find((j: any) => j.id === Number.parseInt(jobId))

      if (foundJob) {
        setJob(foundJob)
        setPaymentProcessed(foundJob.status === "paid")

        // Generate a random transaction hash if not already set
        if (foundJob.txHash) {
          setTxHash(foundJob.txHash)
        } else {
          setTxHash(`0x${Math.random().toString(16).substring(2, 40)}`)
        }
      }
    }

    setLoading(false)
  }, [jobId, router])

  const processPayment = () => {
    // Update job status to paid
    const myJobsStr = localStorage.getItem("myJobs")
    if (myJobsStr) {
      const myJobs = JSON.parse(myJobsStr)
      const updatedJobs = myJobs.map((j: any) => {
        if (j.id === Number.parseInt(jobId as string)) {
          return {
            ...j,
            status: "paid",
            paidAt: new Date().toISOString(),
            txHash: txHash,
          }
        }
        return j
      })

      localStorage.setItem("myJobs", JSON.stringify(updatedJobs))
      setJob({ ...job, status: "paid", paidAt: new Date().toISOString() })
      setPaymentProcessed(true)
    }
  }

  if (loading) {
    return (
      <div className="p-4 md:p-6 flex justify-center items-center min-h-[50vh]">
        <div className="text-theme-cyan">Loading payment details...</div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="p-4 md:p-6">
        <h1 className="text-2xl font-bold text-white mb-4">Payment Details</h1>
        <div className="bg-theme-dark-purple border border-theme-cyan/20 rounded-lg p-6 text-center">
          <p className="text-muted-foreground mb-4">Job not found or payment details unavailable.</p>
          <Button asChild>
            <Link href="/dashboard/my-jobs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to My Jobs
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex items-center mb-6">
        <Button variant="ghost" className="mr-2 p-0 h-auto" asChild>
          <Link href="/dashboard/my-jobs">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-white">Payment Details</h1>
      </div>

      <Card className="bg-theme-dark-purple border-theme-cyan/20 mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-white">{job.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Payment Amount:</span>
            <span className="text-2xl font-bold text-theme-cyan">{job.pay}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Status:</span>
            <span className="flex items-center">
              {paymentProcessed ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-400 mr-1" />
                  <span className="text-green-400">Paid</span>
                </>
              ) : (
                <>
                  <Clock className="h-5 w-5 text-yellow-400 mr-1" />
                  <span className="text-yellow-400">Pending</span>
                </>
              )}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Job Completed:</span>
            <span className="text-white">
              {job.completedAt ? new Date(job.completedAt).toLocaleDateString() : "N/A"}
            </span>
          </div>

          {paymentProcessed && job.paidAt && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Payment Date:</span>
              <span className="text-white">
                {new Date(job.paidAt).toLocaleDateString()} at {new Date(job.paidAt).toLocaleTimeString()}
              </span>
            </div>
          )}

          <div className="pt-4 border-t border-theme-cyan/20">
            <h3 className="text-white font-medium mb-2">Transaction Details</h3>

            {paymentProcessed ? (
              <div className="bg-theme-darkest-purple p-3 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Transaction Hash:</span>
                  <Button variant="ghost" className="h-6 w-6 p-0" title="Copy Transaction Hash">
                    <Copy className="h-4 w-4 text-muted-foreground hover:text-white" />
                  </Button>
                </div>
                <div className="text-sm text-theme-cyan break-all">{txHash}</div>
                <div className="mt-2 flex justify-end">
                  <Button variant="ghost" className="h-6 p-0 text-xs text-muted-foreground hover:text-white">
                    View on Explorer
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-theme-darkest-purple p-3 rounded-md text-center">
                <p className="text-muted-foreground text-sm mb-2">
                  Payment is being processed and will be sent to your wallet soon.
                </p>
                <Button
                  className="bg-theme-cyan text-theme-black hover:bg-theme-cyan/90 text-sm"
                  onClick={processPayment}
                >
                  Process Payment Now
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  (This is a demo - in a real app, payment would be processed automatically)
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full cyan-border text-white hover:bg-theme-dark-purple/50" asChild>
            <Link href="/dashboard/wallet">View All Transactions</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Recipient Details */}
      <Card className="bg-theme-dark-purple border-theme-cyan/20">
        <CardHeader>
          <CardTitle className="text-lg text-white">Recipient Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-theme-cyan/20 flex items-center justify-center mr-3">
              <span className="text-lg font-bold text-theme-cyan">J</span>
            </div>
            <div>
              <div className="text-white font-medium">Doe, J.</div>
              <div className="text-xs text-muted-foreground">Wallet connected via MetaMask</div>
            </div>
          </div>

          <div>
            <div className="text-sm text-muted-foreground mb-1">Wallet Address:</div>
            <div className="flex justify-between items-center bg-theme-darkest-purple p-2 rounded-md">
              <span className="text-sm text-white break-all">0x71C7656EC7ab88b098defB751B7401B5f6d8976F</span>
              <Button variant="ghost" className="h-6 w-6 p-0" title="Copy Wallet Address">
                <Copy className="h-4 w-4 text-muted-foreground hover:text-white" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
