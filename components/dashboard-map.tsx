"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { MapPin, X, Check, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample job data with more spread out coordinates and USDC values
const initialJobLocations = [
  {
    id: 1,
    title: "Dog Walking",
    pay: "25 USDC",
    location: "Downtown",
    description: "Walk two friendly golden retrievers for 30 minutes around the park.",
    lat: 40.712,
    lng: -74.006,
  },
  {
    id: 2,
    title: "Grocery Delivery",
    pay: "15 USDC",
    location: "Uptown",
    description: "Deliver groceries from Whole Foods to an elderly couple.",
    lat: 40.735,
    lng: -73.99,
  },
  {
    id: 3,
    title: "Lawn Mowing",
    pay: "35 USDC",
    location: "Suburbs",
    description: "Mow a small front lawn and trim hedges.",
    lat: 40.702,
    lng: -74.02,
  },
  {
    id: 4,
    title: "House Cleaning",
    pay: "75 USDC",
    location: "Midtown",
    description: "Clean a 2-bedroom apartment including kitchen and bathroom.",
    lat: 40.755,
    lng: -73.97,
  },
  {
    id: 5,
    title: "Tutoring",
    pay: "45 USDC",
    location: "University Area",
    description: "Help a high school student with calculus for 2 hours.",
    lat: 40.73,
    lng: -73.96,
  },
  {
    id: 6,
    title: "Food Delivery",
    pay: "12 USDC",
    location: "Financial District",
    description: "Deliver lunch orders to an office building.",
    lat: 40.708,
    lng: -74.01,
  },
  {
    id: 7,
    title: "Furniture Assembly",
    pay: "60 USDC",
    location: "Brooklyn",
    description: "Assemble a bookshelf and desk from IKEA.",
    lat: 40.68,
    lng: -73.95,
  },
  {
    id: 8,
    title: "Car Wash",
    pay: "30 USDC",
    location: "Queens",
    description: "Wash and vacuum a sedan at owner's residence.",
    lat: 40.75,
    lng: -73.87,
  },
  {
    id: 9,
    title: "Web Development",
    pay: "150 USDC",
    location: "Remote",
    description: "Fix CSS issues on a small business website.",
    lat: 40.72,
    lng: -73.98,
  },
  {
    id: 10,
    title: "Logo Design",
    pay: "100 USDC",
    location: "Remote",
    description: "Design a logo for a new coffee shop.",
    lat: 40.76,
    lng: -74.03,
  },
  {
    id: 11,
    title: "Content Writing",
    pay: "80 USDC",
    location: "Remote",
    description: "Write 5 blog posts about cryptocurrency.",
    lat: 40.69,
    lng: -73.99,
  },
  {
    id: 12,
    title: "Social Media",
    pay: "50 USDC",
    location: "Remote",
    description: "Create and schedule social media posts for 1 week.",
    lat: 40.74,
    lng: -74.05,
  },
]

