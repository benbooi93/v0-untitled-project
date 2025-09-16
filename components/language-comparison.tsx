"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n/language-context"
import { languages } from "@/lib/i18n/translations"
import Image from "next/image"

export default function LanguageComparison() {
  const { t, language, setLanguage } = useLanguage()

  const commonPhrases = [
    { en: "Hello", es: "Hola" },
    { en: "Thank you", es: "Gracias" },
    { en: "Where is...?", es: "¿Dónde está...?" },
    { en: "How much?", es: "¿Cuánto cuesta?" },
    { en: "I need help", es: "Necesito ayuda" },
    { en: "Good morning", es: "Buenos días" },
    { en: "Good night", es: "Buenas noches" },
    { en: "Excuse me", es: "Disculpe" },
  ]

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-stone-50">
        <CardTitle className="flex items-center justify-between">
          <span>{language === "en" ? "Language Guide" : "Guía de Idiomas"}</span>
          <div className="flex gap-2">
            {Object.entries(languages).map(([code, lang]) => (
              <button
                key={code}
                onClick={() => setLanguage(code as any)}
                className="relative w-8 h-6 overflow-hidden rounded-sm border border-gray-200 transition-all hover:opacity-80"
              >
                <Image src={lang.flag || "/placeholder.svg"} alt={lang.name} fill className="object-cover" />
              </button>
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-2 divide-x">
          <div className="p-4 bg-blue-50">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 relative overflow-hidden rounded-sm">
                <Image
                  src={languages.en.flag || "/placeholder.svg"}
                  alt={languages.en.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium">English</h3>
            </div>
            <ul className="space-y-2">
              {commonPhrases.map((phrase, index) => (
                <li key={index} className="text-sm">
                  {phrase.en}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-red-50">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 relative overflow-hidden rounded-sm">
                <Image
                  src={languages.es.flag || "/placeholder.svg"}
                  alt={languages.es.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-medium">Español</h3>
            </div>
            <ul className="space-y-2">
              {commonPhrases.map((phrase, index) => (
                <li key={index} className="text-sm">
                  {phrase.es}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
