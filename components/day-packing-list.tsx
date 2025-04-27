"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { tripData } from "@/lib/trip-data"
import { hikesData } from "@/lib/hikes-data"
import { useLanguage } from "@/lib/i18n/language-context"

interface DayPackingListProps {
  day: number
}

export default function DayPackingList({ day }: DayPackingListProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
  const [packingItems, setPackingItems] = useState<{ id: string; name: string; category: string }[]>([])
  const { t } = useLanguage()

  useEffect(() => {
    // Get day data
    const dayData = tripData.find((d) => d.day === day)
    const dayHikes = hikesData.filter((h) => h.day === day)

    // Generate packing list based on day activities
    const items: { id: string; name: string; category: string }[] = []

    // Basic items for every day
    items.push(
      { id: "water", name: "Water bottle", category: t("essentials") },
      { id: "snacks", name: "Snacks", category: t("essentials") },
      { id: "camera", name: "Camera", category: t("essentials") },
      { id: "sunscreen", name: "Sunscreen", category: t("essentials") },
      { id: "sunglasses", name: "Sunglasses", category: t("essentials") },
      { id: "firstaid", name: "First aid kit", category: t("essentials") },
      { id: "charger", name: "Phone charger", category: t("essentials") },
    )

    // Add hiking specific items if there are hikes
    if (dayHikes.length > 0) {
      items.push(
        { id: "hikingboots", name: "Hiking boots", category: t("hiking") },
        { id: "hikingsocks", name: "Hiking socks", category: t("hiking") },
        { id: "backpack", name: "Day backpack", category: t("hiking") },
        { id: "hikingpoles", name: "Hiking poles", category: t("hiking") },
        { id: "hat", name: "Hat with brim", category: t("hiking") },
        { id: "insectrepellent", name: "Insect repellent", category: t("hiking") },
        { id: "map", name: "Trail map", category: t("hiking") },
      )
    }

    // Add accommodation specific items
    if (dayData?.accommodationType === "camping") {
      items.push(
        { id: "tent", name: "Tent", category: t("camping") },
        { id: "sleepingbag", name: "Sleeping bag", category: t("camping") },
        { id: "sleepingpad", name: "Sleeping pad", category: t("camping") },
        { id: "headlamp", name: "Headlamp", category: t("camping") },
        { id: "cookware", name: "Cookware", category: t("camping") },
        { id: "campchair", name: "Camp chair", category: t("camping") },
      )
    }

    // Add weather specific items based on location
    if (dayData?.to === "Banff" || dayData?.to === "Revelstoke") {
      items.push(
        { id: "jacket", name: "Warm jacket", category: t("weather") },
        { id: "layers", name: "Layered clothing", category: t("weather") },
        { id: "gloves", name: "Gloves", category: t("weather") },
        { id: "beanie", name: "Beanie", category: t("weather") },
      )
    } else {
      items.push(
        { id: "lightjacket", name: "Light jacket", category: t("weather") },
        { id: "tshirt", name: "T-shirts", category: t("weather") },
      )
    }

    setPackingItems(items)
  }, [day, t])

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Group items by category
  const groupedItems = packingItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, typeof packingItems>,
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Day {day} Packing List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category}>
              <h3 className="font-medium mb-2">{category}</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center space-x-2 p-2 rounded ${
                      checkedItems[item.id] ? "bg-emerald-50" : ""
                    }`}
                  >
                    <Checkbox
                      id={`item-${item.id}`}
                      checked={checkedItems[item.id] || false}
                      onCheckedChange={() => toggleItem(item.id)}
                    />
                    <label
                      htmlFor={`item-${item.id}`}
                      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                        checkedItems[item.id] ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {item.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
