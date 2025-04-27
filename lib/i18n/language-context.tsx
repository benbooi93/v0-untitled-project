"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { en, es, type LanguageKey, type LanguageCode } from "./translations"

type TranslationsType = typeof en

interface LanguageContextType {
  language: LanguageCode
  setLanguage: (lang: LanguageCode) => void
  t: (key: LanguageKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en")
  const [translations, setTranslations] = useState<TranslationsType>(en)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("language") as LanguageCode
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "es")) {
      setLanguageState(savedLanguage)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("language", language)
      setTranslations(language === "en" ? en : es)
    }
  }, [language, mounted])

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang)
  }

  const t = (key: LanguageKey): string => {
    return translations[key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
