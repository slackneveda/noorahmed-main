"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const Logo = () => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-white font-bold">N</div>
        <span className="text-xl font-bold">Noor Ahmed</span>
      </div>
    )
  }

  return (
    <a href="#home" className="flex items-center gap-2 relative group">
      <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center text-white font-bold relative overflow-hidden">
        <span className="z-10">N</span>
        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-primary-light opacity-80 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <span className="text-xl font-bold group-hover:text-primary transition-colors">Noor Ahmed</span>
    </a>
  )
}

export default Logo
