import {
    lazy,
    Suspense
} from "react";
import { AuthProvider } from "@/components/AuthContext";
import {
    createBrowserRouter
} from "react-router";

import Layout from "@/components/Layout.tsx";
import Loader from "@/components/Loader.tsx";
import Error from "@/components/Error.tsx";
import {CartProvider} from "@/components/CartStore.tsx";
import Cart from "@/components/Cart.tsx";

const CategoriesList = lazy(
    () => import("@/components/CategoriesList.tsx")
);

const ProductsList = lazy(
    () => import("@/components/ProductsList.tsx")
);

const Contacts = lazy(
    () => import("@/components/Contacts.tsx")
);

const Search = lazy(
    () => import("@/components/Search.tsx")
);

const withLoader = (
    component: React.ReactNode
) => {
    return (
        <Suspense
            fallback={
                <Loader
                    text="Завантаження сторінки..."
                />
            }
        >
            {component}
        </Suspense>
    );
};

export const routes = createBrowserRouter([
    {
        path: "/",
        element: (
            <AuthProvider>
                <CartProvider>
                    <Layout />
                </CartProvider>
            </AuthProvider>
        ),
        errorElement: <Error />,

        children: [
            {
                path: "Products",
                element: withLoader(
                    <ProductsList />
                )
            },
            {
                path: "Categories",
                element: withLoader(
                    <CategoriesList />
                )
            },
            {
                path: "Contacts",
                element: withLoader(
                    <Contacts />
                )
            },
            {
                path: "search",
                element: withLoader(
                    <Search />
                )
            },
            {
                path: "Cart",
                element: <Cart />
            },
        ]
    }
]);