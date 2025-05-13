import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Plus, Briefcase, Clock, Wallet, Settings, HelpCircle } from "lucide-react"

interface DashboardSidebarProps {
  open: boolean
}

export default function DashboardSidebar({ open }: DashboardSidebarProps) {
  return (
    <aside
      className={`${
        open ? "translate-x-0" : "-translate-x-full"
      } fixed md:relative md:translate-x-0 z-20 h-[calc(100vh-4rem)] w-64 bg-theme-darkest-purple/90 backdrop-blur-md border-r border-theme-cyan/20 transition-transform duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-full p-4">
        {/* Main action buttons */}
        <div className="space-y-3 mb-8">
          <Button className="w-full justify-start text-base bg-theme-dark-purple hover:bg-theme-dark-purple/80 border border-theme-cyan/30 text-white">
            <Search className="mr-2 h-5 w-5 text-theme-cyan" />
            Search Jobs...
          </Button>

          <Button className="w-full justify-start text-base bg-theme-dark-purple hover:bg-theme-dark-purple/80 border border-theme-cyan/30 text-white">
            <Plus className="mr-2 h-5 w-5 text-theme-cyan" />
            Post a Job...
          </Button>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 flex-1">
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-theme-dark-purple/50" asChild>
            <Link href="/dashboard">
              <Briefcase className="mr-2 h-5 w-5 text-theme-cyan" />
              Available Jobs
            </Link>
          </Button>

          <Button variant="ghost" className="w-full justify-start text-white hover:bg-theme-dark-purple/50" asChild>
            <Link href="/dashboard/my-jobs">
              <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
              My Jobs
            </Link>
          </Button>

          <Button variant="ghost" className="w-full justify-start text-white hover:bg-theme-dark-purple/50" asChild>
            <Link href="/dashboard/wallet">
              <Wallet className="mr-2 h-5 w-5 text-muted-foreground" />
              Wallet
            </Link>
          </Button>
        </nav>

        {/* Footer navigation */}
        <div className="space-y-1 pt-4 border-t border-theme-cyan/20">
          <Button variant="ghost" className="w-full justify-start text-white hover:bg-theme-dark-purple/50" asChild>
            <Link href="/dashboard/settings">
              <Settings className="mr-2 h-5 w-5 text-muted-foreground" />
              Settings
            </Link>
          </Button>

          <Button variant="ghost" className="w-full justify-start text-white hover:bg-theme-dark-purple/50" asChild>
            <Link href="/dashboard/help">
              <HelpCircle className="mr-2 h-5 w-5 text-muted-foreground" />
              Help & Support
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  )
}
