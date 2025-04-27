"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { tripData } from "@/lib/trip-data"
import { hikesData } from "@/lib/hikes-data"
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  MapPin,
  Car,
  Tent,
  Building,
  Home,
  Ruler,
  TrendingUp,
  ExternalLink,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import PhotoGallery from "@/components/photo-gallery"
import DailyTimeline from "@/components/daily-timeline"
import DayPackingList from "@/components/day-packing-list"
import WeatherForecast from "@/components/weather-forecast"
import { useLanguage } from "@/lib/i18n/language-context"
import LanguageComparison from "@/components/language-comparison"
import AnimalGuide from "@/components/animal-guide"

export default function DayDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [dayData, setDayData] = useState(null)
  const [dayHikes, setDayHikes] = useState([])
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    if (params.id) {
      const dayNumber = Number.parseInt(params.id as string)
      const foundDay = tripData.find((day) => day.day === dayNumber)

      if (foundDay) {
        setDayData(foundDay)
        // Find all hikes for this day
        const hikesForDay = hikesData.filter((hike) => hike.day === dayNumber)
        setDayHikes(hikesForDay)
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

  // Get location-specific images based on the destination
  const getLocationImages = (location) => {
    if (location.includes("Banff")) {
      return [
        {
          src: "/images/destinations/banff-lake-louise.png",
          alt: `${location} - Lake Louise`,
          caption: `Beautiful views of Lake Louise in ${location}`,
        },
        {
          src: "/images/hikes/johnston-canyon-trail.png",
          alt: `${location} - Johnston Canyon`,
          caption: `Johnston Canyon in ${location}`,
        },
        {
          src: "/images/hikes/lake-agnes-tea-house.png",
          alt: `${location} - Lake Agnes`,
          caption: `Lake Agnes Tea House in ${location}`,
        },
        {
          src: "/images/hikes/bow-falls-viewpoint.png",
          alt: `${location} - Bow Falls`,
          caption: `Bow Falls in ${location}`,
        },
        {
          src: "/images/hikes/sunshine-meadows.png",
          alt: `${location} - Sunshine Meadows`,
          caption: `Sunshine Meadows in ${location}`,
        },
      ]
    } else if (location.includes("Kelowna")) {
      return [
        {
          src: "/images/destinations/kelowna-lake.png",
          alt: `${location} - Okanagan Lake`,
          caption: `Okanagan Lake in ${location}`,
        },
        {
          src: "/images/hikes/knox-mountain-park.png",
          alt: `${location} - Knox Mountain`,
          caption: `Knox Mountain in ${location}`,
        },
        {
          src: "/images/accommodations/kelowna-house.png",
          alt: `${location} - Residential Area`,
          caption: `Residential area in ${location}`,
        },
        {
          src: "/images/destinations/kelowna-lake.png",
          alt: `${location} - Lake View`,
          caption: `Lake views in ${location}`,
        },
        {
          src: "/images/destinations/kelowna-lake.png",
          alt: `${location} - Wine Country`,
          caption: `Wine country around ${location}`,
        },
      ]
    } else if (location.includes("Revelstoke")) {
      return [
        {
          src: "/images/destinations/revelstoke-mountain.png",
          alt: `${location} - Mountain View`,
          caption: `Mountain views in ${location}`,
        },
        {
          src: "/images/hikes/inspiration-woods-trail.png",
          alt: `${location} - Inspiration Woods`,
          caption: `Inspiration Woods in ${location}`,
        },
        {
          src: "/images/accommodations/revelstoke-airbnb.png",
          alt: `${location} - Accommodation`,
          caption: `Accommodation in ${location}`,
        },
        {
          src: "/images/destinations/revelstoke-mountain.png",
          alt: `${location} - Scenic View`,
          caption: `Scenic views around ${location}`,
        },
        {
          src: "/images/hikes/inspiration-woods-trail.png",
          alt: `${location} - Forest Trail`,
          caption: `Forest trails near ${location}`,
        },
      ]
    } else if (location.includes("Vancouver")) {
      return [
        {
          src: "/images/destinations/vancouver-skyline.png",
          alt: `${location} - Skyline`,
          caption: `Skyline of ${location}`,
        },
        {
          src: "/images/destinations/vancouver-skyline.png",
          alt: `${location} - Downtown`,
          caption: `Downtown ${location}`,
        },
        {
          src: "/images/destinations/vancouver-skyline.png",
          alt: `${location} - Harbor`,
          caption: `Harbor view in ${location}`,
        },
        {
          src: "/images/destinations/vancouver-skyline.png",
          alt: `${location} - City View`,
          caption: `City views of ${location}`,
        },
        {
          src: "/images/destinations/vancouver-skyline.png",
          alt: `${location} - Urban Landscape`,
          caption: `Urban landscape of ${location}`,
        },
      ]
    } else if (location.includes("Juniper Beach")) {
      return [
        {
          src: "/images/destinations/juniper-beach.png",
          alt: `${location} - Beach View`,
          caption: `Beach views at ${location}`,
        },
        {
          src: "/images/hikes/thompson-river-viewpoint-juniper-bluff-trail.png",
          alt: `${location} - River View`,
          caption: `Thompson River views near ${location}`,
        },
        {
          src: "/images/accommodations/juniper-beach-campsite.png",
          alt: `${location} - Campsite`,
          caption: `Campsite at ${location}`,
        },
        {
          src: "/images/destinations/juniper-beach.png",
          alt: `${location} - Scenic View`,
          caption: `Scenic views around ${location}`,
        },
        {
          src: "/images/destinations/juniper-beach.png",
          alt: `${location} - Trail View`,
          caption: `Trail views at ${location}`,
        },
      ]
    } else if (location.includes("Golden")) {
      return [
        {
          src: "/images/destinations/golden-trail.png",
          alt: `${location} - Trail View`,
          caption: `Trail views in ${location}`,
        },
        {
          src: "/images/hikes/golden-rotary-trail.png",
          alt: `${location} - Rotary Trail`,
          caption: `Rotary Trail in ${location}`,
        },
        {
          src: "/images/destinations/golden-trail.png",
          alt: `${location} - River View`,
          caption: `River views in ${location}`,
        },
        {
          src: "/images/destinations/golden-trail.png",
          alt: `${location} - Mountain View`,
          caption: `Mountain views near ${location}`,
        },
        {
          src: "/images/destinations/golden-trail.png",
          alt: `${location} - Forest View`,
          caption: `Forest views around ${location}`,
        },
      ]
    } else {
      // Default images for other locations
      return [
        {
          src: "/images/destinations/rocky-mountain-highway.png",
          alt: `${location} - Scenic View`,
          caption: `Scenic views around ${location}`,
        },
        {
          src: "/images/destinations/mountain-valley-vista.png",
          alt: `${location} - Valley View`,
          caption: `Valley views near ${location}`,
        },
        {
          src: "/images/destinations/bc-alberta-route.png",
          alt: `${location} - Highway View`,
          caption: `Highway views in ${location}`,
        },
        {
          src: "/images/destinations/rocky-mountain-highway.png",
          alt: `${location} - Mountain View`,
          caption: `Mountain views near ${location}`,
        },
        {
          src: "/images/destinations/mountain-valley-vista.png",
          alt: `${location} - Landscape View`,
          caption: `Landscape views around ${location}`,
        },
      ]
    }
  }

  // Location photos
  const locationPhotos = getLocationImages(dayData.to)

  // Route photos
  const routePhotos = [
    {
      src: "/images/destinations/rocky-mountain-highway.png",
      alt: `Route from ${dayData.from} to ${dayData.to} - Highway View`,
      caption: `Highway between ${dayData.from} and ${dayData.to}`,
    },
    {
      src: "/images/destinations/mountain-valley-vista.png",
      alt: `Route from ${dayData.from} to ${dayData.to} - Mountain View`,
      caption: `Mountain views along the route`,
    },
    {
      src: "/images/destinations/bc-alberta-route.png",
      alt: `Route from ${dayData.from} to ${dayData.to} - Scenic View`,
      caption: `Scenic views along the route`,
    },
    {
      src: "/images/hikes/emerald-lake-loop.png",
      alt: `Route from ${dayData.from} to ${dayData.to} - Lake View`,
      caption: `Lakes you'll pass on your journey`,
    },
    {
      src: "/images/hikes/thompson-river-viewpoint-juniper-bluff-trail.png",
      alt: `Route from ${dayData.from} to ${dayData.to} - River View`,
      caption: `Rivers along the route`,
    },
  ]

  // Accommodation photos
  const accommodationPhotos = dayData.accommodation
    ? [
        {
          src:
            dayData.accommodationType === "camping"
              ? "/images/accommodations/juniper-beach-campsite.png"
              : dayData.accommodationType === "hotel"
                ? "/images/accommodations/moxy-banff-hotel.png"
                : dayData.accommodationType === "family"
                  ? "/images/accommodations/kelowna-house.png"
                  : "/images/accommodations/revelstoke-airbnb.png",
          alt: `${dayData.accommodation} - Exterior`,
          caption: `${dayData.accommodation} - Exterior View`,
        },
        {
          src:
            dayData.accommodationType === "camping"
              ? "/images/accommodations/juniper-beach-campsite.png"
              : dayData.accommodationType === "hotel"
                ? "/images/accommodations/moxy-banff-hotel.png"
                : dayData.accommodationType === "family"
                  ? "/images/accommodations/kelowna-house.png"
                  : "/images/accommodations/revelstoke-airbnb.png",
          alt: `${dayData.accommodation} - Another View`,
          caption: `${dayData.accommodation} - Another View`,
        },
        {
          src:
            dayData.accommodationType === "camping"
              ? "/images/accommodations/juniper-beach-campsite.png"
              : dayData.accommodationType === "hotel"
                ? "/images/accommodations/moxy-banff-hotel.png"
                : dayData.accommodationType === "family"
                  ? "/images/accommodations/kelowna-house.png"
                  : "/images/accommodations/revelstoke-airbnb.png",
          alt: `${dayData.accommodation} - Surroundings`,
          caption: `${dayData.accommodation} - Surroundings`,
        },
        {
          src: dayData.to.includes("Banff")
            ? "/images/destinations/banff-lake-louise.png"
            : dayData.to.includes("Kelowna")
              ? "/images/destinations/kelowna-lake.png"
              : dayData.to.includes("Revelstoke")
                ? "/images/destinations/revelstoke-mountain.png"
                : "/images/destinations/juniper-beach.png",
          alt: `${dayData.accommodation} - Area View`,
          caption: `${dayData.accommodation} - Area View`,
        },
        {
          src: dayData.to.includes("Banff")
            ? "/images/hikes/johnston-canyon-trail.png"
            : dayData.to.includes("Kelowna")
              ? "/images/hikes/knox-mountain-park.png"
              : dayData.to.includes("Revelstoke")
                ? "/images/hikes/inspiration-woods-trail.png"
                : "/images/hikes/thompson-river-viewpoint-juniper-bluff-trail.png",
          alt: `${dayData.accommodation} - Nearby Attractions`,
          caption: `${dayData.accommodation} - Nearby Attractions`,
        },
      ]
    : []

  const prevDay = dayData.day > 1 ? dayData.day - 1 : null
  const nextDay = dayData.day < 9 ? dayData.day + 1 : null

  // Generate timeline events
  const timelineEvents = []

  // Add departure
  timelineEvents.push({
    time: dayData.departureTime,
    title: `Depart from ${dayData.from}`,
    description: `Start your journey from ${dayData.from} to ${dayData.to}`,
    icon: <Car className="h-4 w-4" />,
  })

  // Add estimated arrival (rough calculation)
  const departureHour = Number.parseInt(dayData.departureTime.split(":")[0])
  const driveTimeHours = Number.parseInt(dayData.driveTime.replace(/[^0-9]/g, "")) || 3
  const arrivalHour = (departureHour + driveTimeHours) % 24
  const arrivalTime = `${arrivalHour}:${departureHour + driveTimeHours > 24 ? "00" : "00"} ${arrivalHour >= 12 ? "PM" : "AM"}`

  // Add hikes if any
  if (dayHikes.length > 0) {
    dayHikes.forEach((hike, index) => {
      const hikeHour = (departureHour + driveTimeHours + 1 + index) % 24
      const hikeTime = `${hikeHour}:00 ${hikeHour >= 12 ? "PM" : "AM"}`

      timelineEvents.push({
        time: hikeTime,
        title: hike.name,
        description: `${hike.distance} hike - ${hike.difficulty} difficulty - ${hike.duration}`,
        icon: <MapPin className="h-4 w-4" />,
      })
    })
  }

  // Add arrival at accommodation
  timelineEvents.push({
    time: arrivalTime,
    title: `Arrive at ${dayData.to}`,
    description: dayData.accommodation ? `Check in at ${dayData.accommodation}` : `Arrive at ${dayData.to}`,
    icon:
      dayData.accommodationType === "camping" ? (
        <Tent className="h-4 w-4" />
      ) : dayData.accommodationType === "hotel" ? (
        <Building className="h-4 w-4" />
      ) : (
        <Home className="h-4 w-4" />
      ),
  })

  return (
    <main className="container py-8">
      <Button onClick={() => router.push("/itinerary")} variant="outline" className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Itinerary
      </Button>

      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10" />
        <img
          src="/images/destinations/mountain-valley-vista.png"
          alt={`Day ${dayData.day} - ${dayData.title}`}
          className="w-full h-[40vh] object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
          <Badge className="mb-2 w-fit bg-emerald-600">Day {dayData.day}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{dayData.title}</h1>
          <p className="text-white/90 text-lg">{dayData.date}</p>

          <div className="flex items-center gap-2 mt-4">
            <Badge variant="outline" className="bg-white/20 text-white border-white/40">
              <MapPin className="h-3 w-3 mr-1" />
              {dayData.from}
            </Badge>
            <ArrowRight className="h-3 w-3 text-white/70" />
            <Badge variant="outline" className="bg-white/20 text-white border-white/40">
              <MapPin className="h-3 w-3 mr-1" />
              {dayData.to}
            </Badge>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Day Overview */}
          <Card>
            <CardHeader>
              <CardTitle>{t("dayOverview")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center justify-center p-4 bg-stone-50 rounded-lg">
                  <Car className="h-6 w-6 text-emerald-600 mb-2" />
                  <p className="text-sm text-muted-foreground">{t("distance")}</p>
                  <p className="font-medium">{dayData.distance} km</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-stone-50 rounded-lg">
                  <Clock className="h-6 w-6 text-emerald-600 mb-2" />
                  <p className="text-sm text-muted-foreground">{t("driveTime")}</p>
                  <p className="font-medium">{dayData.driveTime}</p>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-stone-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-emerald-600 mb-2" />
                  <p className="text-sm text-muted-foreground">{t("departure")}</p>
                  <p className="font-medium">{dayData.departureTime}</p>
                </div>
              </div>

              <div className="prose max-w-none">
                <p>
                  On Day {dayData.day}, you'll be traveling from {dayData.from} to {dayData.to}, covering approximately{" "}
                  {dayData.distance} km. The drive is expected to take {dayData.driveTime}, departing at{" "}
                  {dayData.departureTime}.
                </p>

                {dayData.notes && <p>{dayData.notes}</p>}
              </div>

              {/* Destination Images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={getLocationImages(dayData.from)[0].src || "/placeholder.svg"}
                    alt={`${dayData.from} - Starting Point`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="bg-stone-50 p-2 text-center">
                    <p className="text-sm font-medium">{dayData.from}</p>
                    <p className="text-xs text-muted-foreground">Starting Point</p>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={getLocationImages(dayData.to)[0].src || "/placeholder.svg"}
                    alt={`${dayData.to} - Destination`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="bg-stone-50 p-2 text-center">
                    <p className="text-sm font-medium">{dayData.to}</p>
                    <p className="text-xs text-muted-foreground">Destination</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Daily Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>{t("dailySchedule")}</CardTitle>
            </CardHeader>
            <CardContent>
              <DailyTimeline events={timelineEvents} />
            </CardContent>
          </Card>

          {/* Photo Galleries */}
          <Tabs defaultValue="route">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="route">{t("routePhotos")}</TabsTrigger>
              <TabsTrigger value="destination">{t("destinationPhotos")}</TabsTrigger>
              {dayData.accommodation && <TabsTrigger value="accommodation">{t("accommodation")}</TabsTrigger>}
              <TabsTrigger value="wildlife">Wildlife</TabsTrigger>
            </TabsList>
            <TabsContent value="route" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Route from {dayData.from} to {dayData.to}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <PhotoGallery photos={routePhotos} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="destination" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>{dayData.to} Photos</CardTitle>
                </CardHeader>
                <CardContent>
                  <PhotoGallery photos={locationPhotos} />
                </CardContent>
              </Card>
            </TabsContent>
            {dayData.accommodation && (
              <TabsContent value="accommodation" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{dayData.accommodation}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PhotoGallery photos={accommodationPhotos} />
                  </CardContent>
                </Card>
              </TabsContent>
            )}
            <TabsContent value="wildlife" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Wildlife in {dayData.to}</CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimalGuide />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Language Comparison Card */}
          <LanguageComparison />

          {/* Hikes Section */}
          {dayHikes.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">{t("hikesActivities")}</h2>
              <div className="space-y-6">
                {dayHikes.map((hike, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative h-64">
                      <img
                        src={hike.imageUrl || "/placeholder.svg"}
                        alt={hike.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                        <Badge
                          className={
                            hike.status === "confirmed" ? "bg-emerald-600 mb-2 w-fit" : "bg-amber-500 mb-2 w-fit"
                          }
                        >
                          {hike.status === "confirmed" ? t("confirmed") : t("optional")}
                        </Badge>
                        <h3 className="text-xl font-bold text-white">{hike.name}</h3>
                        <p className="text-white/80">{hike.location}</p>
                      </div>
                    </div>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <Ruler className="h-5 w-5 mr-2 text-emerald-600" />
                          <div>
                            <p className="text-sm text-muted-foreground">{t("distance")}</p>
                            <p className="font-medium">{hike.distance}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="h-5 w-5 mr-2 text-emerald-600" />
                          <div>
                            <p className="text-sm text-muted-foreground">Difficulty</p>
                            <p className="font-medium">{hike.difficulty}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-emerald-600" />
                          <div>
                            <p className="text-sm text-muted-foreground">Duration</p>
                            <p className="font-medium">{hike.duration}</p>
                          </div>
                        </div>
                      </div>

                      <p className="mb-4">{hike.description}</p>

                      {hike.elevationGain && (
                        <div className="mb-4">
                          <span className="font-medium">Elevation Gain:</span> {hike.elevationGain}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2">
                        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                          <Link href={`/hikes/${hike.id}`}>View Hike Details</Link>
                        </Button>
                        {hike.trailLink && (
                          <Button asChild variant="outline">
                            <a href={hike.trailLink} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Official Trail Info
                            </a>
                          </Button>
                        )}
                        <Button asChild variant="outline">
                          <a
                            href={`https://www.alltrails.com/search?q=${encodeURIComponent(hike.name)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View on AllTrails
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Alternative Activities */}
          <Card>
            <CardHeader>
              <CardTitle>{t("alternativeActivities")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="rounded-lg overflow-hidden border">
                  <img
                    src={
                      dayData.to.includes("Banff")
                        ? "/images/destinations/banff-lake-louise.png"
                        : dayData.to.includes("Kelowna")
                          ? "/images/destinations/kelowna-lake.png"
                          : dayData.to.includes("Revelstoke")
                            ? "/images/destinations/revelstoke-mountain.png"
                            : "/images/destinations/juniper-beach.png"
                    }
                    alt="Local dining options"
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium mb-2">{t("localDining")}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t("diningDescription")} {dayData.to}.
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <a
                        href={`https://www.tripadvisor.com/Restaurants-g${dayData.to.replace(/\s+/g, "_")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {t("findRestaurants")}
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg overflow-hidden border">
                  <img
                    src={
                      dayData.to.includes("Banff")
                        ? "/images/hikes/lake-agnes-tea-house.png"
                        : dayData.to.includes("Kelowna")
                          ? "/images/hikes/knox-mountain-park.png"
                          : dayData.to.includes("Revelstoke")
                            ? "/images/hikes/inspiration-woods-trail.png"
                            : "/images/hikes/thompson-river-viewpoint-juniper-bluff-trail.png"
                    }
                    alt="Cultural attractions"
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium mb-2">{t("culturalAttractions")}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t("attractionsDescription")} {dayData.to}.
                    </p>
                    <Button asChild variant="outline" size="sm">
                      <a
                        href={`https://www.tripadvisor.com/Attractions-g${dayData.to.replace(/\s+/g, "_")}-Activities-c49`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        {t("findAttractions")}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Weather Forecast */}
          <WeatherForecast location={dayData.to} date={dayData.date} />

          {/* Accommodation Card */}
          {dayData.accommodation && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {dayData.accommodationType === "camping" && <Tent className="h-5 w-5 mr-2 text-emerald-600" />}
                  {dayData.accommodationType === "hotel" && <Building className="h-5 w-5 mr-2 text-emerald-600" />}
                  {dayData.accommodationType === "family" && <Home className="h-5 w-5 mr-2 text-emerald-600" />}
                  {t("accommodation")}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={
                      dayData.accommodationType === "camping"
                        ? "/images/accommodations/juniper-beach-campsite.png"
                        : dayData.accommodationType === "hotel"
                          ? "/images/accommodations/moxy-banff-hotel.png"
                          : dayData.accommodationType === "family"
                            ? "/images/accommodations/kelowna-house.png"
                            : "/images/accommodations/revelstoke-airbnb.png"
                    }
                    alt={dayData.accommodation}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{dayData.accommodation}</h3>
                  {dayData.accommodationDetails && (
                    <p className="text-sm text-muted-foreground">{dayData.accommodationDetails}</p>
                  )}
                </div>
                {dayData.accommodationType === "hotel" && (
                  <Button asChild variant="outline" className="w-full">
                    <a
                      href="https://www.marriott.com/en-us/hotels/yycox-moxy-banff/overview/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Hotel Website
                    </a>
                  </Button>
                )}
                {dayData.accommodationType === "camping" && (
                  <Button asChild variant="outline" className="w-full">
                    <a href="https://bcparks.ca/explore/parkpgs/juniper_bch/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Park Website
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Day-specific Packing List */}
          <DayPackingList day={dayData.day} />

          {/* Navigation */}
          <Card>
            <CardHeader>
              <CardTitle>{t("dayNavigation")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between">
                {prevDay ? (
                  <Button asChild variant="outline">
                    <Link href={`/day/${prevDay}`}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> {t("previousDay")}
                    </Link>
                  </Button>
                ) : (
                  <div></div>
                )}

                {nextDay ? (
                  <Button asChild variant="outline">
                    <Link href={`/day/${nextDay}`}>
                      {t("nextDay")} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <div></div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Map Link */}
          <Card>
            <CardContent className="p-6">
              <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700">
                <Link href={`/map?day=${dayData.day}`}>
                  <MapPin className="mr-2 h-4 w-4" />
                  {t("viewOnMap")} {dayData.day}
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
