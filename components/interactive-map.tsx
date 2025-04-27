"use client"

import { cn } from "@/lib/utils"
import { tripData } from "@/lib/trip-data"
import { hikesData } from "@/lib/hikes-data"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Ruler, TrendingUp } from "lucide-react"

interface InteractiveMapProps {
  activeDay: number
  className?: string
}

export default function InteractiveMap({ activeDay, className }: InteractiveMapProps) {
  // Get data for the active day
  const dayData = tripData.find((day) => day.day === activeDay)
  const dayHikes = hikesData.filter((hike) => hike.day === activeDay)

  // Get location-specific images based on the destination
  const getLocationImage = (location) => {
    if (location?.includes("Banff")) {
      return "/images/destinations/banff-lake-louise.png"
    } else if (location?.includes("Kelowna")) {
      return "/images/destinations/kelowna-lake.png"
    } else if (location?.includes("Revelstoke")) {
      return "/images/destinations/revelstoke-mountain.png"
    } else if (location?.includes("Vancouver")) {
      return "/images/destinations/vancouver-skyline.png"
    } else if (location?.includes("Juniper Beach")) {
      return "/images/destinations/juniper-beach.png"
    } else if (location?.includes("Golden")) {
      return "/images/destinations/golden-trail.png"
    } else {
      return "/images/destinations/bc-alberta-route.png"
    }
  }

  const handleImageError = (event) => {
    event.currentTarget.src = "/images/destinations/mountain-valley-vista.png"
  }

  return (
    <div className={cn("relative h-[600px] w-full bg-stone-100 rounded-lg overflow-hidden", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
        <div className="relative h-full lg:col-span-2">
          <img
            src={dayData ? getLocationImage(dayData.to) : "/images/destinations/bc-alberta-route.png"}
            alt={dayData ? `${dayData.to} scenic view` : "BC to Alberta Route"}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
          {dayData && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">
              <h3 className="font-medium">
                Day {dayData.day}: {dayData.title}
              </h3>
              <p className="text-sm">{dayData.date}</p>
              <p className="text-sm mt-1">
                From {dayData.from} to {dayData.to} • {dayData.distance} km
              </p>
            </div>
          )}
        </div>

        <div className="overflow-auto h-full bg-white p-4">
          <h3 className="font-medium text-lg mb-4">Day {activeDay} Highlights</h3>

          {dayData && (
            <div className="mb-6">
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Journey</h4>
              <p className="text-sm mb-2">
                <span className="font-medium">From:</span> {dayData.from}
              </p>
              <p className="text-sm mb-2">
                <span className="font-medium">To:</span> {dayData.to}
              </p>
              <p className="text-sm mb-2">
                <span className="font-medium">Distance:</span> {dayData.distance} km
              </p>
              <p className="text-sm mb-2">
                <span className="font-medium">Drive Time:</span> {dayData.driveTime}
              </p>
            </div>
          )}

          {dayHikes.length > 0 && (
            <div>
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Hiking Trails</h4>
              <div className="space-y-3">
                {dayHikes.map((hike, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="h-24 overflow-hidden">
                      <div className="h-full w-full bg-stone-200">
                        <img
                          src={hike.imageUrl || `/images/hikes/${hike.name.toLowerCase().replace(/\s+/g, "-")}.jpg`}
                          alt={hike.name}
                          className="w-full h-full object-cover"
                          onError={handleImageError}
                        />
                      </div>
                    </div>
                    <CardContent className="p-3">
                      <h5 className="font-medium text-sm">{hike.name}</h5>
                      <div className="grid grid-cols-3 gap-1 mt-2 text-xs">
                        <div className="flex items-center">
                          <Ruler className="h-3 w-3 mr-1 text-emerald-600" />
                          {hike.distance}
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1 text-emerald-600" />
                          {hike.difficulty}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-emerald-600" />
                          {hike.duration}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {dayData?.notes && (
            <div className="mt-6">
              <h4 className="font-medium text-sm text-muted-foreground mb-2">Notes</h4>
              <p className="text-sm">{dayData.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
