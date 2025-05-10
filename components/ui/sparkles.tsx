"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

export const SparklesCore = (props: {
  id: string
  background?: string
  minSize?: number
  maxSize?: number
  particleDensity?: number
  className?: string
  particleColor?: string
  particleSpeed?: number
}) => {
  const {
    id,
    background,
    minSize = 0.4,
    maxSize = 1,
    particleDensity = 100,
    className,
    particleColor = "#FFF",
    particleSpeed = 0.5,
  } = props

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const particles = useRef<Array<Particle>>([])
  const animationFrameId = useRef<number | null>(null)
  const resizeTimeoutId = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    // Get the canvas context
    const canvas = canvasRef.current
    context.current = canvas.getContext("2d")

    if (!context.current) return

    // Initialize the canvas and particles
    initCanvas()
    initParticles()

    // Animation function
    const animate = () => {
      if (!context.current) return
      context.current.clearRect(0, 0, canvas.width, canvas.height)
      updateParticles()
      animationFrameId.current = requestAnimationFrame(animate)
    }

    animate()

    // Resize event listener
    const handleResize = () => {
      if (resizeTimeoutId.current) clearTimeout(resizeTimeoutId.current)
      resizeTimeoutId.current = setTimeout(() => {
        initCanvas()
        initParticles()
      }, 200)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current)
      if (resizeTimeoutId.current) clearTimeout(resizeTimeoutId.current)
      window.removeEventListener("resize", handleResize)
    }
  }, [particleColor, minSize, maxSize, particleDensity, particleSpeed, id])

  const initCanvas = () => {
    if (!context.current || !canvasContainerRef.current || !canvasRef.current) return

    const devicePixelRatio = window.devicePixelRatio || 1
    const rect = canvasContainerRef.current.getBoundingClientRect()
    canvasRef.current.width = rect.width * devicePixelRatio
    canvasRef.current.height = rect.height * devicePixelRatio

    context.current.scale(devicePixelRatio, devicePixelRatio)
  }

  const initParticles = () => {
    if (!context.current || !canvasRef.current) return

    particles.current = []
    const numberOfParticles = particleDensity
    const canvas = canvasRef.current
    const containerRect = canvasContainerRef.current?.getBoundingClientRect()

    if (!containerRect) return

    const width = containerRect.width
    const height = containerRect.height

    for (let i = 0; i < numberOfParticles; i++) {
      const size = Math.random() * (maxSize - minSize) + minSize
      particles.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: size,
        color: particleColor,
        speedMultiplier: Math.random() * particleSpeed,
        blinkRate: Math.random() * 0.01 + 0.005,
        blinkOffset: Math.random() * Math.PI * 2,
        opacity: Math.random(),
      })
    }
  }

  interface Particle {
    x: number
    y: number
    size: number
    color: string
    speedMultiplier: number
    blinkRate: number
    blinkOffset: number
    opacity: number
  }

  const updateParticles = () => {
    if (!context.current || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = context.current
    const time = Date.now()

    particles.current.forEach((particle) => {
      // Blink effect
      particle.opacity = (Math.sin(time * particle.blinkRate + particle.blinkOffset) + 1) / 2

      // Draw the particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${hexToRgb(particle.color)}, ${particle.opacity})`
      ctx.fill()
    })
  }

  // Helper function to convert hex color to rgb
  const hexToRgb = (hex: string) => {
    // Remove the # if it exists
    hex = hex.replace(/^#/, "")

    // Parse the hex values
    const bigint = Number.parseInt(hex, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255

    return `${r}, ${g}, ${b}`
  }

  return (
    <div ref={canvasContainerRef} className={cn("h-full w-full absolute inset-0", className)}>
      <canvas
        id={id}
        ref={canvasRef}
        className="h-full w-full"
        style={{
          background: background || "transparent",
        }}
      />
    </div>
  )
}
