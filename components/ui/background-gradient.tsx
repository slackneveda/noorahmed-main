"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

interface BackgroundGradientProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  animate?: boolean
}

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: BackgroundGradientProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !isHovered) return

    const rect = containerRef.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setOpacity(0)
  }

  useEffect(() => {
    if (!animate) {
      setOpacity(1)
    }
  }, [animate])

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden rounded-[inherit]", containerClassName)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={cn("pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300", className)}
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(var(--primary-rgb), 0.15), transparent 40%)`,
        }}
      />
      {children}
    </div>
  )
}
