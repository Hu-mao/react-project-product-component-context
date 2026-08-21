// import {createBrowserRouter} from "react-router";
// import Layout from "@/components/Layout.tsx";
// import CategoriesList from "@/components/CategoriesList.tsx";
// import ProductsList from "@/components/ProductsList.tsx";
// import Contacts from "@/components/Contacts.tsx";
// import Search from "@/components/Search.tsx";
// import Error from "@/components/Error.tsx";
// export const routes = createBrowserRouter([
//     {
//         path: "/",
//         element:<Layout />,
//         errorElement:<Error/>,
//         children:[
//             {
//                 index:true,
//                 element:<CategoriesList />
//             },
//             {
//                 path:'Products',
//                 element:<ProductsList />
//             },
//             {
//                 path:'Contacts',
//                 element:<Contacts />
//             },
//             {
//                 path:"search",
//                 element:<Search />
//             },
//         ]
//     }])
import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";

import Layout from "@/components/Layout";
import CategoriesList from "@/components/CategoriesList";
import Contacts from "@/components/Contacts";
import Error from "@/components/Error";

const ProductsList = lazy(
    () => import("@/components/ProductsList")
);

const Search = lazy(
    () => import("@/components/Search")
);

const Loader = () => (
    <div className="flex justify-center items-center py-10">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
    </div>
);

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <CategoriesList />,
            },
            {
                path: "Products",
                element: (
                    <Suspense fallback={<Loader />}>
                        <ProductsList />
                    </Suspense>
                ),
            },
            {
                path: "Contacts",
                element: <Contacts />,
            },
            {
                path: "search",
                element: (
                    <Suspense fallback={<Loader />}>
                        <Search />
                    </Suspense>
                ),
            },
        ],
    },
]);