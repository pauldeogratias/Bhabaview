// // src/components/LazyImage.tsx
// import React, { useState, useEffect } from 'react'
// import { Loader2, AlertCircle } from 'lucide-react'

// interface LazyImageProps {
//   src: string
//   alt: string
//   className?: string
//   fallback?: string
// }

// const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, fallback }) => {
//   const [isLoading, setIsLoading] = useState(true)
//   const [hasError, setHasError] = useState(false)
//   const [imageSrc, setImageSrc] = useState('')

//   useEffect(() => {
//     const img = new Image()
//     img.onload = () => {
//       setImageSrc(src)
//       setIsLoading(false)
//     }
//     img.onerror = () => {
//       setHasError(true)
//       setIsLoading(false)
//     }
//     img.src = src
//   }, [src])

//   if (isLoading) {
//     return (
//       <div className={`${className} bg-gray-200 animate-pulse flex items-center justify-center`}>
//         <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
//       </div>
//     )
//   }

//   if (hasError) {
//     return (
//       <div className={`${className} bg-gray-100 flex items-center justify-center`}>
//         <div className="text-center p-4">
//           <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
//           <p className="text-sm text-gray-500">Image not available</p>
//         </div>
//       </div>
//     )
//   }

//   return <img src={imageSrc} alt={alt} className={className} />
// }

// export default LazyImage



import { useState } from 'react'
import Image from 'next/image'
import { AlertCircle } from 'lucide-react'

interface LazyImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, width, height, className }) => {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <div className="text-center p-4">
          <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500">Image not available</p>
        </div>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  )
}

export default LazyImage