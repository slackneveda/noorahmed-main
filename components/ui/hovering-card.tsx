"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useRef, useState } from "react"

interface HoveringCardProps {
  children: React.ReactNode
  className?: string
}

export const HoveringCard = ({ children, className }: HoveringCardProps) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const card = cardRef.current
    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const rotateX = (centerY - e.clientY) / 10
    const rotateY = (e.clientX - centerX) / 10

    setRotate({ x: rotateX, y: rotateY })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotate({ x: 0, y: 0 })
  }

  return (
    <div
      ref={cardRef}
      className={cn("transition-transform duration-200", className)}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
          : "perspective(1000px) rotateX(0) rotateY(0)",
        transition: "transform 0.2s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
