"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login delay
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  const handleQuickLogin = () => {
    setIsLoading(true)

    // Simulate login delay
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-purple-gradient p-4">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-glow opacity-20 z-0"></div>

      <Link href="/" className="absolute top-4 left-4 text-2xl font-bold text-theme-cyan">
        OddJobs
      </Link>

      <Card className="w-full max-w-md bg-theme-darkest-purple/80 backdrop-blur-md border-theme-cyan/30">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Log in to OddJobs</CardTitle>
          <CardDescription className="text-muted-foreground">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="bg-theme-dark-purple/50 border-theme-cyan/30 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="bg-theme-dark-purple/50 border-theme-cyan/30 text-white"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-theme-cyan text-theme-black hover:bg-theme-cyan/90"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-theme-cyan/20"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-theme-darkest-purple px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full cyan-border text-white hover:bg-theme-dark-purple/50"
              onClick={handleQuickLogin}
              disabled={isLoading}
            >
              Continue as Doe, J.
            </Button>

            <Button
              variant="outline"
              className="w-full cyan-border text-white hover:bg-theme-dark-purple/50"
              disabled={isLoading}
            >
              <Wallet className="mr-2 h-4 w-4 text-theme-cyan" />
              Connect Wallet
            </Button>
          </div>
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
