import {Link} from "react-router";


const Footer = () => {
    return (
        <footer className="mt-12 border-t bg-white">
            <div className="mx-auto max-w-7xl px-6 py-10">
                <div className="grid gap-8 md:grid-cols-3">

                    {/* Про магазин */}
                    <div>
                        <h2 className="text-2xl font-bold">Shop</h2>
                        <p className="mt-3 text-sm text-gray-600">
                            Online store with quality products.
                            Fast delivery across Ukraine.
                        </p>
                    </div>

                    {/* Навігація */}
                    <div>
                        <h3 className="mb-3 text-lg font-semibold">
                            Navigation
                        </h3>

                        <ul className="space-y-2 text-gray-600">
                            <li>
                                <Link to="/products" className="hover:text-blue-600">
                                    Products
                                </Link>
                            </li>

                            <li>
                                <Link to="/categories" className="hover:text-blue-600">
                                    Categories
                                </Link>
                            </li>

                            <li>
                                <Link to="/contacts" className="hover:text-blue-600">
                                    Contacts
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Контакти */}
                    <div>
                        <h3 className="mb-3 text-lg font-semibold">
                            Contact
                        </h3>

                        <div className="space-y-2 text-sm text-gray-600">
                            <p>📍 Kyiv, Ukraine</p>
                            <p>📞 +380 (99) 123-45-67</p>
                            <p>✉ info@shop.com</p>
                        </div>

                        <div className="mt-5 flex gap-4 text-2xl">
                            <a href="#" className="hover:scale-110 transition">
                                👍
                            </a>
                            <a href="#" className="hover:scale-110 transition">
                                📸
                            </a>
                            <a href="#" className="hover:scale-110 transition">
                                ✈️
                            </a>
                            <a href="#" className="hover:scale-110 transition">
                                💻
                            </a>
                        </div>
                    </div>

                </div>

                <div className="mt-8 border-t pt-5 text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} Shop. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;