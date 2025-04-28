"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, ArrowRight, Calendar, Clock, Car } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/language-context"

export default function DailyGuidePreview({ day, isBirthdayHighlight = false }) {
  const { language } = useLanguage()

  // Get location-specific images based on the destination
  const getLocationImage = (location) => {
    const defaultImage = "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // Mountain forest valley vista spring
    if (!location) return defaultImage;

    if (location.includes("Banff")) {
      return "https://images.pexels.com/photos/1592461/pexels-photo-1592461.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // Lake Louise Banff
    } else if (location.includes("Kelowna")) {
      return "https://images.pexels.com/photos/15881307/pexels-photo-15881307.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // Okanagan Lake Kelowna
    } else if (location.includes("Revelstoke")) {
      return "https://images.pexels.com/photos/216076/pexels-photo-216076.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // Revelstoke Mountain
    } else if (location.includes("Vancouver")) {
      return "https://images.pexels.com/photos/2100921/pexels-photo-2100921.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // Vancouver skyline
    } else if (location.includes("Juniper Beach")) {
      return "https://images.pexels.com/photos/1415364/pexels-photo-1415364.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // Juniper Beach
    } else if (location.includes("Golden")) {
      return "https://images.pexels.com/photos/216076/pexels-photo-216076.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // Golden (using Revelstoke image)
    } else if (location.includes("Lillooet")) {
      return "https://images.pexels.com/photos/19648104/pexels-photo-19648104.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // Lillooet
    } else if (location.includes("Kamloops")) {
      return "https://images.pexels.com/photos/11544932/pexels-photo-11544932.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // Kamloops
    } else if (location.includes("Pemberton")) {
      return "https://images.pexels.com/photos/5926961/pexels-photo-5926961.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // Pemberton
    } else if (location.includes("Yoho")) {
      return "https://images.pexels.com/photos/12699494/pexels-photo-12699494.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // Yoho
    } else {
      return "https://images.pexels.com/photos/30480941/pexels-photo-30480941.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // BC-Alberta Route
    }
  }

  return (
    <Card className={`overflow-hidden ${isBirthdayHighlight ? "ring-2 ring-pink-400" : ""}`}>
      <div className="relative h-48">
        <img
          src={getLocationImage(day.to)}
          alt={language === "en" ? `Day ${day.day} - ${day.title}` : `Día ${day.day} - ${day.title}`}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://images.pexels.com/photos/7671863/pexels-photo-7671863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"; // Fallback
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <Badge className={`mb-2 ${isBirthdayHighlight ? "bg-pink-500" : "bg-emerald-600"}`}>
            {language === "en" ? `Day ${day.day}` : `Día ${day.day}`}
          </Badge>
          <h3 className="text-lg font-medium text-white">{day.title}</h3>
          <p className="text-white/80 text-sm">{day.date}</p>
        </div>

        {isBirthdayHighlight && (
          <div className="absolute top-3 right-3 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            {language === "en" ? "Birthday Day!" : "¡Día de Cumpleaños!"}
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-sm mb-3">
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

        <div className="grid grid-cols-3 gap-2 text-sm mb-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-emerald-600" />
            {day.date}
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-emerald-600" />
            {day.departureTime}
          </div>
          <div className="flex items-center">
            <Car className="h-4 w-4 mr-1 text-emerald-600" />
            {day.distance} km
          </div>
        </div>

        {day.hikes && day.hikes.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">
              {language === "en" ? "Planned Activities:" : "Actividades Planeadas:"}
            </h4>
            <ul className="text-sm space-y-1">
              {day.hikes.map((hike, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    {hike.name} ({hike.duration})
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Link
          href={`/day/${day.day}`}
          className={`text-sm font-medium ${isBirthdayHighlight ? "text-pink-500 hover:text-pink-600" : "text-emerald-600 hover:text-emerald-700"}`}
        >
          {language === "en" ? "View day details →" : "Ver detalles del día →"}
        </Link>
      </CardContent>
    </Card>
  )
}
