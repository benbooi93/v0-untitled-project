"use client"

import { useEffect, useRef, useState } from "react"
import { Loader } from "@googlemaps/js-api-loader"
import { tripData } from "@/lib/trip-data"
import { hikesData } from "@/lib/hikes-data"

// This would normally come from an environment variable
const GOOGLE_MAPS_API_KEY = "YOUR_API_KEY"

interface GoogleMapsProps {
  activeDay?: number
  className?: string
  showAllDays?: boolean
  center?: { lat: number; lng: number }
  zoom?: number
}

export default function GoogleMaps({
  activeDay = 0,
  className = "",
  showAllDays = false,
  center,
  zoom = 7,
}: GoogleMapsProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])
  const [routes, setRoutes] = useState<google.maps.Polyline[]>([])
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow | null>(null)

  // Define coordinates for each location
  const locationCoordinates = {
    Vancouver: { lat: 49.2827, lng: -123.1207 },
    "Juniper Beach": { lat: 50.752, lng: -121.5801 },
    Revelstoke: { lat: 50.9981, lng: -118.1957 },
    Banff: { lat: 51.1784, lng: -115.5708 },
    Golden: { lat: 51.2984, lng: -116.9642 },
    Kelowna: { lat: 49.888, lng: -119.496 },
    // Add coordinates for hiking trails
    "Johnston Canyon": { lat: 51.2454, lng: -115.8367 },
    "Lake Agnes Tea House": { lat: 51.4134, lng: -116.2398 },
    "Tunnel Mountain": { lat: 51.1785, lng: -115.5513 },
    "Bow Falls Viewpoint": { lat: 51.167, lng: -115.5587 },
    "Emerald Lake": { lat: 51.4432, lng: -116.5284 },
    "Knox Mountain Park": { lat: 49.906, lng: -119.4871 },
    "Joffre Lakes": { lat: 50.3696, lng: -122.4966 },
  }

  // Load Google Maps API
  useEffect(() => {
    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: "weekly",
      libraries: ["places"],
    })

    loader
      .load()
      .then((google) => {
        if (mapRef.current) {
          const defaultCenter = center || locationCoordinates["Vancouver"]
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: defaultCenter,
            zoom: zoom,
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            mapTypeControl: true,
            streetViewControl: false,
            fullscreenControl: true,
            zoomControl: true,
            styles: [
              {
                featureType: "poi.park",
                elementType: "geometry.fill",
                stylers: [{ color: "#c8e6c9" }],
              },
              {
                featureType: "water",
                elementType: "geometry.fill",
                stylers: [{ color: "#bbdefb" }],
              },
              {
                featureType: "landscape.natural",
                elementType: "geometry.fill",
                stylers: [{ color: "#e8f5e9" }],
              },
            ],
          })

          setMap(mapInstance)
          setInfoWindow(new google.maps.InfoWindow())
        }
      })
      .catch((e) => {
        console.error("Error loading Google Maps API:", e)
      })
  }, [center, zoom])

  // Add markers and routes when map is loaded and activeDay changes
  useEffect(() => {
    if (!map || !infoWindow) return

    // Clear existing markers and routes
    markers.forEach((marker) => marker.setMap(null))
    routes.forEach((route) => route.setMap(null))
    setMarkers([])
    setRoutes([])

    const newMarkers: google.maps.Marker[] = []
    const newRoutes: google.maps.Polyline[] = []

    // Filter trip data based on activeDay
    const filteredTripData = showAllDays ? tripData : tripData.filter((day) => activeDay === 0 || day.day === activeDay)

    // Add markers and routes for each day
    filteredTripData.forEach((day) => {
      const fromCoords = locationCoordinates[day.from]
      const toCoords = locationCoordinates[day.to]

      if (fromCoords) {
        const fromMarker = new google.maps.Marker({
          position: fromCoords,
          map: map,
          title: day.from,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
            scaledSize: new google.maps.Size(32, 32),
          },
        })

        fromMarker.addListener("click", () => {
          infoWindow.setContent(`
            <div>
              <h3 style="font-weight: bold; margin-bottom: 5px;">${day.from}</h3>
              <p>Day ${day.day} - ${day.date}</p>
              <p>Departure: ${day.departureTime}</p>
            </div>
          `)
          infoWindow.open(map, fromMarker)
        })

        newMarkers.push(fromMarker)
      }

      if (toCoords) {
        const toMarker = new google.maps.Marker({
          position: toCoords,
          map: map,
          title: day.to,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            scaledSize: new google.maps.Size(32, 32),
          },
        })

        toMarker.addListener("click", () => {
          infoWindow.setContent(`
            <div>
              <h3 style="font-weight: bold; margin-bottom: 5px;">${day.to}</h3>
              <p>Day ${day.day} - ${day.date}</p>
              ${
                day.accommodation
                  ? `<p>Accommodation: ${day.accommodation}</p>`
                  : `<p>No accommodation (returning home)</p>`
              }
            </div>
          `)
          infoWindow.open(map, toMarker)
        })

        newMarkers.push(toMarker)
      }

      // Draw route between from and to
      if (fromCoords && toCoords) {
        const routePath = new google.maps.Polyline({
          path: [fromCoords, toCoords],
          geodesic: true,
          strokeColor: day.day === activeDay ? "#059669" : "#9CA3AF",
          strokeOpacity: 1.0,
          strokeWeight: 3,
        })

        routePath.setMap(map)
        newRoutes.push(routePath)
      }
    })

    // Add hiking trail markers if activeDay is set
    if (activeDay > 0) {
      const dayHikes = hikesData.filter((hike) => hike.day === activeDay)

      dayHikes.forEach((hike) => {
        const hikeLocation = hike.location
        let hikeCoords = null

        // Try to find coordinates for the hike location
        Object.entries(locationCoordinates).forEach(([name, coords]) => {
          if (hikeLocation.includes(name)) {
            hikeCoords = coords
          }
        })

        // If we have specific coordinates for this hike, use those instead
        if (locationCoordinates[hike.name]) {
          hikeCoords = locationCoordinates[hike.name]
        }

        if (hikeCoords) {
          // Add a small random offset to prevent markers from overlapping
          const lat = hikeCoords.lat + (Math.random() - 0.5) * 0.01
          const lng = hikeCoords.lng + (Math.random() - 0.5) * 0.01

          const hikeMarker = new google.maps.Marker({
            position: { lat, lng },
            map: map,
            title: hike.name,
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
              scaledSize: new google.maps.Size(32, 32),
            },
          })

          hikeMarker.addListener("click", () => {
            infoWindow.setContent(`
              <div>
                <h3 style="font-weight: bold; margin-bottom: 5px;">${hike.name}</h3>
                <p>${hike.location}</p>
                <p>${hike.distance} - ${hike.difficulty}</p>
                <p>${hike.duration}</p>
              </div>
            `)
            infoWindow.open(map, hikeMarker)
          })

          newMarkers.push(hikeMarker)
        }
      })
    }

    setMarkers(newMarkers)
    setRoutes(newRoutes)

    // Center map on active day if specified
    if (activeDay > 0 && !showAllDays) {
      const activeTrip = tripData.find((day) => day.day === activeDay)
      if (activeTrip) {
        const toCoords = locationCoordinates[activeTrip.to]
        if (toCoords) {
          map.setCenter(toCoords)
          map.setZoom(9)
        }
      }
    } else if (showAllDays) {
      // Fit bounds to show all markers
      const bounds = new google.maps.LatLngBounds()
      newMarkers.forEach((marker) => {
        bounds.extend(marker.getPosition()!)
      })
      map.fitBounds(bounds)
    }
  }, [map, infoWindow, activeDay, showAllDays])

  return (
    <div className={`relative h-[600px] w-full rounded-lg overflow-hidden ${className}`}>
      <div ref={mapRef} className="h-full w-full" />

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-lg shadow-md z-10">
        <h3 className="text-sm font-medium mb-2">Map Legend</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-600"></div>
            <span className="text-xs">Current Day Route</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gray-400"></div>
            <span className="text-xs">Other Days</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <span className="text-xs">Starting Point</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span className="text-xs">Destination</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-xs">Hiking Trail</span>
          </div>
        </div>
      </div>

      {/* Day Indicator */}
      {activeDay > 0 && (
        <div className="absolute top-4 left-4 bg-white/90 px-3 py-2 rounded-lg shadow-md z-10">
          <span className="font-medium text-sm">Day {activeDay}</span>
        </div>
      )}
    </div>
  )
}
