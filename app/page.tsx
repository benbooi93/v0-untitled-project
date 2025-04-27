"use client"

import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MapPinIcon, CalendarIcon, MapIcon, Rabbit, Cake, Camera, Mountain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"
import LanguageBanner from "@/components/language-banner"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { tripData } from "@/lib/trip-data"
import { hikesData } from "@/lib/hikes-data"
import DailyGuidePreview from "@/components/daily-guide-preview"
import TripHighlights from "@/components/trip-highlights"

export default function HomePage() {
  const { t, language } = useLanguage()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10" />
        <div className="relative h-[70vh] overflow-hidden">
          <img
            src="/images/destinations/banff-lake-louise.png"
            alt="Scenic view of Lake Louise in Banff National Park"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white">
                {t("heroTitle")}
              </h1>
              <p className="text-xl text-white/90">{t("heroDate")}</p>

              <div className="mt-4 bg-white/20 backdrop-blur-sm p-4 rounded-lg inline-flex items-center gap-4">
                <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-white">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ig-profile-photo-320-x-320-photo-2025-04-27-09-50-32-jpg_custom_resized.jpg-UVPtPeWV0Npk434aKABeD5tosRP4Gh.jpeg"
                    alt="Karla Carreño"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <Cake className="h-5 w-5 text-pink-300" />
                    <p className="text-white font-medium">{t("birthdayCelebration")}</p>
                  </div>
                  <p className="text-white text-xl font-bold">{t("birthdayPerson")}</p>
                </div>
              </div>

              <div className="flex justify-center gap-4 pt-4">
                <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/itinerary">
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    {t("viewItinerary")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LanguageBanner />

      <main className="flex-1">
        {/* Trip Overview Section */}
        <section className="container py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 text-pink-800">
                <Cake className="h-4 w-4" />
                <span className="text-sm font-medium">{t("birthdayCelebration")}</span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight">{t("tripTitle")}</h2>
              <p className="text-muted-foreground">{t("tripDescription")}</p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/map">
                    <MapIcon className="mr-2 h-4 w-4" />
                    {t("exploreMap")}
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/day/1">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {t("startDayByDay")}
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden border shadow-md">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <img
                src="/images/destinations/banff-lake-louise.png"
                alt={
                  language === "en"
                    ? "Scenic view of Lake Louise in Banff National Park"
                    : "Vista panorámica del Lago Louise en el Parque Nacional Banff"
                }
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 left-0 p-4 z-20">
                <h3 className="text-xl font-bold text-white">{t("banffHighlight")}</h3>
                <p className="text-white/90 text-sm">{t("banffDescription")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Trip Highlights Section */}
        <TripHighlights />

        {/* What We're Doing Section */}
        <section className="bg-stone-100 py-12 md:py-16">
          <div className="container">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight">{t("whatWereDoing")}</h2>
              <div className="mt-4 md:mt-0">
                <Link
                  href="/itinerary"
                  className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center"
                >
                  {t("viewFullItinerary")} →
                </Link>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img
                    src="/images/hikes/johnston-canyon-trail.png"
                    alt={language === "en" ? "Hiking in Johnston Canyon" : "Caminata en Johnston Canyon"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Mountain className="h-4 w-4 text-emerald-600" />
                    <h3 className="font-medium">{t("scenicHikes")}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{t("hikesPreviewText")}</p>
                  <Link href="/hikes" className="text-emerald-600 hover:text-emerald-700 text-sm mt-2 inline-block">
                    {t("exploreHikes")} →
                  </Link>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img
                    src="/images/wildlife/grizzly-bear.jpg"
                    alt={
                      language === "en"
                        ? "Wildlife viewing opportunities"
                        : "Oportunidades para observar vida silvestre"
                    }
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Rabbit className="h-4 w-4 text-emerald-600" />
                    <h3 className="font-medium">{t("wildlifeViewing")}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{t("wildlifePreviewText")}</p>
                  <Link href="/wildlife" className="text-emerald-600 hover:text-emerald-700 text-sm mt-2 inline-block">
                    {t("exploreWildlife")} →
                  </Link>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img
                    src="/images/destinations/kelowna-lake.png"
                    alt={language === "en" ? "Scenic destinations" : "Destinos panorámicos"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPinIcon className="h-4 w-4 text-emerald-600" />
                    <h3 className="font-medium">{t("scenicDestinations")}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{t("destinationsPreviewText")}</p>
                  <Link href="/map" className="text-emerald-600 hover:text-emerald-700 text-sm mt-2 inline-block">
                    {t("exploreDestinations")} →
                  </Link>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img
                    src="/images/birthday-celebration.png"
                    alt={
                      language === "en" ? "Birthday celebration activities" : "Actividades de celebración de cumpleaños"
                    }
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Cake className="h-4 w-4 text-pink-500" />
                    <h3 className="font-medium">{t("birthdayActivities")}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{t("birthdayActivitiesPreviewText")}</p>
                  <Link href="/birthday" className="text-pink-500 hover:text-pink-600 text-sm mt-2 inline-block">
                    {t("exploreBirthdayPlans")} →
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Daily Guides Section */}
        <section className="container py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">{t("dailyGuides")}</h2>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-end mb-6">
              <TabsList>
                <TabsTrigger value="all">{t("allDays")}</TabsTrigger>
                <TabsTrigger value="highlights">{t("highlights")}</TabsTrigger>
                <TabsTrigger value="birthday">{t("birthdayEvents")}</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <div className="grid gap-6 md:grid-cols-3">
                {tripData.slice(0, 6).map((day) => (
                  <DailyGuidePreview key={day.day} day={day} />
                ))}
              </div>
              <div className="mt-6 text-center">
                <Button asChild variant="outline">
                  <Link href="/itinerary">{t("viewAllDays")}</Link>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="highlights">
              <div className="grid gap-6 md:grid-cols-3">
                {/* Day 4 - Banff Exploration */}
                <DailyGuidePreview day={tripData[3]} />
                {/* Day 5 - More Banff Hikes */}
                <DailyGuidePreview day={tripData[4]} />
                {/* Day 8 - Kelowna Adventures */}
                <DailyGuidePreview day={tripData[7]} />
              </div>
            </TabsContent>

            <TabsContent value="birthday">
              <div className="grid gap-6 md:grid-cols-3">
                {/* Day 5 - Birthday Day */}
                <DailyGuidePreview day={tripData[4]} isBirthdayHighlight={true} />
                {/* Day 4 - Pre-Birthday */}
                <DailyGuidePreview day={tripData[3]} />
                {/* Day 6 - Post-Birthday */}
                <DailyGuidePreview day={tripData[5]} />
              </div>
              <div className="mt-8 p-6 bg-pink-50 rounded-lg border border-pink-100">
                <h3 className="text-xl font-bold text-pink-800 mb-4 flex items-center">
                  <Cake className="h-5 w-5 mr-2" />
                  {t("birthdaySpecialPlans")}
                </h3>
                <p className="mb-4">{t("birthdaySpecialPlansDescription")}</p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium mb-2">{t("morningActivity")}</h4>
                    <p className="text-sm text-muted-foreground">{t("morningActivityDescription")}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium mb-2">{t("afternoonActivity")}</h4>
                    <p className="text-sm text-muted-foreground">{t("afternoonActivityDescription")}</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium mb-2">{t("eveningActivity")}</h4>
                    <p className="text-sm text-muted-foreground">{t("eveningActivityDescription")}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Featured Hikes Section */}
        <section className="bg-stone-50 py-12 md:py-16">
          <div className="container">
            <h2 className="text-2xl font-bold tracking-tight mb-8">{t("featuredHikes")}</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {hikesData
                .filter((hike) => hike.status === "confirmed")
                .slice(0, 3)
                .map((hike) => (
                  <Card key={hike.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <img
                        src={hike.imageUrl || `/placeholder.svg?height=300&width=500&query=hiking trail ${hike.name}`}
                        alt={language === "en" ? `${hike.name} hiking trail` : `Sendero de caminata ${hike.name}`}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-4">
                        <Badge className="mb-2 bg-emerald-600">
                          {language === "en" ? `Day ${hike.day}` : `Día ${hike.day}`}
                        </Badge>
                        <h3 className="text-lg font-medium text-white">{hike.name}</h3>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-3 gap-2 text-sm mb-3">
                        <div className="flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-1 text-emerald-600" />
                          {hike.location}
                        </div>
                        <div className="flex items-center">
                          <Mountain className="h-4 w-4 mr-1 text-emerald-600" />
                          {hike.difficulty}
                        </div>
                        <div className="flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1 text-emerald-600" />
                          {hike.duration}
                        </div>
                      </div>
                      <p className="text-sm line-clamp-2 mb-3">{hike.description}</p>
                      <Link
                        href={`/hikes/${hike.id}`}
                        className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                      >
                        {t("viewHikeDetails")} →
                      </Link>
                    </CardContent>
                  </Card>
                ))}
            </div>
            <div className="mt-6 text-center">
              <Button asChild variant="outline">
                <Link href="/hikes">{t("viewAllHikes")}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Photo Gallery Preview */}
        <section className="container py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">{t("photoGallery")}</h2>
            <div className="mt-4 md:mt-0">
              <Link href="/gallery" className="text-emerald-600 hover:text-emerald-700 font-medium flex items-center">
                <Camera className="mr-2 h-4 w-4" />
                {t("viewFullGallery")}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <img
                src="/images/destinations/banff-lake-louise.png"
                alt={language === "en" ? "Lake Louise, Banff" : "Lago Louise, Banff"}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <img
                src="/images/hikes/johnston-canyon-trail.png"
                alt={language === "en" ? "Johnston Canyon Trail" : "Sendero del Cañón Johnston"}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <img
                src="/images/destinations/kelowna-lake.png"
                alt={language === "en" ? "Okanagan Lake, Kelowna" : "Lago Okanagan, Kelowna"}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <img
                src="/images/destinations/revelstoke-mountain.png"
                alt={language === "en" ? "Revelstoke Mountain" : "Montaña Revelstoke"}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
