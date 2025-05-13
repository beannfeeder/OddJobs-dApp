"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Menu, X } from "lucide-react"
import DashboardMap from "@/components/dashboard-map"
import DashboardSidebar from "@/components/dashboard-sidebar"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen flex flex-col bg-purple-gradient">
      {/* Header */}
      <header className="w-full p-4 flex justify-between items-center z-10 bg-theme-darkest-purple/80 backdrop-blur-sm border-b border-theme-cyan/20">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 text-theme-cyan md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
          <Link href="/dashboard" className="text-xl font-bold text-theme-cyan">
            OddJobs
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              className="pl-9 w-[200px] lg:w-[300px] bg-theme-dark-purple/50 border-theme-cyan/30 text-white"
            />
          </div>

          <div className="flex items-center gap-1 bg-theme-dark-purple/50 px-3 py-1.5 rounded-full border border-theme-cyan/30">
            <div className="w-6 h-6 rounded-full bg-theme-cyan flex items-center justify-center text-xs font-bold text-theme-black">
              J
            </div>
            <span className="ml-1 text-white text-sm">Doe, J.</span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <DashboardSidebar open={sidebarOpen} />

        {/* Map */}
        <main className="flex-1 relative">
          <DashboardMap />

          {/* Mobile search */}
          <div className="absolute top-4 left-0 right-0 px-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                className="pl-9 w-full bg-theme-dark-purple/70 border-theme-cyan/30 text-white"
              />
            </div>
          </div>

          {/* Job count */}
          <div className="absolute bottom-4 left-4 bg-theme-dark-purple/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-theme-cyan/30">
            <p className="text-white text-sm">
              <span className="text-theme-cyan font-bold">12</span> jobs available in this area
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
