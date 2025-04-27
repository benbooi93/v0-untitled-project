"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cloud, CloudRain, Sun, Thermometer, Wind, Droplets, Umbrella } from "lucide-react"

interface WeatherDay {
  date: string
  location: string
  temperature: number
  condition: "sunny" | "cloudy" | "rainy" | "partly-cloudy"
  precipitation: number
  humidity: number
  wind: number
  high: number
  low: number
}

interface WeatherWidgetProps {
  location: string
  date: string
  className?: string
}

export default function WeatherWidget({ location, date, className }: WeatherWidgetProps) {
  const [forecast, setForecast] = useState<WeatherDay[]>([])
  const [loading, setLoading] = useState(true)

  // Simulate fetching weather data
  useEffect(() => {
    const timer = setTimeout(() => {
      // Mock weather data
      const mockForecast: WeatherDay[] = [
        {
          date: date,
          location: location,
          temperature: 15,
          condition: "partly-cloudy",
          precipitation: 10,
          humidity: 65,
          wind: 8,
          high: 18,
          low: 7,
        },
        {
          date: "Tomorrow",
          location: location,
          temperature: 17,
          condition: "sunny",
          precipitation: 0,
          humidity: 55,
          wind: 5,
          high: 20,
          low: 9,
        },
        {
          date: "Day After",
          location: location,
          temperature: 14,
          condition: "rainy",
          precipitation: 70,
          humidity: 85,
          wind: 12,
          high: 16,
          low: 8,
        },
      ]

      setForecast(mockForecast)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [location, date])

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-10 w-10 text-yellow-500" />
      case "cloudy":
        return <Cloud className="h-10 w-10 text-gray-500" />
      case "rainy":
        return <CloudRain className="h-10 w-10 text-blue-500" />
      case "partly-cloudy":
        return (
          <div className="relative">
            <Sun className="h-10 w-10 text-yellow-500" />
            <Cloud className="h-6 w-6 text-gray-500 absolute -bottom-1 -right-1" />
          </div>
        )
      default:
        return <Sun className="h-10 w-10 text-yellow-500" />
    }
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Weather Forecast</CardTitle>
        <CardDescription>Current and upcoming weather for {location}</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin h-8 w-8 border-4 border-emerald-600 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <Tabs defaultValue="today">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
              <TabsTrigger value="day-after">Day After</TabsTrigger>
            </TabsList>

            {forecast.map((day, index) => (
              <TabsContent key={index} value={index === 0 ? "today" : index === 1 ? "tomorrow" : "day-after"}>
                <div className="pt-4">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      {getWeatherIcon(day.condition)}
                      <div className="ml-4">
                        <h3 className="text-2xl font-light">{day.temperature}°C</h3>
                        <p className="text-sm text-muted-foreground capitalize">{day.condition.replace("-", " ")}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end">
                        <Thermometer className="h-4 w-4 mr-1 text-red-500" />
                        <span className="text-sm">{day.high}°</span>
                      </div>
                      <div className="flex items-center justify-end">
                        <Thermometer className="h-4 w-4 mr-1 text-blue-500" />
                        <span className="text-sm">{day.low}°</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg bg-stone-50 p-2">
                      <div className="flex flex-col items-center">
                        <Umbrella className="h-4 w-4 text-blue-500 mb-1" />
                        <span className="text-xs text-muted-foreground">Precip</span>
                        <span className="text-sm font-medium">{day.precipitation}%</span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-stone-50 p-2">
                      <div className="flex flex-col items-center">
                        <Droplets className="h-4 w-4 text-blue-500 mb-1" />
                        <span className="text-xs text-muted-foreground">Humidity</span>
                        <span className="text-sm font-medium">{day.humidity}%</span>
                      </div>
                    </div>
                    <div className="rounded-lg bg-stone-50 p-2">
                      <div className="flex flex-col items-center">
                        <Wind className="h-4 w-4 text-blue-500 mb-1" />
                        <span className="text-xs text-muted-foreground">Wind</span>
                        <span className="text-sm font-medium">{day.wind} km/h</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 text-xs text-center text-muted-foreground">
                    Last updated: {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
