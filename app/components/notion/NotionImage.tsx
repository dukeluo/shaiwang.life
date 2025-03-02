'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import placeholderSvg from '../../assets/images/placeholder.svg'

interface NotionImageProps {
  src: string
  alt: string
  blurDataURL?: string
  width?: number
  height?: number
  caption?: string
}

export const NotionImage = ({
  src,
  alt,
  blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QJIhFQAAAABJRU5ErkJggg==',
  width,
  height,
  caption,
}: NotionImageProps) => {
  const [imgSrc, setImgSrc] = useState<string>(src)
  const [imgLoaded, setImgLoaded] = useState<boolean>(false)
  const [imgError, setImgError] = useState<boolean>(false)
  const [retryCount, setRetryCount] = useState<number>(0)

  // Use the imported SVG
  const localPlaceholderSrc = placeholderSvg.src

  // Key will force the Image component to re-mount when changed
  const [imageKey, setImageKey] = useState<string>(`${src}-${Date.now()}`)

  // Reset state when src changes
  useEffect(() => {
    if (src !== imgSrc && !imgError) {
      setImgSrc(src)
      setImgLoaded(false)
      setImageKey(`${src}-${Date.now()}`)
    }
  }, [src, imgSrc, imgError])

  // Automatically retry loading the image once if there's an error
  useEffect(() => {
    if (imgError && retryCount < 1) {
      const timer = setTimeout(() => {
        setRetryCount(retryCount + 1)
        setImgError(false)
        setImgSrc(src) // Try the original source again
        setImageKey(`${src}-retry-${Date.now()}`)
      }, 2000) // Wait 2 seconds before retry

      return () => clearTimeout(timer)
    }
  }, [imgError, retryCount, src])

  const handleError = () => {
    if (retryCount >= 1) {
      // If we've already retried, use the imported SVG fallback
      setImgError(true)
      setImgSrc(localPlaceholderSrc)
      setImageKey(`fallback-${Date.now()}`)
    } else {
      // First error will trigger the retry effect
      setImgError(true)
    }
  }

  return (
    <figure className={`relative overflow-hidden rounded-md ${!imgLoaded ? 'animate-pulse bg-gray-100' : ''}`}>
      <Image
        key={imageKey}
        className={`object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        src={imgSrc}
        alt={alt || 'Notion image'}
        width={width}
        height={height}
        onLoad={() => setImgLoaded(true)}
        onError={handleError}
        placeholder="blur"
        blurDataURL={blurDataURL}
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {caption && <figcaption className="mt-2 text-sm text-gray-500">{caption}</figcaption>}
    </figure>
  )
}
