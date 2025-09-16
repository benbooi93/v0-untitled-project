"use client"

import { useLanguage } from "@/lib/i18n/language-context"
import { languages } from "@/lib/i18n/translations"
import Image from "next/image"

export default function LanguageBanner() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="relative w-full h-24 overflow-hidden">
      <Image src="/flags/background-flags.png" alt="International flags" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-xl font-bold mb-2">{language === "en" ? "Choose Your Language" : "Elige Tu Idioma"}</h2>
          <div className="flex gap-4 justify-center">
            {Object.entries(languages).map(([code, lang]) => (
              <button
                key={code}
                onClick={() => setLanguage(code as any)}
                className={`flex items-center gap-2 px-3 py-1 rounded-md transition-all ${
                  language === code ? "bg-white text-black" : "bg-black/20 text-white hover:bg-black/40"
                }`}
              >
                <div className="w-6 h-6 relative overflow-hidden rounded-sm">
                  <Image
                    src={lang.flag || "/placeholder.svg"}
                    alt={lang.name}
                    width={24}
                    height={24}
                    className="object-cover"
                  />
                </div>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