export default function DashboardMap() {
  const router = useRouter()
  const [activeJob, setActiveJob] = useState<number | null>(null)
  const [selectedJob, setSelectedJob] = useState<number | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [availableJobs, setAvailableJobs] = useState([...initialJobLocations])
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Check local storage for taken jobs on component mount
  useEffect(() => {
    loadAvailableJobs()
  }, [])

  const loadAvailableJobs = () => {
    const takenJobsStr = localStorage.getItem("takenJobs")
    if (takenJobsStr) {
      const takenJobIds = JSON.parse(takenJobsStr)
      setAvailableJobs(initialJobLocations.filter((job) => !takenJobIds.includes(job.id)))
    } else {
      setAvailableJobs([...initialJobLocations])
    }
  }

  const handlePinClick = (jobId: number) => {
    setSelectedJob(jobId)
  }

  const closeJobDetails = () => {
    setSelectedJob(null)
  }

  const handleApply = () => {
    setShowConfirmation(true)

    // Store the taken job in local storage
    const takenJobsStr = localStorage.getItem("takenJobs")
    const takenJobs = takenJobsStr ? JSON.parse(takenJobsStr) : []
    takenJobs.push(selectedJob)
    localStorage.setItem("takenJobs", JSON.stringify(takenJobs))

    // Store the job details for the My Jobs page
    const myJobsStr = localStorage.getItem("myJobs")
    const myJobs = myJobsStr ? JSON.parse(myJobsStr) : []
    const jobToAdd = initialJobLocations.find((job) => job.id === selectedJob)
    if (jobToAdd) {
      myJobs.push({
        ...jobToAdd,
        status: "in-progress",
        appliedAt: new Date().toISOString(),
      })
      localStorage.setItem("myJobs", JSON.stringify(myJobs))
    }

    // Remove the job from available jobs
    setAvailableJobs(availableJobs.filter((job) => job.id !== selectedJob))

    setTimeout(() => {
      setShowConfirmation(false)
      setSelectedJob(null)
      router.push("/dashboard/my-jobs")
    }, 2000)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setSelectedJob(null)

    // Clear taken jobs from local storage
    localStorage.removeItem("takenJobs")

    // Simulate a loading delay
    setTimeout(() => {
      // Reset available jobs to initial state
      setAvailableJobs([...initialJobLocations])
      setIsRefreshing(false)
    }, 1000)
  }

  // Find the selected job
  const selectedJobData = availableJobs.find((job) => job.id === selectedJob)

  // Calculate map dimensions for better pin distribution
  const mapWidth = 100
  const mapHeight = 100

  // Function to normalize coordinates to fit our map
  const normalizeCoordinates = (lat: number, lng: number) => {
    // These ranges should be adjusted based on your actual data
    const latRange = [40.68, 40.76]
    const lngRange = [-74.05, -73.87]

    const normalizedLat = ((lat - latRange[0]) / (latRange[1] - latRange[0])) * mapHeight
    const normalizedLng = ((lng - lngRange[0]) / (lngRange[1] - lngRange[0])) * mapWidth

    return { x: normalizedLng, y: normalizedLat }
  }

  return (
    <div className="h-full w-full bg-theme-deep-purple relative overflow-hidden">
      {/* Map grid lines for visual effect */}
      <div className="absolute inset-0 grid-lines opacity-30"></div>

      {/* Subtle glow in the center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-glow opacity-10"></div>

      {/* Refresh button */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          onClick={handleRefresh}
          variant="outline"
          size="sm"
          className="cyan-border bg-theme-darkest-purple/70 text-theme-cyan hover:bg-theme-dark-purple/50"
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          {isRefreshing ? "Refreshing..." : "Refresh Jobs"}
        </Button>
      </div>

      {/* Map markers */}
      <div className="absolute inset-0">
        {availableJobs.map((job) => {
          const coords = normalizeCoordinates(job.lat, job.lng)
          return (
            <div
              key={job.id}
              className="absolute"
              style={{
                left: `${coords.x}%`,
                top: `${coords.y}%`,
              }}
            >
              <div
                className="relative group cursor-pointer"
                onMouseEnter={() => setActiveJob(job.id)}
                onMouseLeave={() => setActiveJob(null)}
                onClick={() => handlePinClick(job.id)}
              >
                <MapPin
                  size={activeJob === job.id || selectedJob === job.id ? 32 : 24}
                  className={`text-theme-cyan ${activeJob === job.id || selectedJob === job.id ? "animate-pulse" : ""}`}
                />

                {/* Hover tooltip */}
                {activeJob === job.id && selectedJob !== job.id && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 bg-theme-darkest-purple/90 backdrop-blur-md p-2 rounded-lg border border-theme-cyan/30 shadow-lg z-10">
                    <h3 className="font-medium text-white text-sm">{job.title}</h3>
                    <p className="text-xs text-theme-cyan">{job.pay}</p>
                    <div className="mt-1 text-xs text-muted-foreground">Click for details</div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Job details popup */}
      {selectedJob && selectedJobData && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] bg-theme-darkest-purple/95 backdrop-blur-md p-4 rounded-lg border border-theme-cyan/40 shadow-lg z-20">
          <button onClick={closeJobDetails} className="absolute top-3 right-3 text-muted-foreground hover:text-white">
            <X size={18} />
          </button>

          <h2 className="text-xl font-bold text-white mb-1">{selectedJobData.title}</h2>
          <div className="flex items-center justify-between mb-3">
            <p className="text-theme-cyan font-semibold">{selectedJobData.pay}</p>
            <p className="text-sm text-muted-foreground">{selectedJobData.location}</p>
          </div>

          <div className="border-t border-theme-cyan/20 my-3 pt-3">
            <h3 className="text-sm font-medium text-white mb-1">Job Description:</h3>
            <p className="text-sm text-muted-foreground mb-4">{selectedJobData.description}</p>
          </div>

          <Button className="w-full bg-theme-cyan text-theme-black hover:bg-theme-cyan/90" onClick={handleApply}>
            Apply for this Job
          </Button>
        </div>
      )}

      {/* Application confirmation */}
      {showConfirmation && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] bg-theme-darkest-purple/95 backdrop-blur-md p-6 rounded-lg border border-theme-cyan/40 shadow-lg z-30 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-theme-cyan/20 flex items-center justify-center mb-4">
            <Check size={32} className="text-theme-cyan" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Job Secured!</h2>
          <p className="text-sm text-muted-foreground text-center mb-2">
            This job is now locked to your account. You'll be redirected to your jobs page.
          </p>
          <p className="text-theme-cyan text-sm">Transaction ID: 0x71C7...8976F</p>
        </div>
      )}

      {/* Refreshing overlay */}
      {isRefreshing && (
        <div className="absolute inset-0 bg-theme-darkest-purple/50 backdrop-blur-sm flex items-center justify-center z-40">
          <div className="flex flex-col items-center">
            <RefreshCw size={40} className="text-theme-cyan animate-spin mb-4" />
            <p className="text-white text-lg">Refreshing available jobs...</p>
          </div>
        </div>
      )}

      {/* Map attribution - would be required for real maps */}
      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-theme-darkest-purple/70 px-2 py-1 rounded">
        Map data © OddJobs 2025
      </div>

      {/* Job count */}
      <div className="absolute bottom-4 left-4 bg-theme-dark-purple/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-theme-cyan/30">
        <p className="text-white text-sm">
          <span className="text-theme-cyan font-bold">{availableJobs.length}</span> jobs available in this area
        </p>
      </div>
    </div>
  )
}
