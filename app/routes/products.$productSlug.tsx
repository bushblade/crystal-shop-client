import { defineQuery } from 'groq'
import { redirect } from 'react-router'
import { client } from '~/sanity/client'
import type { Route } from './+types/products.$productSlug'

// $productSlug here is a dynamic placeholder which we pass in as the second
// argmuent in client.fetch in the loader function
const PRODUCT_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $productSlug][0] {
    _id,
    name,
    price,
    stockLevel,
    description,
    "images": images[]{
      _key,
      "alt": asset->alt,
      "url": asset->url
    }
  }
`)

export async function loader({ params }: Route.LoaderArgs) {
  // We EXECUTE the query, passing the placeholder's value.
  const product = await client.fetch(PRODUCT_QUERY, {
    // slug here needs to match our placeholder in the query
    productSlug: params.productSlug,
  })
  if (!product) {
    return redirect('/not-found')
  }

  return { product }
}

export default function ProductPage({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData

  // Use the first image as the main featured image
  const primaryImage = product.images[0]

  return (
    <>
      <title>{product.name}</title>
      {product.description && (
        <meta name="description" content={product.description} />
      )}

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <article className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <section>
            {primaryImage?.url && (
              <img
                src={primaryImage.url}
                alt={primaryImage.alt || product.name}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            )}
            {/* You could add a grid of thumbnail images here if you like */}
          </section>

          {/* Details Section */}
          <section className="flex flex-col">
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold text-gray-800 mb-6">
              £{product.price.toFixed(2)}
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Add to Cart Button */}
            <div className="mt-auto">
              <button
                type="button"
                className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </section>
        </article>
      </main>
    </>
  )
}
