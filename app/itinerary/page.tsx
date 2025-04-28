import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Car, Tent, Building, Home, ArrowRight, Ruler, TrendingUp } from "lucide-react"
import { tripData } from "@/lib/trip-data"
import Link from "next/link"

export default function ItineraryPage() {
  return (
    <main className="container py-8">
      <h1 className="text-3xl font-bold mb-2">Daily Itinerary</h1>
      <p className="text-muted-foreground mb-8">
        Detailed breakdown of each day's activities, drives, and accommodations
      </p>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="daily">Daily Details</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tripData.map((day) => (
              <Card key={day.day} className="overflow-hidden">
                <div className="relative h-40">
                  <div className="h-full w-full bg-stone-200">
                    <img
                      src={getLocationImage(day.to)}
                      alt={`Day ${day.day} - ${day.title}`}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <Badge className="mb-2 bg-emerald-600">Day {day.day}</Badge>
                    <h3 className="text-lg font-medium text-white">{day.title}</h3>
                  </div>
                </div>
                <CardHeader className="bg-stone-50 pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-emerald-600" />
                      {day.date}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant="outline" className="bg-stone-50">
                        <MapPin className="h-3 w-3 mr-1" />
                        {day.from}
                      </Badge>
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                      <Badge variant="outline" className="bg-stone-50">
                        <MapPin className="h-3 w-3 mr-1" />
                        {day.to}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-emerald-600" />
                        {day.departureTime}
                      </div>
                      <div className="flex items-center">
                        <Car className="h-4 w-4 mr-2 text-emerald-600" />
                        {day.distance} km
                      </div>
                    </div>

                    {day.accommodation && (
                      <div className="flex items-center text-sm">
                        {day.accommodationType === "camping" && <Tent className="h-4 w-4 mr-2 text-emerald-600" />}
                        {day.accommodationType === "hotel" && <Building className="h-4 w-4 mr-2 text-emerald-600" />}
                        {day.accommodationType === "family" && <Home className="h-4 w-4 mr-2 text-emerald-600" />}
                        {day.accommodation}
                      </div>
                    )}

                    <div className="pt-3 mt-3">
                      <Link href={`/day/${day.day}`} className="text-sm text-emerald-600 hover:underline">
                        View detailed day guide →
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="daily" className="mt-6">
          <div className="space-y-8">
            {tripData.map((day) => (
              <div key={day.day} className="border rounded-lg overflow-hidden">
                <div className="relative h-64">
                  <div className="h-full w-full bg-stone-200">
                    <img
                      src={getLocationImage(day.to)}
                      alt={`Day ${day.day} - ${day.title}`}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <Badge className="mb-2 bg-emerald-600">Day {day.day}</Badge>
                    <h2 className="text-2xl font-bold text-white">{day.title}</h2>
                    <p className="text-white/80">{day.date}</p>
                  </div>
                </div>

                <div className="p-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Travel Details</h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="bg-stone-50">
                            <MapPin className="h-3 w-3 mr-1" />
                            {day.from}
                          </Badge>
                          <ArrowRight className="h-3 w-3 text-muted-foreground" />
                          <Badge variant="outline" className="bg-stone-50">
                            <MapPin className="h-3 w-3 mr-1" />
                            {day.to}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-emerald-600" />
                            <span className="text-sm">Depart: {day.departureTime}</span>
                          </div>
                          <div className="flex items-center">
                            <Car className="h-4 w-4 mr-2 text-emerald-600" />
                            <span className="text-sm">Drive: {day.driveTime}</span>
                          </div>
                          <div className="flex items-center">
                            <Ruler className="h-4 w-4 mr-2 text-emerald-600" />
                            <span className="text-sm">Distance: {day.distance} km</span>
                          </div>
                        </div>

                        {day.accommodation && (
                          <div className="border-t pt-4 mt-4">
                            <h4 className="font-medium mb-2">Accommodation</h4>
                            <div className="flex items-center">
                              {day.accommodationType === "camping" && (
                                <Tent className="h-4 w-4 mr-2 text-emerald-600" />
                              )}
                              {day.accommodationType === "hotel" && (
                                <Building className="h-4 w-4 mr-2 text-emerald-600" />
                              )}
                              {day.accommodationType === "family" && <Home className="h-4 w-4 mr-2 text-emerald-600" />}
                              <span>{day.accommodation}</span>
                            </div>
                            {day.accommodationDetails && (
                              <p className="text-sm text-muted-foreground mt-1">{day.accommodationDetails}</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      {day.hikes && day.hikes.length > 0 && (
                        <div>
                          <h3 className="text-lg font-medium mb-3">Hikes & Activities</h3>
                          <div className="space-y-4">
                            {day.hikes.map((hike, index) => (
                              <Card key={index} className="bg-stone-50">
                                <CardHeader className="pb-2">
                                  <CardTitle className="text-base">{hike.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid grid-cols-3 gap-2 text-sm">
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
                                  {hike.description && <p className="text-sm mt-2">{hike.description}</p>}
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}

                      {day.notes && (
                        <div className="mt-6">
                          <h3 className="text-lg font-medium mb-3">Notes</h3>
                          <p className="text-sm">{day.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-stone-50 p-4 border-t flex justify-between items-center">
                  {day.day > 1 ? (
                    <Link href={`/day/${day.day - 1}`} className="text-sm text-emerald-600 hover:underline">
                      ← Previous Day
                    </Link>
                  ) : (
                    <span></span>
                  )}

                  <Link href={`/day/${day.day}`} className="text-emerald-600 hover:underline font-medium">
                    View Full Day Guide
                  </Link>

                  {day.day < 9 ? (
                    <Link href={`/day/${day.day + 1}`} className="text-sm text-emerald-600 hover:underline">
                      Next Day →
                    </Link>
                  ) : (
                    <span></span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
