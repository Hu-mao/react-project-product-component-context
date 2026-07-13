import {createBrowserRouter} from "react-router";
import CategoriesList from "@/components/CategoriesList.tsx";
import ProductsList from "./components/ProductsList";
import Contacts from "@/components/Contacts.tsx";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <CategoriesList />
    },
    {
        path: "Products",
        element:<ProductsList />,
    },
    {
        path: "Contacts",
        element: <Contacts />,
    }
])