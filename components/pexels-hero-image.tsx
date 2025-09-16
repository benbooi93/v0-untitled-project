"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/lib/i18n/language-context"
import { getResponsiveImageUrl, preloadImage } from "@/lib/image-utils"

// Interface definitions
interface PexelsImage {
  id: number
  width: number
  height: number
  url: string
  photographer: string
  photographer_url: string
  photographer_id: number
  avg_color: string
  src: {
    original: string
    large2x: string
    large: string
    medium: string
    small: string
    portrait: string
    landscape: string
    tiny: string
  }
  liked: boolean
  alt: string
}

interface PexelsResponse {
  total_results: number
  page: number
  per_page: number
  photos: PexelsImage[]
  next_page: string
}

interface PexelsHeroImageProps {
  fallbackImage: string
  searchQuery?: string
  className?: string
  alt?: string
}

export default function PexelsHeroImage({
  fallbackImage,
  searchQuery = "banff national park lake louise mountains",
  className = "h-full w-full object-cover",
  alt = "Scenic mountain landscape",
}: PexelsHeroImageProps) {
  const [image, setImage] = useState<PexelsImage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [screenWidth, setScreenWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)
  const { language } = useLanguage()
  const imageRef = useRef<HTMLImageElement>(null)

  // Translate alt text based on language
  const translatedAlt = language === "en" ? alt : "Paisaje montañoso escénico"

  // Handle window resize for responsive images
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const fetchImage = async () => {
      try {
        setLoading(true)
        setError(false)

        const response = await fetch(
          `https://api.pexels.com/v1/search?query=${encodeURIComponent(searchQuery)}&per_page=1&orientation=landscape`,
          {
            headers: {
              Authorization: "quLxiB4iAptnCTmEo34tMxdqTdMmLYrtEowZluLyy5h4DFw4mY2e8Fkf",
            },
          },
        )

        if (!response.ok) {
          throw new Error("Failed to fetch image from Pexels")
        }

        const data: PexelsResponse = await response.json()

        if (data.photos && data.photos.length > 0) {
          // Preload the image before displaying
          const imageUrl = getResponsiveImageUrl(data.photos[0].src, screenWidth)
          await preloadImage(imageUrl)
          setImage(data.photos[0])
        } else {
          throw new Error("No images found")
        }
      } catch (err) {
        console.error("Error fetching Pexels image:", err)
        setError(true)
        // Preload fallback image
        preloadImage(fallbackImage).catch((e) => console.error("Failed to load fallback image:", e))
      } finally {
        setLoading(false)
      }
    }

    fetchImage()
  }, [searchQuery, fallbackImage, screenWidth])

  // If loading, show a placeholder with background color
  if (loading) {
    return (
      <div className={`bg-stone-200 animate-pulse ${className}`} aria-label="Loading image...">
        <div className="h-full w-full flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-emerald-600 border-t-transparent rounded-full"></div>
        </div>
      </div>
    )
  }

  // If error or no image found, use fallback image
  if (error || !image) {
    return <img src={fallbackImage || "/placeholder.svg"} alt={translatedAlt} className={className} />
  }

  // Get the appropriate image size based on screen width
  const imageUrl = getResponsiveImageUrl(image.src, screenWidth)

  // Render the Pexels image with attribution
  return (
    <div className="relative h-full w-full">
      <img
        ref={imageRef}
        src={imageUrl || "/placeholder.svg"}
        alt={image.alt || translatedAlt}
        className={className}
        loading="eager"
      />
      <div className="absolute bottom-2 right-2 text-xs text-white/70 bg-black/30 px-2 py-1 rounded">
        Photo by{" "}
        <a href={image.photographer_url} target="_blank" rel="noopener noreferrer" className="underline">
          {image.photographer}
        </a>{" "}
        on{" "}
        <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer" className="underline">
          Pexels
        </a>
      </div>
    </div>
  )
}
