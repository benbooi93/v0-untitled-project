"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { tripData } from "@/lib/trip-data"
import { ArrowLeft, ArrowRight, Clock, MapPin, Car, Tent, Building, Home, Ruler, TrendingUp } from "lucide-react"
import Link from "next/link"
import PhotoGallery from "@/components/photo-gallery"
import WeatherWidget from "@/components/weather-widget"

export default function DayDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [dayData, setDayData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.day) {
      const dayNumber = Number.parseInt(params.day as string)
      const foundDay = tripData.find((day) => day.day === dayNumber)

      if (foundDay) {
        setDayData(foundDay)
      }

      setLoading(false)
    }
  }, [params.day])

  if (loading) {
    return (
      <div className="container py-8 flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin h-8 w-8 border-4 border-emerald-600 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!dayData) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Day Not Found</h1>
        <p>Sorry, we couldn't find the day you're looking for.</p>
        <Button onClick={() => router.push("/itinerary")} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Itinerary
        </Button>
      </div>
    )
  }

  // Mock photo gallery
  const photos = [
    {
      src: "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      alt: `Day ${dayData.day} ${dayData.title} scenic view 1`,
      caption: `Day ${dayData.day} - ${dayData.title}`,
    },
    {
      src: "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      alt: `Day ${dayData.day} ${dayData.title} scenic view 2`,
      caption: "Route scenery",
    },
    {
      src: "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      alt: `Day ${dayData.day} ${dayData.title} scenic view 3`,
      caption: "Destination highlights",
    },
    {
      src: "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      alt: `Day ${dayData.day} ${dayData.title} scenic view 4`,
      caption: "Nearby points of interest",
    },
    {
      src: "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      alt: `Day ${dayData.day} ${dayData.title} scenic view 5`,
      caption: "Accommodation area",
    },
  ]

  const prevDay = dayData.day > 1 ? dayData.day - 1 : null
  const nextDay = dayData.day < 9 ? dayData.day + 1 : null

  return (
    <main className="container py-8">
      <Button onClick={() => router.push("/itinerary")} variant="outline" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Itinerary
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold">
                Day {dayData.day}: {dayData.date}
              </h1>
              <Badge className="bg-emerald-600">{dayData.title}</Badge>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground mb-6">
              <Badge variant="outline" className="bg-stone-50">
                <MapPin className="h-3 w-3 mr-1" />
                {dayData.from}
              </Badge>
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
              <Badge variant="outline" className="bg-stone-50">
                <MapPin className="h-3 w-3 mr-1" />
                {dayData.to}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="flex items-center p-4">
                  <Clock className="h-5 w-5 mr-3 text-emerald-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Departure</p>
                    <p className="font-medium">{dayData.departureTime}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center p-4">
                  <Car className="h-5 w-5 mr-3 text-emerald-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Drive Time</p>
                    <p className="font-medium">{dayData.driveTime}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center p-4">
                  <Ruler className="h-5 w-5 mr-3 text-emerald-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">Distance</p>
                    <p className="font-medium">{dayData.distance} km</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="prose max-w-none">
              <h2>Day Overview</h2>
              <p>
                On Day {dayData.day}, you'll be traveling from {dayData.from} to {dayData.to}, covering approximately{" "}
                {dayData.distance} km. The drive is expected to take {dayData.driveTime}, departing at{" "}
                {dayData.departureTime}.
              </p>

              {dayData.notes && <p>{dayData.notes}</p>}

              <h2>Photos</h2>
            </div>

            <PhotoGallery photos={photos} className="mt-4" />

            {dayData.hikes && dayData.hikes.length > 0 && (
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Hikes & Activities</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {dayData.hikes.map((hike, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle>{hike.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                          <div className="flex items-center">
                            <Ruler className="h-4 w-4 mr-1 text-emerald-600" />
                            {hike.distance}
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="h-4 w-4 mr-1 text-emerald-600" />
                            {hike.difficulty}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-emerald-600" />
                            {hike.duration}
                          </div>
                        </div>

                        <p className="text-sm">{hike.description}</p>

                        <div className="mt-4">
                          <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            <Link href={`/hikes/${index + 1}`}>View Hike Details</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Accommodation</h2>

              {dayData.accommodation ? (
                <div className="space-y-4">
                  <div className="flex items-center">
                    {dayData.accommodationType === "camping" && <Tent className="h-5 w-5 mr-2 text-emerald-600" />}
                    {dayData.accommodationType === "hotel" && <Building className="h-5 w-5 mr-2 text-emerald-600" />}
                    {dayData.accommodationType === "family" && <Home className="h-5 w-5 mr-2 text-emerald-600" />}
                    <h3 className="font-medium">{dayData.accommodation}</h3>
                  </div>

                  {dayData.accommodationDetails && <p className="text-sm">{dayData.accommodationDetails}</p>}

                  <div className="aspect-video rounded-md overflow-hidden">
                    <img
                      src={
                        dayData.accommodationType === "camping"
                          ? "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                          : dayData.accommodationType === "hotel"
                            ? "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                            : dayData.accommodationType === "family"
                              ? "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                              : "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                      }
                      alt={dayData.accommodation}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">No accommodation for this day (returning home).</p>
              )}
            </CardContent>
          </Card>

          <WeatherWidget location={dayData.to} date={dayData.date} />

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Navigation</h2>
              <div className="flex justify-between">
                {prevDay ? (
                  <Button asChild variant="outline">
                    <Link href={`/itinerary/${prevDay}`}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Day {prevDay}
                    </Link>
                  </Button>
                ) : (
                  <div></div>
                )}

                {nextDay ? (
                  <Button asChild variant="outline">
                    <Link href={`/itinerary/${nextDay}`}>
                      Day {nextDay} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <div></div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
