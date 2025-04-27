"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { SaveIcon, RotateCcw } from "lucide-react"
import { packingData } from "@/lib/packing-data"

export default function ChecklistPage() {
  const [checkedItems, setCheckedItems] = useState({})

  const toggleItem = (category, itemId) => {
    setCheckedItems((prev) => ({
      ...prev,
      [category]: {
        ...(prev[category] || {}),
        [itemId]: !(prev[category] && prev[category][itemId]),
      },
    }))
  }

  const resetCategory = (category) => {
    setCheckedItems((prev) => ({
      ...prev,
      [category]: {},
    }))
  }

  const getCategoryProgress = (category) => {
    const items = packingData[category].items
    const checkedCount = Object.values(checkedItems[category] || {}).filter(Boolean).length
    return {
      count: checkedCount,
      total: items.length,
      percentage: items.length ? Math.round((checkedCount / items.length) * 100) : 0,
    }
  }

  const getTotalProgress = () => {
    let totalItems = 0
    let totalChecked = 0

    Object.keys(packingData).forEach((category) => {
      const items = packingData[category].items
      totalItems += items.length
      totalChecked += Object.values(checkedItems[category] || {}).filter(Boolean).length
    })

    return {
      count: totalChecked,
      total: totalItems,
      percentage: totalItems ? Math.round((totalChecked / totalItems) * 100) : 0,
    }
  }

  return (
    <main className="container py-8">
      <h1 className="text-3xl font-bold mb-2">Packing Checklist</h1>
      <p className="text-muted-foreground mb-8">Keep track of everything you need to pack for your adventure</p>

      <div className="mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Overall Progress</CardTitle>
            <CardDescription>
              {getTotalProgress().count} of {getTotalProgress().total} items packed ({getTotalProgress().percentage}%)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-4 w-full bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 transition-all duration-500"
                style={{ width: `${getTotalProgress().percentage}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
              {Object.keys(packingData).map((category) => {
                const progress = getCategoryProgress(category)
                return (
                  <Card key={category} className="overflow-hidden">
                    <CardHeader className="p-3 pb-2">
                      <CardTitle className="text-sm">{packingData[category].name}</CardTitle>
                      <CardDescription className="text-xs">
                        {progress.count}/{progress.total} ({progress.percentage}%)
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-3 pt-0">
                      <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 transition-all duration-500"
                          style={{ width: `${progress.percentage}%` }}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="clothing" className="w-full">
        <TabsList className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 mb-4">
          {Object.keys(packingData).map((category) => (
            <TabsTrigger key={category} value={category}>
              {packingData[category].name}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.keys(packingData).map((category) => {
          const { name, items } = packingData[category]
          const progress = getCategoryProgress(category)

          return (
            <TabsContent key={category} value={category} className="mt-6">
              <Card>
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{name}</CardTitle>
                    <CardDescription>
                      {progress.count} of {progress.total} items packed ({progress.percentage}%)
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => resetCategory(category)}>
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden mb-6">
                    <div
                      className="h-full bg-emerald-600 transition-all duration-500"
                      style={{ width: `${progress.percentage}%` }}
                    ></div>
                  </div>

                  <div className="grid gap-2">
                    {items.map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-2 p-2 rounded ${
                          checkedItems[category] && checkedItems[category][index] ? "bg-emerald-50" : ""
                        }`}
                      >
                        <Checkbox
                          id={`${category}-${index}`}
                          checked={checkedItems[category] && checkedItems[category][index]}
                          onCheckedChange={() => toggleItem(category, index)}
                        />
                        <label
                          htmlFor={`${category}-${index}`}
                          className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                            checkedItems[category] && checkedItems[category][index]
                              ? "line-through text-muted-foreground"
                              : ""
                          }`}
                        >
                          {item.name}
                        </label>
                        {item.quantity > 1 && (
                          <span className="text-xs text-muted-foreground ml-auto">x{item.quantity}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )
        })}
      </Tabs>

      <div className="mt-8 flex justify-end">
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <SaveIcon className="h-4 w-4 mr-2" />
          Save Progress
        </Button>
      </div>
    </main>
  )
}
