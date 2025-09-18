import Link from "next/link"

export default function CallToAction() {
  return (
    <section className="bg-gray-900 text-white py-16 text-center">
      {" "}
      {/* Changed from bg-blue-700 to bg-gray-900 */}
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Apni Agli Favorite T-Shirt Talash Karein</h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Hamare mukammal collection ko browse karein aur apni style ke liye perfect T-shirt dhoondhein.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-white text-gray-900 hover:bg-gray-200 font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300 shadow-md" // Text color changed and hover adjusted
        >
          Pura Collection Dekhen
        </Link>
      </div>
    </section>
  )
}
