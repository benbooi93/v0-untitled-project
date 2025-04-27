"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AnimalGuide from "@/components/animal-guide"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Info } from "lucide-react"

export default function Wildlife() {
  return (
    <main className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Wildlife Guide</h1>

      <Alert className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Wildlife Safety</AlertTitle>
        <AlertDescription>
          Always maintain a safe distance from wildlife. Never feed or approach wild animals, even if they appear tame.
          Make noise while hiking to avoid surprising animals, especially in areas with limited visibility.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="guide" className="mb-8">
        <TabsList>
          <TabsTrigger value="guide">Animal Guide</TabsTrigger>
          <TabsTrigger value="safety">Safety Tips</TabsTrigger>
          <TabsTrigger value="viewing">Best Viewing Spots</TabsTrigger>
        </TabsList>

        <TabsContent value="guide">
          <Card>
            <CardHeader>
              <CardTitle>Animals of British Columbia & Banff</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">
                The journey from Vancouver to Banff takes you through diverse ecosystems that are home to a wide variety
                of wildlife. This guide highlights animals you might encounter during your trip, their habitats,
                behaviors, and conservation status.
              </p>

              <AnimalGuide />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="safety">
          <Card>
            <CardHeader>
              <CardTitle>Wildlife Safety Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">General Safety</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Observe wildlife from a distance. Use binoculars or telephoto lenses.</li>
                  <li>Never feed wild animals – it's dangerous for them and for you.</li>
                  <li>Store food securely, especially when camping.</li>
                  <li>Keep pets leashed in areas where wildlife might be present.</li>
                  <li>Dispose of trash properly in designated receptacles.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Bear Safety</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Make noise while hiking to avoid surprising bears.</li>
                  <li>Hike in groups when possible.</li>
                  <li>Carry bear spray and know how to use it.</li>
                  <li>If you encounter a bear, stay calm, speak in a low voice, and back away slowly.</li>
                  <li>Never run from a bear – they can outrun humans.</li>
                  <li>If a bear charges, use your bear spray.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Large Mammals</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Keep at least 30 meters (100 feet) away from large mammals like elk, moose, and deer.</li>
                  <li>Be especially cautious during rutting season (fall) and calving season (spring).</li>
                  <li>If an animal's behavior changes, you're too close – back away.</li>
                </ul>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h3 className="text-lg font-medium mb-2 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-amber-600" />
                  What to Do If You Encounter Wildlife
                </h3>
                <p className="mb-2">If you encounter wildlife on the trail or roadside:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Stay calm and assess the situation</li>
                  <li>Give the animal plenty of space and a clear escape route</li>
                  <li>Back away slowly if needed</li>
                  <li>Wait for the animal to move on</li>
                  <li>Report dangerous encounters to park staff</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="viewing">
          <Card>
            <CardHeader>
              <CardTitle>Best Wildlife Viewing Locations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Banff National Park</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Bow Valley Parkway:</span> Early morning or evening drives offer
                    opportunities to see elk, deer, and occasionally bears.
                  </li>
                  <li>
                    <span className="font-medium">Lake Minnewanka:</span> Good for bighorn sheep, deer, and occasionally
                    bears.
                  </li>
                  <li>
                    <span className="font-medium">Vermilion Lakes:</span> Great for bird watching and beaver sightings.
                  </li>
                  <li>
                    <span className="font-medium">Moraine Lake Road:</span> Potential for seeing black bears and
                    grizzlies in spring and early summer.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">British Columbia Highway 1</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Glacier National Park:</span> Watch for mountain goats, black bears,
                    and marmots.
                  </li>
                  <li>
                    <span className="font-medium">Revelstoke Area:</span> Good for spotting black bears, especially in
                    berry season.
                  </li>
                  <li>
                    <span className="font-medium">Salmon Arm:</span> Great for osprey and eagle watching.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Okanagan Valley</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <span className="font-medium">Myra-Bellevue Provincial Park:</span> Mule deer and various bird
                    species.
                  </li>
                  <li>
                    <span className="font-medium">Knox Mountain Park:</span> Mule deer, raptors, and small mammals.
                  </li>
                  <li>
                    <span className="font-medium">Okanagan Lake:</span> Waterfowl and occasionally beavers along
                    shorelines.
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <h3 className="text-lg font-medium mb-2">Best Viewing Times</h3>
                <p>
                  Dawn and dusk are typically the best times for wildlife viewing, when many animals are most active.
                  Spring offers opportunities to see young animals and bears emerging from hibernation, while fall
                  brings elk rutting season and salmon runs.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
