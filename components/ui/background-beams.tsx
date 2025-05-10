"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef, useState } from "react"

export function BackgroundBeams({
  className,
  ...props
}: {
  className?: string
}) {
  const beamsRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (beamsRef.current) {
        const rect = beamsRef.current.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        setMousePosition({ x, y })
      }
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div
      ref={beamsRef}
      style={{
        "--x": `${mousePosition.x}px`,
        "--y": `${mousePosition.y}px`,
      }}
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(var(--primary-rgb),0.1)_0%,transparent_65%)]",
        className,
      )}
      {...props}
    />
  )
}
