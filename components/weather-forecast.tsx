"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind, Droplets, Thermometer } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

interface WeatherForecastProps {
  location: string
  date: string
  className?: string
}

interface WeatherData {
  date: string
  condition: "sunny" | "cloudy" | "rainy" | "snowy" | "stormy" | "partly-cloudy"
  temperature: number
  high: number
  low: number
  precipitation: number
  humidity: number
  wind: number
  description: string
}

export default function WeatherForecast({ location, date, className }: WeatherForecastProps) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    // Simulate fetching weather data
    const timer = setTimeout(() => {
      // Generate mock weather data based on location
      let mockWeather: WeatherData

      if (location.includes("Banff")) {
        mockWeather = {
          date,
          condition: "partly-cloudy",
          temperature: 12,
          high: 15,
          low: 4,
          precipitation: 20,
          humidity: 65,
          wind: 10,
          description: "Partly cloudy with a chance of afternoon showers. Cool mountain temperatures.",
        }
      } else if (location.includes("Revelstoke")) {
        mockWeather = {
          date,
          condition: "cloudy",
          temperature: 14,
          high: 17,
          low: 8,
          precipitation: 40,
          humidity: 75,
          wind: 8,
          description: "Mostly cloudy with occasional showers. Moderate temperatures.",
        }
      } else if (location.includes("Kelowna")) {
        mockWeather = {
          date,
          condition: "sunny",
          temperature: 22,
          high: 26,
          low: 12,
          precipitation: 5,
          humidity: 45,
          wind: 6,
          description: "Sunny and warm with clear skies. Perfect weather for outdoor activities.",
        }
      } else {
        mockWeather = {
          date,
          condition: "partly-cloudy",
          temperature: 18,
          high: 22,
          low: 10,
          precipitation: 15,
          humidity: 60,
          wind: 8,
          description: "Partly cloudy with mild temperatures. Good conditions for travel.",
        }
      }

      setWeather(mockWeather)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [location, date])

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-16 w-16 text-yellow-500" />
      case "cloudy":
        return <Cloud className="h-16 w-16 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-16 w-16 text-blue-500" />
      case "snowy":
        return <CloudSnow className="h-16 w-16 text-blue-200" />
      case "stormy":
        return <CloudLightning className="h-16 w-16 text-purple-500" />
      case "partly-cloudy":
        return (
          <div className="relative">
            <Sun className="h-16 w-16 text-yellow-500" />
            <Cloud className="h-10 w-10 text-gray-500 absolute -bottom-1 -right-1" />
          </div>
        )
      default:
        return <Sun className="h-16 w-16 text-yellow-500" />
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{t("weatherForecast")}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin h-8 w-8 border-4 border-emerald-600 border-t-transparent rounded-full"></div>
          </div>
        ) : weather ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-lg">{location}</h3>
                <p className="text-sm text-muted-foreground">{date}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-light">{weather.temperature}°C</div>
                <div className="flex items-center justify-end text-sm text-muted-foreground">
                  <Thermometer className="h-3 w-3 mr-1 text-red-500" />
                  <span className="mr-2">{weather.high}°</span>
                  <Thermometer className="h-3 w-3 mr-1 text-blue-500" />
                  <span>{weather.low}°</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                {getWeatherIcon(weather.condition)}
                <span className="text-sm mt-1 capitalize">{weather.condition.replace("-", " ")}</span>
              </div>
              <div className="text-sm">
                <p>{weather.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-2">
              <div className="rounded-lg bg-stone-50 p-3">
                <div className="flex flex-col items-center">
                  <CloudRain className="h-5 w-5 text-blue-500 mb-1" />
                  <span className="text-xs text-muted-foreground">{t("precipitation")}</span>
                  <span className="text-sm font-medium">{weather.precipitation}%</span>
                </div>
              </div>
              <div className="rounded-lg bg-stone-50 p-3">
                <div className="flex flex-col items-center">
                  <Droplets className="h-5 w-5 text-blue-500 mb-1" />
                  <span className="text-xs text-muted-foreground">{t("humidity")}</span>
                  <span className="text-sm font-medium">{weather.humidity}%</span>
                </div>
              </div>
              <div className="rounded-lg bg-stone-50 p-3">
                <div className="flex flex-col items-center">
                  <Wind className="h-5 w-5 text-blue-500 mb-1" />
                  <span className="text-xs text-muted-foreground">{t("wind")}</span>
                  <span className="text-sm font-medium">{weather.wind} km/h</span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-center text-muted-foreground">
              <p>{t("weatherDisclaimer1")}</p>
              <p className="mt-1">{t("weatherDisclaimer2")}</p>
            </div>
          </div>
        ) : (
          <div className="text-center p-4">
            <p>No weather data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
