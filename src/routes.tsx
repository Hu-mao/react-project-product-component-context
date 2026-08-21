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
import {
    lazy,
    Suspense
} from "react";

import {
    createBrowserRouter
} from "react-router";

import Layout from "@/components/Layout.tsx";

import Loader from "@/components/Loader.tsx";

import Error from "@/components/Error.tsx";


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

        element: <Layout />,

        errorElement: <Error />,

        children: [

            {
                index: true,

                element: withLoader(
                    <CategoriesList />
                )
            },

            {
                path: "Products",

                element: withLoader(
                    <ProductsList />
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
            }

        ]
    }

]);