"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Cake } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function HeroSection({ birthdayCelebration = false }) {
  const { t } = useLanguage()

  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 z-10" />
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src="https://images.pexels.com/photos/2331528/pexels-photo-2331528.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="Scenic road through the Canadian Rockies"
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

            {birthdayCelebration && (
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
            )}

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
  )
}
