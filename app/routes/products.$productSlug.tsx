import { defineQuery } from 'groq'
import { redirect } from 'react-router'
import { client } from '~/sanity/client'
import type { Route } from './+types/products.$productSlug'
import ProductGallery from '~/components/ProductGallery'

// $productSlug here is a dynamic placeholder which we pass in as the second
// argmuent in client.fetch in the loader function
const SINGLE_PRODUCT_QUERY = defineQuery(`
  *[_type == "product" && slug.current == $productSlug][0] {
    _id,
    name,
    weight,
    localPickup,
    countryOfOrigin,
    categories,
    "slug": slug.current,
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
  const product = await client.fetch(SINGLE_PRODUCT_QUERY, {
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

  return (
    <>
      <title>{product.name}</title>
      <meta name="description" content={product.description} />

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <ProductGallery images={product.images} productName={product.slug} />

          {/* Details Section */}
          <section className="flex flex-col gap-y-6">
            <div>
              <h1 className="text-4xl font-bold text-shadow-2sm">
                {product.name}
              </h1>
              <h2 className="text-3xl font-semibold text-lime-600 mt-4 font-sans">
                £{product.price.toFixed(2)}
              </h2>
            </div>

            <p className="text-gray-700 leading-relaxed border-t-2 border-b-2 border-gray-500 py-8">
              {product.description}
            </p>

            <h3 className="text-2xl text-gray-800">Details</h3>
            <ul className="px-4 list-disc">
              <li className="">
                <span>Weight - </span>
                {product.weight ? (
                  <span>
                    {product.weight >= 1000
                      ? `${product.weight / 1000}kg`
                      : `${product.weight}g`}
                  </span>
                ) : (
                  <span>NA</span>
                )}
              </li>
              <li className="">
                <span>Local collection available? - </span>
                <span
                  className={`${product.localPickup ? 'text-lime-600' : 'text-red-400'}  font-semibold `}
                >
                  {product.localPickup ? 'Yes' : 'No'}
                </span>
              </li>
              <li>
                <span>Country of origin - </span>{' '}
                {product.countryOfOrigin ? product.countryOfOrigin : 'NA'}
              </li>
            </ul>

            {/* Add to Cart Button */}
            <div className="mt-auto">
              <h4 className="font-sans font-light pb-3 text-sm">
                Note: Images shown are of the actual product you will recieve
              </h4>
              <button
                type="button"
                className="shadow-2xl cursor-pointer w-full bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
