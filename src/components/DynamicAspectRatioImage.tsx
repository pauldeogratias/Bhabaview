// import React, { useEffect, useState } from 'react'
// import Image from 'next/image'

// type ImageUrl = string | string[]

// interface AspectRatioImageProps {
//   imageUrl: ImageUrl
// }

// interface AspectRatioData {
//   url: string
//   aspectRatio: number
//   error: boolean
// }

// const DynamicAspectRatioImage: React.FC<AspectRatioImageProps> = ({ imageUrl }) => {
//   const [images, setImages] = useState<AspectRatioData[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const urls = typeof imageUrl === 'string' ? [imageUrl] : imageUrl

//     const loadImage = (url: string): Promise<AspectRatioData> => {
//       return new Promise((resolve) => {
//         const img = new window.Image()
//         img.src = url

//         img.onload = () => {
//           const aspectRatio = img.naturalWidth / img.naturalHeight
//           resolve({ url, aspectRatio, error: false })
//         }

//         img.onerror = () => {
//           resolve({ url, aspectRatio: 1, error: true })
//         }
//       })
//     }

//     Promise.all(urls.map(loadImage)).then((results) => {
//       setImages(results)
//       setLoading(false)
//     })
//   }, [imageUrl])

//   if (loading) {
//     return (
//       <div className="w-full flex justify-center items-center p-4">
//         <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-4">
//       {images.map((img, index) => (
//         <div
//           key={index}
//           className="w-full relative"
//           style={{ aspectRatio: `${img.aspectRatio}` }}
//         >
//           {img.error ? (
//             <div className="bg-gray-100 w-full h-full flex items-center justify-center text-gray-500 text-sm rounded">
//               Image failed to load
//             </div>
//           ) : (
//             <Image
//               src={img.url}
//               alt={`dynamic-img-${index}`}
//               fill
//               className="object-cover rounded"
//               sizes="(max-width: 768px) 100vw, 33vw"
//               loading="lazy"
//             />
//           )}
//         </div>
//       ))}
//     </div>
//   )
// }

// export default DynamicAspectRatioImage



import React, { useEffect, useState } from 'react'
import Image from 'next/image'

type ImageUrl = string | string[]

interface AspectRatioImageProps {
  imageUrl: ImageUrl
  className?: string
  containerClassName?: string
}

interface AspectRatioData {
  url: string
  aspectRatio: number
  error: boolean
}

const DynamicAspectRatioImage: React.FC<AspectRatioImageProps> = ({ 
  imageUrl,
  className = 'object-cover rounded',
  containerClassName = ''
}) => {
  const [images, setImages] = useState<AspectRatioData[]>([])
  const [loading, setLoading] = useState(true)
  const [defaultAspectRatio] = useState(1) // Default square aspect ratio

  useEffect(() => {
    const urls = typeof imageUrl === 'string' ? [imageUrl] : imageUrl

    const loadImage = (url: string): Promise<AspectRatioData> => {
      return new Promise((resolve) => {
        const img = new window.Image()
        img.src = url

        img.onload = () => {
          const aspectRatio = img.naturalWidth / img.naturalHeight
          resolve({ url, aspectRatio, error: false })
        }

        img.onerror = () => {
          resolve({ url, aspectRatio: defaultAspectRatio, error: true })
        }
      })
    }

    const timer = setTimeout(() => {
      Promise.all(urls.map(loadImage)).then((results) => {
        setImages(results)
        setLoading(false)
      })
    }, 0) // Using setTimeout to prevent blocking the main thread

    return () => clearTimeout(timer)
  }, [imageUrl, defaultAspectRatio])

  if (loading) {
    return (
      <div 
        className={`relative bg-gray-100 animate-pulse ${containerClassName}`}
        style={{ aspectRatio: defaultAspectRatio }}
      >
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <>
      {images.map((img, index) => (
        <div
          key={index}
          className={`relative ${containerClassName}`}
          style={{ aspectRatio: img.aspectRatio }}
        >
          {img.error ? (
            <div className="bg-gray-100 w-full h-full flex items-center justify-center text-gray-500 text-sm">
              Image failed to load
            </div>
          ) : (
            <Image
              src={img.url}
              alt={`dynamic-img-${index}`}
              fill
              className={className}
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.onerror = null
                target.src = '/placeholder-image.jpg'
              }}
            />
          )}
        </div>
      ))}
    </>
  )
}

export default React.memo(DynamicAspectRatioImage)
