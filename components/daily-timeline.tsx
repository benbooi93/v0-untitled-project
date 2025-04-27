"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface TimelineEvent {
  time: string
  title: string
  description?: string
  icon?: React.ReactNode
}

interface DailyTimelineProps {
  events: TimelineEvent[]
  className?: string
}

export default function DailyTimeline({ events, className }: DailyTimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-stone-200" />

      {/* Timeline events */}
      <div className="space-y-8">
        {events.map((event, index) => (
          <div key={index} className="relative pl-10">
            {/* Timeline dot */}
            <div className="absolute left-0 top-1.5 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-emerald-100 text-emerald-600 shadow-sm">
              {event.icon}
            </div>

            <div className="flex flex-col space-y-1">
              <div className="flex items-center">
                <span className="text-sm font-medium text-emerald-600">{event.time}</span>
              </div>
              <h3 className="text-base font-medium">{event.title}</h3>
              {event.description && <p className="text-sm text-muted-foreground">{event.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
