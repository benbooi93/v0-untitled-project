"use client"

import { Button } from "@/components/ui/button"
import { CalendarIcon, Cake, MapPin } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import Link from "next/link"

export default function BirthdayCelebrationHero() {
  const { t, language } = useLanguage()

  return (
    <section className="relative">
      {/* Main background image */}
      <div className="relative h-[85vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60 z-10" />
        <img
          src="https://images.pexels.com/photos/1592461/pexels-photo-1592461.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt={
            language === "en"
              ? "Scenic view of Lake Louise in Banff National Park"
              : "Vista panorámica del Lago Louise en el Parque Nacional Banff"
          }
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 z-20 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Birthday badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500 text-white mb-6">
              <Cake className="h-5 w-5" />
              <span className="font-medium">{t("birthdayCelebration")}</span>
            </div>

            {/* Main title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">{t("heroTitle")}</h1>

            {/* Trip dates */}
            <div className="flex items-center gap-2 text-white/90 text-xl mb-6">
              <CalendarIcon className="h-5 w-5" />
              <span>{t("heroDate")}</span>
            </div>

            {/* Birthday celebrant card */}
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl mb-8 border border-white/20">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="h-28 w-28 md:h-32 md:w-32 rounded-full overflow-hidden border-4 border-pink-300 flex-shrink-0">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ig-profile-photo-320-x-320-photo-2025-04-27-09-50-32-jpg_custom_resized.jpg-UVPtPeWV0Npk434aKABeD5tosRP4Gh.jpeg"
                    alt="Karla Carreño"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">{t("birthdayPerson")}</h2>
                  <p className="text-white/80 mb-4">{t("birthdayDescription")}</p>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-white text-sm">
                      <Cake className="h-3 w-3" />
                      <span>{t("turning31")}</span>
                    </div>
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-white text-sm">
                      <MapPin className="h-3 w-3" />
                      <span>{t("celebratingInBanff")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <Button asChild size="lg" className="bg-pink-500 hover:bg-pink-600 text-white">
                <Link href="/birthday">
                  <Cake className="mr-2 h-5 w-5" />
                  {t("birthdayDetails")}
                </Link>
              </Button>
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
  )
}
