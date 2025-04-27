"use client"

import { CalendarRange, MapPin, Car, Tent, Building, Home, Cake } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function TripOverview() {
  const { t } = useLanguage()

  return (
    <section className="container py-12">
      <h2 className="text-2xl font-bold tracking-tight mb-8">{t("tripOverview")}</h2>

      {/* Birthday celebration card */}
      <div className="mb-8 p-6 rounded-lg border bg-gradient-to-r from-pink-50 to-rose-50 flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0">
          <div className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden border-4 border-pink-200">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ig-profile-photo-320-x-320-photo-2025-04-27-09-50-32-jpg_custom_resized.jpg-UVPtPeWV0Npk434aKABeD5tosRP4Gh.jpeg"
              alt="Karla Carreño"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Cake className="h-5 w-5 text-pink-500" />
            <h3 className="font-medium text-lg text-pink-700">{t("birthdayCelebration")}</h3>
          </div>
          <p className="text-2xl font-bold text-pink-800 mb-2">{t("birthdayPerson")}</p>
          <p className="text-gray-600">{t("birthdayDescription")}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <CalendarRange className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">{t("duration")}</h3>
              <p className="text-sm text-muted-foreground">{t("durationText")}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Car className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">{t("totalDistance")}</h3>
              <p className="text-sm text-muted-foreground">{t("distanceText")}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">{t("keyDestinations")}</h3>
              <p className="text-sm text-muted-foreground">{t("destinationsText")}</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Tent className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-medium">{t("accommodations")}</h3>
              <p className="text-sm text-muted-foreground">{t("accommodationsText")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-xl font-medium mb-4">{t("accommodationDetails")}</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border p-4">
            <Tent className="h-5 w-5 mb-2 text-emerald-700" />
            <h4 className="font-medium">Juniper Beach Provincial Park</h4>
            <p className="text-sm text-muted-foreground">May 3</p>
            <p className="text-sm">Campsite 24 (Res #BCIN26-1113826B1)</p>
          </div>
          <div className="rounded-lg border p-4">
            <Building className="h-5 w-5 mb-2 text-emerald-700" />
            <h4 className="font-medium">Moxy Banff</h4>
            <p className="text-sm text-muted-foreground">May 5-7</p>
            <p className="text-sm">Hotel stay in Banff</p>
          </div>
          <div className="rounded-lg border p-4">
            <Home className="h-5 w-5 mb-2 text-emerald-700" />
            <h4 className="font-medium">Cousin Elaine's Home</h4>
            <p className="text-sm text-muted-foreground">May 9-10</p>
            <p className="text-sm">Family stay in Kelowna</p>
          </div>
        </div>
      </div>
    </section>
  )
}
