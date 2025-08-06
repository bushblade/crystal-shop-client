import { useState } from 'react'

interface ImageAsset {
  _key: string
  url: string | null
}

interface ValidImageAsset extends ImageAsset {
  url: string
}

interface Props {
  productName: string
  images: ImageAsset[]
}
export default function ProductGallery({ images, productName }: Props) {
  // use type predicate to assert filtered images as none null
  const noneNullImages = images.filter((image): image is ValidImageAsset =>
    Boolean(image.url)
  )

  const [selectedImage, setSelectedImage] = useState(noneNullImages[0])

  return (
    <section>
      <div className="aspect-square flex items-center justify-center">
        <img
          src={selectedImage.url}
          alt={productName}
          className="w-auto h-auto max-w-full max-h-full rounded-lg shadow-lg object-contain"
        />
      </div>
      {/* Thumbnail Images */}
      <div className="mt-4 grid grid-cols-4 gap-4">
        {noneNullImages.map(image => (
          <button
            key={image._key}
            type="button"
            onClick={() => setSelectedImage(image)}
            className={`rounded-lg overflow-hidden border-2 ${
              selectedImage._key === image._key
                ? 'border-blue-500'
                : 'border-transparent'
            }`}
          >
            <img
              src={`${image.url}?auto=format&w=200&h=200&fit=crop&crop=center`}
              alt={productName}
              className={`w-full h-full object-cover ${image._key === selectedImage._key ? 'grayscale-50' : ''}`}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
