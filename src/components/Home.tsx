
import { Link } from "react-router";

export default function Home() {
    return (
        <div className="space-y-10">
            <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-16 text-white shadow-lg">
                <div className="max-w-3xl">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-100">
                        Welcome to our store
                    </p>

                    <h1 className="mb-5 text-5xl font-bold">
                        Everything you need in one place
                    </h1>

                    <p className="mb-8 text-lg text-blue-100">
                        Browse our products, explore categories and find
                        something perfect for you.
                    </p>

                    <div className="flex flex-wrap gap-4">
                        <Link
                            to="/products"
                            className="rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition hover:bg-gray-100"
                        >
                            View Products
                        </Link>

                        <Link
                            to="/categories"
                            className="rounded-lg border border-white px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                        >
                            Categories
                        </Link>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="mb-6 text-3xl font-bold text-gray-900">
                    Why choose us?
                </h2>

                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <div className="mb-4 text-4xl">🛍️</div>
                        <h3 className="mb-2 text-xl font-semibold">
                            Large selection
                        </h3>
                        <p className="text-gray-600">
                            Find different products for every need in our
                            catalog.
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <div className="mb-4 text-4xl">⚡</div>
                        <h3 className="mb-2 text-xl font-semibold">
                            Easy shopping
                        </h3>
                        <p className="text-gray-600">
                            Quickly find products and add them to your cart.
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <div className="mb-4 text-4xl">🔒</div>
                        <h3 className="mb-2 text-xl font-semibold">
                            Secure account
                        </h3>
                        <p className="text-gray-600">
                            Register or log in to manage your shopping
                            experience.
                        </p>
                    </div>
                </div>
            </section>

            <section className="rounded-2xl bg-white p-8 text-center shadow-sm">
                <h2 className="mb-3 text-3xl font-bold text-gray-900">
                    Ready to start shopping?
                </h2>

                <p className="mb-6 text-gray-600">
                    Explore our catalog and find your next favorite product.
                </p>

                <Link
                    to="/products"
                    className="inline-block rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                    Go to Products
                </Link>
            </section>
        </div>
    );
}
