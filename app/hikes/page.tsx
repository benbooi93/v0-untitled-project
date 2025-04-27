import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, Clock, Ruler, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { hikesData } from "@/lib/hikes-data"

export default function HikesPage() {
  return (
    <main className="container py-8">
      <h1 className="text-3xl font-bold mb-2">Hiking Trails</h1>
      <p className="text-muted-foreground mb-8">Information on all planned and optional hiking trails for the trip</p>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="all">All Hikes</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="optional">Optional</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hikesData.map((hike, index) => (
              <HikeCard key={index} hike={hike} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="confirmed" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hikesData
              .filter((hike) => hike.status === "confirmed")
              .map((hike, index) => (
                <HikeCard key={index} hike={hike} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="optional" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hikesData
              .filter((hike) => hike.status === "optional")
              .map((hike, index) => (
                <HikeCard key={index} hike={hike} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}

function HikeCard({ hike }) {
  return (
    <Card className="overflow-hidden flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={hike.imageUrl || `/placeholder.svg?height=300&width=500&query=hiking trail ${hike.name}`}
          alt={`${hike.name} hiking trail`}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className={hike.status === "confirmed" ? "bg-emerald-600" : "bg-amber-500"}>
            {hike.status === "confirmed" ? "Confirmed" : "Optional"}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{hike.name}</CardTitle>
        </div>
        <CardDescription className="flex items-center">
          <Calendar className="h-3 w-3 mr-1" />
          Day {hike.day}: {hike.location}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-2 flex-grow">
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

        {hike.elevationGain && (
          <div className="mt-3 text-sm">
            <span className="font-medium">Elevation Gain:</span> {hike.elevationGain}
          </div>
        )}
      </CardContent>

      <CardFooter className="border-t pt-4 mt-auto">
        <div className="flex justify-between w-full">
          <Button variant="outline" asChild size="sm">
            <Link href={`/map?hike=${hike.id}`}>
              <MapPin className="h-4 w-4 mr-1" />
              View on Map
            </Link>
          </Button>

          <Button asChild size="sm" className="bg-emerald-600 hover:bg-emerald-700">
            <Link href={`/hikes/${hike.id}`}>View Details</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
