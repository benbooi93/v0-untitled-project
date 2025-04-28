"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { hikesData } from "@/lib/hikes-data"
import { ArrowLeft, MapPin, Calendar, Clock, Ruler, TrendingUp, ExternalLink } from "lucide-react"
import PhotoGallery from "@/components/photo-gallery"
import ElevationChart from "@/components/elevation-chart"

export default function HikeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [hike, setHike] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      const hikeId = Number.parseInt(params.id as string)
      const foundHike = hikesData.find((h) => h.id === hikeId)

      if (foundHike) {
        setHike(foundHike)
      }

      setLoading(false)
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="container py-8 flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin h-8 w-8 border-4 border-emerald-600 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!hike) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Hike Not Found</h1>
        <p>Sorry, we couldn't find the hike you're looking for.</p>
        <Button onClick={() => router.push("/hikes")} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Hikes
        </Button>
      </div>
    )
  }

  // Mock elevation data
  const elevationData = [
    { distance: 0, elevation: 1200, label: "Start" },
    { distance: 1, elevation: 1300 },
    { distance: 2, elevation: 1450 },
    { distance: 3, elevation: 1600, label: "Viewpoint" },
    { distance: 4, elevation: 1550 },
    { distance: 5, elevation: 1400 },
    { distance: 6, elevation: 1350 },
    { distance: 7, elevation: 1200, label: "End" },
  ]

  // Mock photo gallery - Use actual image + fallbacks
  const photos = [
    {
      src: hike.imageUrl || "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", // Actual hike image
      alt: `${hike.name} - Main view`,
      caption: `${hike.name} - Scenic viewpoint`,
    },
    // Use the same image or related fallbacks for the rest of the gallery slots
    {
      src: hike.imageUrl || "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      alt: `${hike.name} - Trail path`,
      caption: "Trail path through the forest",
    },
    {
      src: hike.imageUrl || "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      alt: `${hike.name} - Mountain vista`,
      caption: "Mountain vista from the trail",
    },
    {
      src: hike.imageUrl || "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      alt: `${hike.name} - Wildlife`,
      caption: "Local wildlife spotted on the trail",
    },
    {
      src: hike.imageUrl || "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      alt: `${hike.name} - Trail marker`,
      caption: "Trail marker and signage",
    },
  ]

  return (
    <main className="container py-8">
      <Button onClick={() => router.push("/hikes")} variant="outline" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Hikes
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold">{hike.name}</h1>
              <Badge className={hike.status === "confirmed" ? "bg-emerald-600" : "bg-amber-500"}>
                {hike.status === "confirmed" ? "Confirmed" : "Optional"}
              </Badge>
            </div>
            <div className="flex items-center text-muted-foreground mb-6">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{hike.location}</span>
              <span className="mx-2">•</span>
              <Calendar className="h-4 w-4 mr-1" />
              <span>Day {hike.day}</span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="flex items-center p-4">
                  <Ruler className="h-5 w-5 mr-3 text-emerald-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Distance</p>
                    <p className="font-medium">{hike.distance}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center p-4">
                  <TrendingUp className="h-5 w-5 mr-3 text-emerald-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Difficulty</p>
                    <p className="font-medium">{hike.difficulty}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center p-4">
                  <Clock className="h-5 w-5 mr-3 text-emerald-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{hike.duration}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="prose max-w-none">
              <h2>Trail Description</h2>
              <p>{hike.description}</p>
              <p>
                This {hike.difficulty.toLowerCase()} trail offers hikers a {hike.distance} journey through diverse
                terrain. The hike typically takes {hike.duration} to complete, making it perfect for a
                {hike.duration.includes("hr") && Number.parseInt(hike.duration) > 3 ? " full day" : " half-day"}{" "}
                adventure.
              </p>
              <p>
                The trail features beautiful views of the surrounding landscape, with opportunities to spot local
                wildlife and native plant species. Hikers should be prepared with appropriate footwear, water, and
                weather-appropriate clothing.
              </p>

              <h2>Elevation Profile</h2>
            </div>

            <div className="mt-4 mb-8">
              <ElevationChart
                data={elevationData}
                maxDistance={7}
                maxElevation={2000}
                className="border rounded-lg p-4 bg-white"
              />
              <p className="text-xs text-center text-muted-foreground mt-2">
                Elevation gain: {hike.elevationGain || "350m"}
              </p>
            </div>

            <div className="prose max-w-none">
              <h2>Trail Photos</h2>
            </div>
            <PhotoGallery photos={photos} className="mt-4" />
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Trail Information</h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Best Time to Visit</h3>
                  <p>May through October</p>
                </div>

                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Trail Type</h3>
                  <p>{hike.distance.includes("loop") ? "Loop" : "Out & Back"}</p>
                </div>

                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Elevation Gain</h3>
                  <p>{hike.elevationGain || "350m"}</p>
                </div>

                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Trail Surface</h3>
                  <p>Dirt, Rock, Forest Floor</p>
                </div>

                <div>
                  <h3 className="font-medium text-sm text-muted-foreground">Facilities</h3>
                  <p>Parking, Restrooms at Trailhead</p>
                </div>

                <div className="pt-4 border-t">
                  <Button asChild className="w-full">
                    <a href={hike.trailLink || "https://www.alltrails.com/"} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View on AllTrails
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Weather</h2>
              <div className="text-center p-4 bg-stone-50 rounded-lg">
                <h3 className="font-medium">{hike.location}</h3>
                <div className="flex justify-center items-center gap-4 my-4">
                  <div className="text-4xl font-light">15°C</div>
                  <div className="text-left">
                    <p className="text-sm">Partly Cloudy</p>
                    <p className="text-xs text-muted-foreground">10% chance of rain</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Weather data for {hike.date || "trip day"}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Nearby Hikes</h2>
              <div className="space-y-3">
                {hikesData
                  .filter((h) => h.id !== hike.id && h.day === hike.day)
                  .slice(0, 3)
                  .map((nearbyHike) => (
                    <div key={nearbyHike.id} className="flex items-center gap-3 p-2 hover:bg-stone-50 rounded-md">
                      <div className="h-10 w-10 rounded-md overflow-hidden">
                        <img
                          src={nearbyHike.imageUrl || "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"}
                          alt={nearbyHike.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-sm">{nearbyHike.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {nearbyHike.distance} • {nearbyHike.difficulty}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
