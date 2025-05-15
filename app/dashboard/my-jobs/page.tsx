"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Clock, CheckCircle, ArrowRight } from "lucide-react"

type Job = {
  id: number
  title: string
  pay: string
  location: string
  description: string
  status: "in-progress" | "completed" | "paid"
  appliedAt: string
  completedAt?: string
  paidAt?: string
}

export default function MyJobsPage() {
  const router = useRouter()
  const [myJobs, setMyJobs] = useState<Job[]>([])
  const [showCompletionConfirmation, setShowCompletionConfirmation] = useState(false)
  const [completedJobId, setCompletedJobId] = useState<number | null>(null)

  useEffect(() => {
    // Load jobs from localStorage
    const myJobsStr = localStorage.getItem("myJobs")
    if (myJobsStr) {
      setMyJobs(JSON.parse(myJobsStr))
    }
  }, [])

  const markJobAsCompleted = (jobId: number) => {
    setCompletedJobId(jobId)
    setShowCompletionConfirmation(true)

    // Update job status
    const updatedJobs = myJobs.map((job) => {
      if (job.id === jobId) {
        return {
          ...job,
          status: "completed",
          completedAt: new Date().toISOString(),
        }
      }
      return job
    })

    setMyJobs(updatedJobs)
    localStorage.setItem("myJobs", JSON.stringify(updatedJobs))

    // Redirect to payment page after a delay
    setTimeout(() => {
      setShowCompletionConfirmation(false)
      router.push(`/dashboard/wallet/payment?jobId=${jobId}`)
    }, 2000)
  }

  // Group jobs by status
  const inProgressJobs = myJobs.filter((job) => job.status === "in-progress")
  const completedJobs = myJobs.filter((job) => job.status === "completed" || job.status === "paid")

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl font-bold text-white mb-6">My Jobs</h1>

      {/* In Progress Jobs */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Clock className="mr-2 h-5 w-5 text-theme-cyan" />
          In Progress
        </h2>

        {inProgressJobs.length === 0 ? (
          <p className="text-muted-foreground">You don't have any jobs in progress.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {inProgressJobs.map((job) => (
              <Card key={job.id} className="bg-theme-dark-purple border-theme-cyan/20">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">{job.title}</h3>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-theme-cyan font-medium">{job.pay}</span>
                    <span className="text-sm text-muted-foreground">{job.location}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{job.description}</p>
                  <div className="text-xs text-muted-foreground">
                    Started: {new Date(job.appliedAt).toLocaleDateString()}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    className="w-full bg-theme-cyan text-theme-black hover:bg-theme-cyan/90"
                    onClick={() => markJobAsCompleted(job.id)}
                  >
                    Mark as Completed
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Completed Jobs */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
          <CheckCircle className="mr-2 h-5 w-5 text-theme-cyan" />
          Completed
        </h2>

        {completedJobs.length === 0 ? (
          <p className="text-muted-foreground">You haven't completed any jobs yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {completedJobs.map((job) => (
              <Card key={job.id} className="bg-theme-dark-purple border-theme-cyan/20">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">{job.title}</h3>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-theme-cyan font-medium">{job.pay}</span>
                    <span className="text-sm text-muted-foreground">{job.location}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{job.description}</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">
                      Completed: {job.completedAt ? new Date(job.completedAt).toLocaleDateString() : "N/A"}
                    </span>
                    <span className={job.status === "paid" ? "text-theme-cyan" : "text-yellow-400"}>
                      {job.status === "paid" ? "Paid" : "Payment Pending"}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    variant="outline"
                    className="w-full cyan-border text-white hover:bg-theme-dark-purple/50"
                    asChild
                  >
                    <Link href={`/dashboard/wallet/payment?jobId=${job.id}`}>
                      View Payment Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Completion confirmation */}
      {showCompletionConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-theme-darkest-purple/95 backdrop-blur-md p-6 rounded-lg border border-theme-cyan/40 shadow-lg w-[320px] flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-theme-cyan/20 flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-theme-cyan" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Job Completed!</h2>
            <p className="text-sm text-muted-foreground text-center mb-2">
              Great work! Your payment is being processed and will be sent to your wallet.
            </p>
            <p className="text-theme-cyan text-sm">Redirecting to payment page...</p>
          </div>
        </div>
      )}
    </div>
  )
}
