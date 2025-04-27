"use client"

import { useEffect, useRef } from "react"

interface ElevationPoint {
  distance: number
  elevation: number
  label?: string
}

interface ElevationChartProps {
  data: ElevationPoint[]
  maxDistance: number
  maxElevation: number
  className?: string
}

export default function ElevationChart({ data, maxDistance, maxElevation, className }: ElevationChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Chart dimensions
    const padding = { top: 20, right: 20, bottom: 30, left: 40 }
    const chartWidth = rect.width - padding.left - padding.right
    const chartHeight = rect.height - padding.top - padding.bottom

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#d1d5db" // gray-300
    ctx.lineWidth = 1
    ctx.moveTo(padding.left, padding.top)
    ctx.lineTo(padding.left, rect.height - padding.bottom)
    ctx.lineTo(rect.width - padding.right, rect.height - padding.bottom)
    ctx.stroke()

    // Draw elevation labels
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"
    ctx.fillStyle = "#6b7280" // gray-500
    ctx.font = "10px sans-serif"

    const elevationStep = Math.ceil(maxElevation / 5 / 100) * 100
    for (let i = 0; i <= maxElevation; i += elevationStep) {
      const y = rect.height - padding.bottom - (i / maxElevation) * chartHeight
      ctx.fillText(`${i}m`, padding.left - 5, y)

      // Draw horizontal grid line
      ctx.beginPath()
      ctx.strokeStyle = "#e5e7eb" // gray-200
      ctx.setLineDash([2, 2])
      ctx.moveTo(padding.left, y)
      ctx.lineTo(rect.width - padding.right, y)
      ctx.stroke()
      ctx.setLineDash([])
    }

    // Draw distance labels
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    const distanceStep = Math.ceil(maxDistance / 5)
    for (let i = 0; i <= maxDistance; i += distanceStep) {
      const x = padding.left + (i / maxDistance) * chartWidth
      ctx.fillText(`${i}km`, x, rect.height - padding.bottom + 5)
    }

    // Draw elevation path
    ctx.beginPath()
    ctx.strokeStyle = "#059669" // emerald-600
    ctx.lineWidth = 2
    ctx.lineJoin = "round"
    ctx.lineCap = "round"

    data.forEach((point, index) => {
      const x = padding.left + (point.distance / maxDistance) * chartWidth
      const y = rect.height - padding.bottom - (point.elevation / maxElevation) * chartHeight

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })
    ctx.stroke()

    // Fill area under the path
    ctx.lineTo(padding.left + chartWidth, rect.height - padding.bottom)
    ctx.lineTo(padding.left, rect.height - padding.bottom)
    ctx.closePath()
    ctx.fillStyle = "rgba(5, 150, 105, 0.1)" // emerald-600 with opacity
    ctx.fill()

    // Draw points and labels
    data.forEach((point) => {
      if (point.label) {
        const x = padding.left + (point.distance / maxDistance) * chartWidth
        const y = rect.height - padding.bottom - (point.elevation / maxElevation) * chartHeight

        // Draw point
        ctx.beginPath()
        ctx.fillStyle = "#fff"
        ctx.strokeStyle = "#059669"
        ctx.lineWidth = 2
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()
        ctx.stroke()

        // Draw label
        ctx.fillStyle = "#059669"
        ctx.textAlign = "center"
        ctx.textBaseline = "bottom"
        ctx.font = "bold 10px sans-serif"
        ctx.fillText(point.label, x, y - 8)
      }
    })
  }, [data, maxDistance, maxElevation])

  return (
    <div className={className}>
      <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "200px" }}></canvas>
    </div>
  )
}
