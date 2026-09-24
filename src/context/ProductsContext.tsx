import { createContext } from "react";
import type { ProductType } from "../types/ProductType";

export type ProductsContextType = {
    products: ProductType[];

    setProducts: React.Dispatch<
        React.SetStateAction<ProductType[]>
    >;

    loading: boolean;
};

export const ProductsContext =
    createContext<ProductsContextType | null>(
        null
    );