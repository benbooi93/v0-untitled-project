"use client"

import Link from "next/link"
import { MapIcon, MenuIcon, Rabbit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"
import LanguageSwitcher from "./language-switcher"
import { useLanguage } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <MapIcon className="h-5 w-5 text-emerald-600" />
          <span>{t("siteName")}</span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-emerald-600">
            {t("home")}
          </Link>
          <Link href="/map" className="text-sm font-medium transition-colors hover:text-emerald-600">
            {t("map")}
          </Link>
          <Link href="/day/1" className="text-sm font-medium transition-colors hover:text-emerald-600">
            {t("dailyGuides")}
          </Link>
          <Link href="/hikes" className="text-sm font-medium transition-colors hover:text-emerald-600">
            {t("hikes")}
          </Link>
          <Link
            href="/wildlife"
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              pathname === "/wildlife" ? "text-foreground" : "text-foreground/60",
            )}
          >
            <Rabbit className="mr-1 h-4 w-4" />
            Wildlife
          </Link>
          <Link href="/checklist" className="text-sm font-medium transition-colors hover:text-emerald-600">
            {t("packingList")}
          </Link>
        </nav>
        <div className="ml-4 flex items-center">
          <LanguageSwitcher />
        </div>
        <div className="ml-2 md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 pt-6">
                <Link
                  href="/"
                  className="text-sm font-medium transition-colors hover:text-emerald-600"
                  onClick={() => setIsOpen(false)}
                >
                  {t("home")}
                </Link>
                <Link
                  href="/map"
                  className="text-sm font-medium transition-colors hover:text-emerald-600"
                  onClick={() => setIsOpen(false)}
                >
                  {t("map")}
                </Link>
                <Link
                  href="/day/1"
                  className="text-sm font-medium transition-colors hover:text-emerald-600"
                  onClick={() => setIsOpen(false)}
                >
                  {t("dailyGuides")}
                </Link>
                <Link
                  href="/hikes"
                  className="text-sm font-medium transition-colors hover:text-emerald-600"
                  onClick={() => setIsOpen(false)}
                >
                  {t("hikes")}
                </Link>
                <Link
                  href="/wildlife"
                  className="text-sm font-medium transition-colors hover:text-emerald-600"
                  onClick={() => setIsOpen(false)}
                >
                  Wildlife
                </Link>
                <Link
                  href="/checklist"
                  className="text-sm font-medium transition-colors hover:text-emerald-600"
                  onClick={() => setIsOpen(false)}
                >
                  {t("packingList")}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
