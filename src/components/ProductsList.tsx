import {
    lazy,
    Suspense,
    useEffect,
    useState
} from "react";

import { useProducts } from "@/hooks/useProducts";
import Loader from "./Loader";
import CreateProduct from "./CreateProduct";
import type { CategoryType } from "@/types/CategoryType";

const Product = lazy(
    () => import("./Product")
);

const ProductsList = () => {
    const {
        products,
        loading
    } = useProducts();

    const [categories, setCategories] =
        useState<CategoryType[]>([]);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_PATH_TO_SERVER}${import.meta.env.VITE_PATH_TO_API}category?page=1&pageSize=1000`
                );

                if (!response.ok) {
                    throw new Error(
                        "Не вдалося завантажити категорії"
                    );
                }

                const data =
                    await response.json();

                setCategories(
                    data.items ?? []
                );

            } catch (error) {
                console.error(error);
            }
        };

        loadCategories();
    }, []);

    const reloadProducts = () => {
        window.location.reload();
    };

    if (loading) {
        return (
            <Loader
                text="Завантаження продуктів..."
            />
        );
    }

    return (
        <div className="mx-auto max-w-7xl p-6">

            <h1 className="mb-8 text-center text-3xl font-bold">
                Продукти
            </h1>

            <CreateProduct
                categories={categories}
                onCreated={reloadProducts}
            />

            {products.length === 0 ? (
                <div className="rounded-xl bg-white p-10 text-center text-gray-500 shadow">
                    Список товарів порожній
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-6">

                    {products.map(
                        (product) => (
                            <Suspense
                                key={product.id}
                                fallback={
                                    <Loader text="Завантаження товару..." />
                                }
                            >
                                <Product
                                    product={product}
                                />
                            </Suspense>
                        )
                    )}

                </div>
            )}

        </div>
    );
};

export default ProductsList;