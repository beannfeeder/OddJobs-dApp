"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

// Sample job data
const jobLocations = [
  { id: 1, title: "Dog Walking", pay: "0.05 ETH", lat: 40.7128, lng: -74.006, color: "cyan" },
  { id: 2, title: "Grocery Delivery", pay: "0.03 ETH", lat: 40.7148, lng: -74.013, color: "cyan" },
  { id: 3, title: "Lawn Mowing", pay: "0.02 ETH", lat: 40.7158, lng: -73.998, color: "cyan" },
  { id: 4, title: "House Cleaning", pay: "0.04 ETH", lat: 40.7118, lng: -74.009, color: "cyan" },
  { id: 5, title: "Tutoring", pay: "0.06 ETH", lat: 40.7138, lng: -74.002, color: "cyan" },
  { id: 6, title: "Food Delivery", pay: "0.025 ETH", lat: 40.7108, lng: -74.016, color: "cyan" },
  { id: 7, title: "Furniture Assembly", pay: "0.07 ETH", lat: 40.7168, lng: -74.003, color: "cyan" },
  { id: 8, title: "Car Wash", pay: "0.015 ETH", lat: 40.7098, lng: -74.011, color: "cyan" },
  { id: 9, title: "Web Development", pay: "0.1 ETH", lat: 40.7178, lng: -74.008, color: "cyan" },
  { id: 10, title: "Logo Design", pay: "0.08 ETH", lat: 40.7188, lng: -74.001, color: "cyan" },
  { id: 11, title: "Content Writing", pay: "0.04 ETH", lat: 40.7208, lng: -74.005, color: "cyan" },
  { id: 12, title: "Social Media", pay: "0.03 ETH", lat: 40.7218, lng: -74.014, color: "cyan" },
]

export default function DashboardMap() {
  const [activeJob, setActiveJob] = useState<number | null>(null)

  // In a real implementation, we would use a mapping library like Mapbox, Google Maps, or Leaflet
  // For this mockup, we'll create a simple visual representation

  return (
    <div className="h-full w-full bg-theme-deep-purple relative overflow-hidden">
      {/* Map grid lines for visual effect */}
      <div className="absolute inset-0 grid-lines opacity-30"></div>

      {/* Subtle glow in the center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-glow opacity-10"></div>

      {/* Map markers */}
      <div className="absolute inset-0">
        {jobLocations.map((job) => (
          <div
            key={job.id}
            className="absolute"
            style={{
              left: `${(job.lng + 74.02) * 1000}%`,
              top: `${(40.72 - job.lat) * 1000}%`,
            }}
            onMouseEnter={() => setActiveJob(job.id)}
            onMouseLeave={() => setActiveJob(null)}
          >
            <div className="relative group cursor-pointer">
              <MapPin
                size={activeJob === job.id ? 32 : 24}
                className={`text-theme-cyan ${activeJob === job.id ? "animate-pulse" : ""}`}
              />

              {/* Job info popup */}
              <div
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-theme-darkest-purple/90 backdrop-blur-md p-3 rounded-lg border border-theme-cyan/30 shadow-lg transition-opacity duration-200 ${activeJob === job.id ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              >
                <h3 className="font-medium text-white">{job.title}</h3>
                <p className="text-sm text-theme-cyan font-semibold">{job.pay}</p>
                <div className="mt-1 text-xs text-muted-foreground">Click to view details</div>
                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-theme-darkest-purple border-r border-b border-theme-cyan/30"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map attribution - would be required for real maps */}
      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-theme-darkest-purple/70 px-2 py-1 rounded">
        Map data © OddJobs 2025
      </div>
    </div>
  )
}
