import {
    useEffect,
    useState,
    type ReactNode
} from "react";

import { ProductsContext } from "./ProductsContext";
import type { ProductType } from "../types/ProductType";

const ProductsProvider = ({
                              children
                          }: {
    children: ReactNode;
}) => {
    const [products, setProducts] =
        useState<ProductType[]>([]);

    const [loading, setLoading] =
        useState(true);

    const loadProducts = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `${import.meta.env.VITE_PATH_TO_SERVER}api/Product`
            );

            if (!response.ok) {
                throw new Error(
                    "Не вдалося завантажити продукти"
                );
            }

            const data: ProductType[] =
                await response.json();

            setProducts(data);
        } catch (error) {
            console.error(
                "Помилка завантаження продуктів:",
                error
            );

            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <ProductsContext.Provider
            value={{
                products,
                setProducts,
                loading,
                loadProducts
            }}
        >
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsProvider;