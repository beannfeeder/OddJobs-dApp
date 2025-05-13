"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Wallet, User, LogOut } from "lucide-react"

export default function ProfileButton() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const connectWallet = async () => {
    // This would typically use a Web3 library like ethers.js
    try {
      // Simulate wallet connection
      const mockAddress = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
      setWalletAddress(mockAddress)
      setIsConnected(true)
    } catch (error) {
      console.error("Error connecting wallet:", error)
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress("")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-10 w-10 cyan-border bg-theme-darkest-purple/50 hover:bg-theme-dark-purple transition-all duration-300"
        >
          <User className="h-5 w-5 text-theme-cyan" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-56 bg-theme-deeper-purple/95 backdrop-blur-md border-theme-cyan border-opacity-30"
      >
        <DropdownMenuLabel className="text-theme-cyan">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-theme-cyan/20" />

        {isConnected ? (
          <>
            <DropdownMenuItem className="flex items-center hover:bg-theme-dark-purple/70">
              <Wallet className="mr-2 h-4 w-4 text-theme-light-blue" />
              <span className="flex-1 truncate text-theme-light-blue">{walletAddress}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={disconnectWallet} className="hover:bg-theme-dark-purple/70">
              <LogOut className="mr-2 h-4 w-4 text-theme-cyan" />
              <span className="text-theme-cyan">Disconnect Wallet</span>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem onClick={connectWallet} className="hover:bg-theme-dark-purple/70">
            <Wallet className="mr-2 h-4 w-4 text-theme-cyan" />
            <span className="text-theme-cyan">Connect Wallet</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
