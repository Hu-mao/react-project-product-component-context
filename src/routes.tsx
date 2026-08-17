import {createBrowserRouter} from "react-router";
import Layout from "@/components/Layout.tsx";
import CategoriesList from "@/components/CategoriesList.tsx";
import ProductsList from "@/components/ProductsList.tsx";
import Contacts from "@/components/Contacts.tsx";
import Search from "@/components/Search.tsx";
import Error from "@/components/Error.tsx";
export const routes = createBrowserRouter([
    {
        path: "/",
        element:<Layout />,
        errorElement:<Error/>,
        children:[
            {
                index:true,
                element:<CategoriesList />
            },
            {
                path:'Products',
                element:<ProductsList />
            },
            {
                path:'Contacts',
                element:<Contacts />
            },
            {
                path:"search",
                element:<Search />
            },
        ]
    }])