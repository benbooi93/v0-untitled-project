"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"
import { cn } from "@/lib/utils"

interface Photo {
  src: string
  alt: string
  caption?: string
}

interface PhotoGalleryProps {
  photos: Photo[]
  className?: string
}

export default function PhotoGallery({ photos, className }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const nextPhoto = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length)
  }

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="relative overflow-hidden rounded-lg bg-stone-100">
        <div className="aspect-[16/9] w-full">
          <img
            src={photos[currentIndex].src || "/placeholder.svg"}
            alt={photos[currentIndex].alt}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
            onClick={() => openLightbox(currentIndex)}
          />
        </div>
        <button
          onClick={prevPhoto}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50 focus:outline-none"
          aria-label="Previous photo"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextPhoto}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50 focus:outline-none"
          aria-label="Next photo"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <button
          onClick={() => openLightbox(currentIndex)}
          className="absolute bottom-2 right-2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50 focus:outline-none"
          aria-label="Zoom in"
        >
          <ZoomIn className="h-5 w-5" />
        </button>
        {photos[currentIndex].caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-white">
            <p className="text-sm">{photos[currentIndex].caption}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-5 gap-2">
        {photos.map((photo, index) => (
          <div
            key={index}
            className={cn(
              "aspect-square cursor-pointer overflow-hidden rounded-md",
              currentIndex === index && "ring-2 ring-emerald-600",
            )}
            onClick={() => setCurrentIndex(index)}
          >
            <img src={photo.src || "/placeholder.svg"} alt={photo.alt} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={closeLightbox}>
          <div className="relative max-h-[90vh] max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <img
              src={photos[currentIndex].src || "/placeholder.svg"}
              alt={photos[currentIndex].alt}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />
            <button
              onClick={closeLightbox}
              className="absolute -right-12 top-0 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 focus:outline-none"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
            <button
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50 focus:outline-none"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white hover:bg-black/50 focus:outline-none"
              aria-label="Next photo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            {photos[currentIndex].caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">
                <p>{photos[currentIndex].caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
