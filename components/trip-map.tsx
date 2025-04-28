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
              src={dayData ? getLocationImage(dayData.to) : "https://images.pexels.com/photos/30480941/pexels-photo-30480941.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}
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
                src={dayData ? getLocationImage(dayData.from) : "https://images.pexels.com/photos/2331528/pexels-photo-2331528.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}
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
                src="https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
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
