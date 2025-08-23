import { Link } from 'react-router'
import type { ALL_PRODUCTS_QUERYResult } from 'sanity.types'

interface ProductCardProps {
  product: ALL_PRODUCTS_QUERYResult[0]
}

export default function ProductCard({ product }: ProductCardProps) {
  // Use the first image as the main card image
  const primaryImage = product.images[0]
  // type guard as Sanity can't guarantee the url is there
  if (!primaryImage.url) return null

  return (
    <Link to={`/products/${product.slug}`} className="block h-full">
      <div className="border-2 border-gray-300 shadow-sm hover:shadow-md transition-shadow rounded-lg p-4 h-full flex flex-col">
        <img
          src={`${primaryImage.url}?auto=format&w=400&h=400&fit=crop&crop=center`}
          alt={product.name}
          className="object-cover rounded-md mb-4 mx-auto aspect-square"
        />
        <h2 className="text-xl text-center font-bold">{product.name}</h2>

        <div className="flex justify-end grow items-end gap-2">
          {product.localPickup ? (
            <span className="text-xs capitalize italic bg-slate-500 border-slate-500 text-white shadow-sm border-2 rounded-xl py-1 px-2 mr-auto">
              Local collection available
            </span>
          ) : null}
          <span className="text-xl text-lime-600 font-bold">
            £{product.price}
          </span>
        </div>
      </div>
    </Link>
  )
}
