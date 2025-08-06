import { Link } from 'react-router'
import type { PRODUCTS_QUERYResult } from 'sanity.types'

interface ProductCardProps {
  product: PRODUCTS_QUERYResult[0]
}

export default function ProductCard({ product }: ProductCardProps) {
  // Use the first image as the main card image
  const primaryImage = product.images[0]
  // type guard as Sanity can't guarantee the url is there
  if (!primaryImage.url) return null

  return (
    <Link to={`/products/${product.slug}`} className="block h-full">
      <div className="border-2 rounded-lg p-4 h-full">
        <img
          src={`${primaryImage.url}?auto=format&w=400&h=400&fit=crop&crop=center`}
          alt={product.name}
          className="object-cover rounded-md mb-4 mx-auto aspect-square"
        />
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="text-lg">£{product.price}</p>
      </div>
    </Link>
  )
}
