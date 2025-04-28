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
    const defaultImage = "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // Mountain forest valley vista spring
    if (!location) return defaultImage;

    if (location.includes("Banff")) {
      return "https://images.pexels.com/photos/1592461/pexels-photo-1592461.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // Lake Louise Banff
    } else if (location.includes("Kelowna")) {
      return "https://images.pexels.com/photos/15881307/pexels-photo-15881307.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // Okanagan Lake Kelowna
    } else if (location.includes("Revelstoke")) {
      return "https://images.pexels.com/photos/216076/pexels-photo-216076.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // Revelstoke Mountain
    } else if (location.includes("Vancouver")) {
      return "https://images.pexels.com/photos/2100921/pexels-photo-2100921.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // Vancouver skyline
    } else if (location.includes("Juniper Beach")) {
      return "https://images.pexels.com/photos/1415364/pexels-photo-1415364.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // Juniper Beach
    } else if (location.includes("Golden")) {
      return "https://images.pexels.com/photos/216076/pexels-photo-216076.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // Golden (using Revelstoke image)
    } else if (location.includes("Lillooet")) {
      return "https://images.pexels.com/photos/19648104/pexels-photo-19648104.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // Lillooet
    } else if (location.includes("Kamloops")) {
      return "https://images.pexels.com/photos/11544932/pexels-photo-11544932.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // Kamloops
    } else if (location.includes("Pemberton")) {
      return "https://images.pexels.com/photos/5926961/pexels-photo-5926961.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // Pemberton
    } else if (location.includes("Yoho")) {
      return "https://images.pexels.com/photos/12699494/pexels-photo-12699494.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // Yoho
    } else {
      return "https://images.pexels.com/photos/30480941/pexels-photo-30480941.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // BC-Alberta Route
    }
  }

  const handleImageError = (event) => {
    event.currentTarget.src = "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // Fallback
  }

  return (
    <div className={cn("relative h-[600px] w-full bg-stone-100 rounded-lg overflow-hidden", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 h-full">
        <div className="relative h-full lg:col-span-2">
          <img
            src={dayData ? getLocationImage(dayData.to) : "https://images.pexels.com/photos/30480941/pexels-photo-30480941.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"} // BC-Alberta Route default
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
                          src={hike.imageUrl || "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"} // Use hike.imageUrl with fallback
                          alt={hike.name}
                          className="w-full h-full object-cover"
                          onError={handleImageError} // Already uses Pexels fallback
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
