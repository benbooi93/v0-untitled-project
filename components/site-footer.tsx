"use client"

import Link from "next/link"
import { MapIcon } from "lucide-react"
import { useLanguage } from "@/lib/i18n/language-context"

export default function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="border-t bg-stone-50">
      <div className="container py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <MapIcon className="h-5 w-5 text-emerald-600" />
              <span>{t("siteName")}</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md">{t("footerDescription")}</p>
          </div>
          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">{t("navigation")}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
                    {t("home")}
                  </Link>
                </li>
                <li>
                  <Link href="/map" className="text-sm text-muted-foreground hover:text-foreground">
                    {t("map")}
                  </Link>
                </li>
                <li>
                  <Link href="/day/1" className="text-sm text-muted-foreground hover:text-foreground">
                    {t("dailyGuides")}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">{t("resources")}</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/hikes" className="text-sm text-muted-foreground hover:text-foreground">
                    {t("hikes")}
                  </Link>
                </li>
                <li>
                  <Link href="/checklist" className="text-sm text-muted-foreground hover:text-foreground">
                    {t("packingList")}
                  </Link>
                </li>
                <li>
                  <a
                    href="https://www.pc.gc.ca/en/pn-np/ab/banff"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Banff National Park
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-xs text-muted-foreground">{t("copyright")}</p>
          <p className="text-xs text-muted-foreground">{t("createdWith")}</p>
        </div>
      </div>
    </footer>
  )
}
