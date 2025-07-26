import type { Product } from 'types/sanity'
import { client } from '~/sanity/client'
import type { Route } from './+types/_index'

const PRODUCTS_QUERY = `
  *[_type == "product" && stockLevel > 0] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    "images": images[]{
      _key,
      "alt": asset->alt,
      "url": asset->url
    }
  }
`

export async function loader() {
  return { products: await client.fetch<Product[]>(PRODUCTS_QUERY) }
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { products } = loaderData
  console.log(products)
  return (
    <>
      <title>Crystal Shop</title>
      <meta name="description" content="A place to buy crystals" />
      <h1>Crystal Shop</h1>
      <ul>
        {products.map(product => (
          <li key={product._id}>{product.name}</li>
        ))}
      </ul>
    </>
  )
}
