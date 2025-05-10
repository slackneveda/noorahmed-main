"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface MeteorsProps {
  number?: number
  className?: string
}

export const Meteors = ({ number = 20, className }: MeteorsProps) => {
  const [meteors, setMeteors] = useState<Array<{ id: number; duration: number; delay: number; x: number; y: number }>>(
    [],
  )

  useEffect(() => {
    const newMeteors = [...Array(number)].map((_, idx) => ({
      id: idx,
      duration: Math.floor(Math.random() * 1000) + 600, // between 600ms and 1600ms
      delay: Math.floor(Math.random() * 1000) + 100, // between 100ms and 1100ms
      x: Math.floor(Math.random() * 100), // between 0% and 100%
      y: Math.floor(Math.random() * 100), // between 0% and 100%
    }))

    setMeteors(newMeteors)
  }, [number])

  return (
    <>
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className={cn(
            "animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-primary shadow-[0_0_2px_1px_rgba(var(--primary-rgb),0.5)] rotate-[215deg]",
            className,
          )}
          style={{
            top: `calc(${meteor.y}%)`,
            left: `calc(${meteor.x}%)`,
            animationDelay: `${meteor.delay}ms`,
            animationDuration: `${meteor.duration}ms`,
          }}
        >
          <div className="absolute h-[1px] w-[50px] bg-gradient-to-r from-transparent to-primary top-0 -right-[50px]"></div>
        </span>
      ))}
    </>
  )
}
