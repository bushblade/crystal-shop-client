import { defineQuery } from 'groq'
import ProductCard from '~/components/ProductCard'
import { client } from '~/sanity/client'
import type { Route } from './+types/_index'

// We need to define the query at the top level so that sanity typegen can generate our Types correctly
const LATEST_PRODUCTS_QUERY = defineQuery(`
  *[_type == "product" && stockLevel > 0] | order(_createdAt desc) {
    _id,
    name,
    price,
    "slug": slug.current,
    "images": images[]{
      _key,
      "alt": asset->alt,
      "url": asset->url
    }
  }[0...4]
`)

export async function loader() {
  return { products: await client.fetch(LATEST_PRODUCTS_QUERY) }
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData
  return (
    <>
      <title>Eclipsia Crystals</title>
      <meta name="description" content="A place to buy crystals" />
      <main className="max-w-7xl m-auto">
        <h1 className="text-4xl pt-8 font-bold text-center">Latest Products</h1>
        <div className="p-10 grid lg:grid-cols-4 md:grid-cols-2 gap-3">
          {products.map(product => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      </main>
    </>
  )
}
