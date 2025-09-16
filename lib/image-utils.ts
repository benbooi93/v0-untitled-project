/**
 * Determines the optimal image size based on screen width
 * @param images Object containing different image sizes
 * @param screenWidth Current screen width
 * @returns The URL of the optimal image size
 */
export function getResponsiveImageUrl(
  images: {
    original?: string
    large2x?: string
    large?: string
    medium?: string
    small?: string
    portrait?: string
    landscape?: string
    tiny?: string
  },
  screenWidth: number,
): string {
  // Default to the largest available image
  let imageUrl = images.original || images.large2x || images.large || images.medium || ""

  // Select appropriate size based on screen width
  if (screenWidth <= 640) {
    // Mobile
    imageUrl = images.medium || images.small || imageUrl
  } else if (screenWidth <= 1024) {
    // Tablet
    imageUrl = images.large || images.medium || imageUrl
  } else {
    // Desktop
    imageUrl = images.large2x || images.large || imageUrl
  }

  return imageUrl
}

/**
 * Preloads an image to improve perceived performance
 * @param src Image URL to preload
 * @returns Promise that resolves when the image is loaded
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src
    img.onload = () => resolve()
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
  })
}
