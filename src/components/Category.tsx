import { useState } from "react";

import type { CategoryType } from "@/types/CategoryType";

import Product from "./Product";

import { useProducts } from "@/hooks/useProducts";

type CategoryProps = {
    category: CategoryType;
    categories: CategoryType[];
};

const Category = ({
                      category,
                      categories
                  }: CategoryProps) => {
    const [isOpen, setIsOpen] =
        useState(false);

    const { products } =
        useProducts();

    const children =
        categories.filter(
            (item) =>
                item.parentId ===
                category.id
        );

    const categoryProducts =
        products.filter(
            (product) =>
                product.categoryId ===
                category.id
        );

    const hasChildren =
        children.length > 0;

    const handleClick = () => {
        setIsOpen(
            (previous) =>
                !previous
        );
    };

    const imageUrl =
        category.url
            ? `${import.meta.env.VITE_PATH_TO_SERVER}${import.meta.env.VITE_PATH_TO_IMAGE}/${category.url}`
            : null;

    return (
        <div className="col-span-full">

            <div
                onClick={handleClick}
                className="cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition hover:shadow-xl"
            >

                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={
                            category.name
                        }
                        className="h-52 w-full object-cover"
                    />
                ) : (
                    <div className="flex h-52 items-center justify-center bg-gray-100 text-gray-400">
                        Немає зображення
                    </div>
                )}

                <div className="p-5">

                    <div className="flex items-center justify-between">

                        <h2 className="text-xl font-bold text-gray-800">
                            {
                                category.name
                            }
                        </h2>

                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                            #{category.id}
                        </span>

                    </div>

                    <div className="mt-4 text-sm text-gray-600">
                        <span className="font-semibold">
                            Підкатегорії:
                        </span>{" "}
                        {
                            children.length
                        }
                    </div>

                </div>
            </div>

            {isOpen &&
                hasChildren && (
                    <div className="mt-6 ml-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {children.map(
                            (child) => (
                                <Category
                                    key={
                                        child.id
                                    }
                                    category={
                                        child
                                    }
                                    categories={
                                        categories
                                    }
                                />
                            )
                        )}
                    </div>
                )}

            {isOpen &&
                !hasChildren && (
                    <div className="mt-6 ml-6">

                        {categoryProducts.length ===
                        0 ? (
                            <p className="text-gray-500">
                                У цій категорії немає товарів
                            </p>
                        ) : (
                            <div className="flex flex-wrap justify-center gap-6">
                                {categoryProducts.map(
                                    (
                                        product
                                    ) => (
                                        <Product
                                            key={
                                                product.id
                                            }
                                            product={
                                                product
                                            }
                                        />
                                    )
                                )}
                            </div>
                        )}

                    </div>
                )}

        </div>
    );
};

export default Category;