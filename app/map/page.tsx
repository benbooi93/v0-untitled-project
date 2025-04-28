"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Clock, ArrowRight, Ruler, TrendingUp } from "lucide-react"
import { tripData } from "@/lib/trip-data"
import WeatherWidget from "@/components/weather-widget"
import TripMap from "@/components/trip-map"
import AnimalGuide from "@/components/animal-guide"

export default function MapPage() {
  const [activeDay, setActiveDay] = useState("1")
  const [activePeriod, setActivePeriod] = useState("1")
  const [activeTab, setActiveTab] = useState("destinations")
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Update active period when day changes
  useEffect(() => {
    const day = Number.parseInt(activeDay)
    if (day >= 1 && day <= 3) setActivePeriod("1")
    else if (day >= 4 && day <= 6) setActivePeriod("4")
    else setActivePeriod("7")
  }, [activeDay])

  const dayData = tripData.find((day) => day.day === Number.parseInt(activeDay))

  // --- Map Static API Configuration ---
  const GOOGLE_MAPS_API_KEY = "AIzaSyBslySK8ONRuisOJ53TVsuRpiVvXmTzVyE"; // <<<--- API key added
  const mapWidth = 800;
  const mapHeight = 400;
  const routePath = "path=color:0x0000ff|weight:4|" +
                    "Vancouver,BC|" +
                    "Juniper Beach Provincial Park,BC|" +
                    "Kamloops,BC|" +
                    "Revelstoke,BC|" +
                    "Golden,BC|" +
                    "Banff,AB";
  const markers = "markers=color:green|label:S|Vancouver,BC|" +
                  "markers=color:red|label:E|Banff,AB|" +
                  "markers=color:blue|size:tiny|Juniper Beach Provincial Park,BC|Kamloops,BC|Revelstoke,BC|Golden,BC";

  const mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?size=${mapWidth}x${mapHeight}&maptype=roadmap&${routePath}&${markers}&key=${GOOGLE_MAPS_API_KEY}`;
  // --- End Map Static API Configuration ---

  return (
    <main className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Trip Route & Map</h1>

      {/* Static Map Image */}
      <div className="mb-8 rounded-lg overflow-hidden border shadow-md">
        {GOOGLE_MAPS_API_KEY === "YOUR_GOOGLE_MAPS_API_KEY" ? (
          <div className="bg-yellow-100 p-4 text-center text-yellow-800">
            Please replace "YOUR_GOOGLE_MAPS_API_KEY" in the code with your actual Google Maps API key to display the map.
          </div>
        ) : (
          <img
            src={mapImageUrl}
            alt="Map showing the road trip route from Vancouver to Banff"
            width={mapWidth}
            height={mapHeight}
            className="w-full"
          />
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Tabs defaultValue="destinations" value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="destinations">Destinations & Routes</TabsTrigger>
              <TabsTrigger value="wildlife">Wildlife Guide</TabsTrigger>
            </TabsList>
          </Tabs>

          {activeTab === "destinations" && isMounted && <TripMap activeDay={Number.parseInt(activeDay)} />}

          {activeTab === "wildlife" && <AnimalGuide />}
        </div>

        <div className="space-y-6">
          {activeTab === "destinations" && (
            <Tabs defaultValue="1" value={activePeriod} onValueChange={setActivePeriod} className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="1">Days 1-3</TabsTrigger>
                <TabsTrigger value="4">Days 4-6</TabsTrigger>
                <TabsTrigger value="7">Days 7-9</TabsTrigger>
              </TabsList>

              <TabsContent value="1">
                <div className="border rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {tripData.slice(0, 3).map((day) => (
                      <button
                        key={day.day}
                        onClick={() => setActiveDay(day.day.toString())}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          activeDay === day.day.toString()
                            ? "bg-emerald-600 text-white"
                            : "bg-stone-100 hover:bg-stone-200"
                        }`}
                      >
                        Day {day.day}
                      </button>
                    ))}
                  </div>

                  {renderDayDetails(dayData)}
                </div>
              </TabsContent>

              <TabsContent value="4">
                <div className="border rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {tripData.slice(3, 6).map((day) => (
                      <button
                        key={day.day}
                        onClick={() => setActiveDay(day.day.toString())}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          activeDay === day.day.toString()
                            ? "bg-emerald-600 text-white"
                            : "bg-stone-100 hover:bg-stone-200"
                        }`}
                      >
                        Day {day.day}
                      </button>
                    ))}
                  </div>

                  {renderDayDetails(dayData)}
                </div>
              </TabsContent>

              <TabsContent value="7">
                <div className="border rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {tripData.slice(6, 9).map((day) => (
                      <button
                        key={day.day}
                        onClick={() => setActiveDay(day.day.toString())}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          activeDay === day.day.toString()
                            ? "bg-emerald-600 text-white"
                            : "bg-stone-100 hover:bg-stone-200"
                        }`}
                      >
                        Day {day.day}
                      </button>
                    ))}
                  </div>

                  {renderDayDetails(dayData)}
                </div>
              </TabsContent>
            </Tabs>
          )}

          {dayData && activeTab === "destinations" && <WeatherWidget location={dayData.to} date={dayData.date} />}

          {activeTab === "wildlife" && (
            <Card>
              <CardHeader>
                <CardTitle>Wildlife Viewing Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Best Times</h3>
                  <p className="text-sm text-muted-foreground">
                    Dawn and dusk are typically the best times to spot wildlife, when many animals are most active.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-1">Be Prepared</h3>
                  <p className="text-sm text-muted-foreground">
                    Bring binoculars, a camera with zoom lens, and move quietly to increase your chances of wildlife
                    sightings.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-1">Safety First</h3>
                  <p className="text-sm text-muted-foreground">
                    Always maintain a safe distance from wildlife. Never feed or approach wild animals, even if they
                    appear tame.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-1">Bear Safety</h3>
                  <p className="text-sm text-muted-foreground">
                    Make noise while hiking, carry bear spray, and know how to use it. Travel in groups when possible.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}

function renderDayDetails(dayData) {
  if (!dayData) return null

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-emerald-600" />
          Day {dayData.day}: {dayData.date}
        </h2>
        <p className="text-muted-foreground">{dayData.title}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-emerald-600" />
          <span className="text-sm">Depart: {dayData.departureTime}</span>
        </div>
        <div className="flex items-center">
          <Ruler className="h-4 w-4 mr-2 text-emerald-600" />
          <span className="text-sm">{dayData.distance} km</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <Badge variant="outline" className="bg-emerald-50">
          <MapPin className="h-3 w-3 mr-1" />
          {dayData.from}
        </Badge>
        <ArrowRight className="h-3 w-3 text-muted-foreground" />
        <Badge variant="outline" className="bg-emerald-50">
          <MapPin className="h-3 w-3 mr-1" />
          {dayData.to}
        </Badge>
      </div>

      {dayData.accommodation && (
        <div className="border-t pt-4 mt-4">
          <h3 className="font-medium mb-2">Accommodation</h3>
          <p className="text-sm">{dayData.accommodation}</p>
        </div>
      )}

      {dayData.hikes && dayData.hikes.length > 0 && (
        <div className="border-t pt-4 mt-4">
          <h3 className="font-medium mb-2">Hikes</h3>
          <div className="space-y-3">
            {dayData.hikes.map((hike, index) => (
              <Card key={index} className="bg-stone-50">
                <CardHeader className="p-3 pb-0">
                  <CardTitle className="text-base">{hike.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-2">
                  <div className="grid grid-cols-3 gap-2 text-xs">
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

      {dayData.notes && (
        <div className="border-t pt-4 mt-4">
          <h3 className="font-medium mb-2">Notes</h3>
          <p className="text-sm">{dayData.notes}</p>
        </div>
      )}
    </div>
  )
}
