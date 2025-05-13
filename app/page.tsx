import { Button } from "@/components/ui/button"
import JobPreviewBackground from "@/components/job-preview-background"
import ProfileButton from "@/components/profile-button"

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-purple-gradient">
      {/* Subtle cyan glow effect in the background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-glow opacity-20 z-0"></div>

      {/* Header with profile button */}
      <header className="w-full p-4 flex justify-between items-center z-10 bg-theme-darkest-purple/50 backdrop-blur-sm">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-theme-cyan">OddJobs</h1>
        </div>
        <ProfileButton />
      </header>

      {/* Background job previews */}
      <div className="absolute inset-0 z-0 opacity-10">
        <JobPreviewBackground />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-theme-cyan animate-pulse-slow">Welcome to </span>
            <span className="text-white">OddJobs</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Find part-time jobs, gigs, and chores to earn crypto while looking for your next opportunity
          </p>
        </div>

        {/* Auth buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button className="flex-1 h-14 text-lg font-semibold bg-theme-cyan text-theme-black hover:bg-theme-cyan/90 transition-all duration-300">
            Register
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-14 text-lg font-semibold cyan-border text-theme-cyan hover:bg-theme-dark-purple/50 transition-all duration-300"
          >
            Log In
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground z-10">
        <p>© 2025 OddJobs dApp. All rights reserved.</p>
      </footer>
    </div>
  )
}
