"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, Globe } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"
import { languages, type LanguageCode } from "@/lib/i18n/translations"
import Image from "next/image"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)

  const handleLanguageChange = (lang: LanguageCode) => {
    setLanguage(lang)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1 px-2">
          <Globe className="h-4 w-4" />
          <div className="w-5 h-5 relative overflow-hidden rounded-sm">
            <Image
              src={languages[language].flag || "/placeholder.svg"}
              alt={languages[language].name}
              width={20}
              height={20}
              className="object-cover"
            />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="end">
        <div className="grid gap-1">
          {Object.entries(languages).map(([code, lang]) => (
            <Button
              key={code}
              variant="ghost"
              className="justify-start gap-2 px-2 py-1.5 text-sm"
              onClick={() => handleLanguageChange(code as LanguageCode)}
            >
              <div className="w-5 h-5 relative overflow-hidden rounded-sm">
                <Image
                  src={lang.flag || "/placeholder.svg"}
                  alt={lang.name}
                  width={20}
                  height={20}
                  className="object-cover"
                />
              </div>
              {lang.name}
              {language === code && <Check className="h-4 w-4 ml-auto" />}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
