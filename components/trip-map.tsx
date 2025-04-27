"use client"

import { useEffect, useState } from "react"
import { tripData } from "@/lib/trip-data"

export default function TripMap({ activeDay = 1 }) {
  const [loading, setLoading] = useState(true)

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Get data for the active day
  const dayData = tripData.find((day) => day.day === activeDay)

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

  return (
    <div className="relative h-[600px] w-full bg-stone-100 rounded-lg overflow-hidden">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading destination images...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="relative h-full">
            <img
              src={dayData ? getLocationImage(dayData.to) : "/images/destinations/bc-alberta-route.png"}
              alt={dayData ? `${dayData.to} scenic view` : "BC to Alberta Route"}
              className="w-full h-full object-cover"
            />
            {dayData && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">
                <h3 className="font-medium">
                  Day {dayData.day}: {dayData.title}
                </h3>
                <p className="text-sm">{dayData.date}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col h-full">
            <div className="relative h-1/2">
              <img
                src={dayData ? getLocationImage(dayData.from) : "/images/destinations/rocky-mountain-highway.png"}
                alt={dayData ? `${dayData.from} scenic view` : "Rocky Mountain Highway"}
                className="w-full h-full object-cover"
              />
              {dayData && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">
                  <h3 className="font-medium">Starting Point: {dayData.from}</h3>
                  <p className="text-sm">Departure: {dayData.departureTime}</p>
                </div>
              )}
            </div>
            <div className="relative h-1/2">
              <img
                src="/images/destinations/mountain-valley-vista.png"
                alt="Mountain Valley Vista"
                className="w-full h-full object-cover"
              />
              {dayData && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">
                  <h3 className="font-medium">Route Information</h3>
                  <p className="text-sm">
                    Distance: {dayData.distance} km • Drive Time: {dayData.driveTime}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
