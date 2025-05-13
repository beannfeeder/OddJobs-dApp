"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  // Simulate wallet detection on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setWalletAddress("0x71C7656EC7ab88b098defB751B7401B5f6d8976F")
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleLogin = () => {
    setIsLoading(true)

    // Simulate login delay
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  const handleConnectWallet = () => {
    setIsConnecting(true)

    // Simulate wallet connection delay
    setTimeout(() => {
      setWalletAddress("0x71C7656EC7ab88b098defB751B7401B5f6d8976F")
      setIsConnecting(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-gradient p-4">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-glow opacity-20 z-0"></div>

      <Link href="/" className="absolute top-4 left-4 text-2xl font-bold text-theme-cyan">
        OddJobs
      </Link>

      <Card className="w-full max-w-md bg-theme-darkest-purple/80 backdrop-blur-md border-theme-cyan/30">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
          <CardDescription className="text-muted-foreground">Log in to access your OddJobs account</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center">
          {/* User profile circle */}
          <div className="w-24 h-24 rounded-full bg-theme-dark-purple border-4 border-theme-cyan flex items-center justify-center mb-6">
            <span className="text-4xl font-bold text-theme-cyan">J</span>
          </div>

          {walletAddress ? (
            <>
              <div className="text-center mb-6">
                <h3 className="text-xl font-medium text-white mb-1">Doe, J.</h3>
                <p className="text-sm text-muted-foreground break-all">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </p>
              </div>

              <Button
                className="w-full bg-theme-cyan text-theme-black hover:bg-theme-cyan/90 mb-4"
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Continue as Doe, J."}
              </Button>
            </>
          ) : (
            <Button
              className="w-full cyan-border text-theme-cyan hover:bg-theme-dark-purple/50"
              variant="outline"
              onClick={handleConnectWallet}
              disabled={isConnecting}
            >
              <Wallet className="mr-2 h-5 w-5" />
              {isConnecting ? "Connecting Wallet..." : "Connect Wallet"}
            </Button>
          )}

          {walletAddress && (
            <Button
              variant="ghost"
              className="text-sm text-muted-foreground hover:text-white"
              onClick={() => setWalletAddress("")}
            >
              Use a different wallet
            </Button>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center w-full">
            Don&apos;t have an account?{" "}
            <Link href="/" className="text-theme-cyan hover:underline">
              Register
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
