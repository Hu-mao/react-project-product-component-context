import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { useAuth } from "@/components/AuthContext";
import Login from "@/components/Login";
import Register from "@/components/Register";
import {useCart} from "@/components/CartStore.tsx";

export default function Layout() {
    const { email, accessToken, logout } = useAuth();
    const location = useLocation();
    const { cart } = useCart();
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const openLogin = () => {
        setShowRegister(false);
        setShowLogin(true);
    };

    const openRegister = () => {
        setShowLogin(false);
        setShowRegister(true);
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-800">

            <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
                <div className="mx-auto flex min-h-18 max-w-7xl items-center gap-8 px-6">

                    <Link
                        to="/Home"
                        className="text-2xl font-extrabold tracking-tight text-blue-600 transition hover:text-blue-700"
                    >
                        Shop
                    </Link>

                    <nav className="flex flex-1 items-center gap-2">
                        <Link
                            to="/Home"
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                                location.pathname === "/"
                                    ? "bg-blue-100 text-blue-700"
                                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                        >
                            Home
                        </Link>

                        <Link
                            to="/Products"
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                                location.pathname.toLowerCase() === "/products"
                                    ? "bg-blue-100 text-blue-700"
                                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                        >
                            Products
                        </Link>

                        <Link
                            to="/Categories"
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                                location.pathname.toLowerCase() === "/categories"
                                    ? "bg-blue-100 text-blue-700"
                                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                        >
                            Categories
                        </Link>

                        <Link
                            to="/Contacts"
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                                location.pathname.toLowerCase() === "/contacts"
                                    ? "bg-blue-100 text-blue-700"
                                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                        >
                            Contacts
                        </Link>

                        <Link
                            to="/search"
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                                location.pathname.toLowerCase() === "/search"
                                    ? "bg-blue-100 text-blue-700"
                                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                            }`}
                        >
                            Search
                        </Link>
                        <Link
                            to="/Cart"
                            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                        >
                            🛒 ({cart.reduce((sum, item) => sum + item.quantity, 0)})
                        </Link>
                    </nav>

                    <div className="flex items-center gap-3">
                        {accessToken ? (
                            <>
                                <span className="max-w-50 truncate text-sm font-medium text-gray-600">
                                    {email}
                                </span>

                                <button
                                    onClick={logout}
                                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={openLogin}
                                    className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-blue-50 hover:text-blue-600"
                                >
                                    Login
                                </button>

                                <button
                                    onClick={openRegister}
                                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow"
                                >
                                    Register
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <main className="mx-auto min-h-[calc(100vh-72px)] max-w-7xl px-6 py-8">
                <Outlet />
            </main>

            {showLogin && (
                <Login
                    onClose={() => setShowLogin(false)}
                />
            )}

            {showRegister && (
                <Register
                    onClose={() => setShowRegister(false)}
                />
            )}
        </div>
    );
}