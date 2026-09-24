import {
    useEffect,
    useState
} from "react";

import type { CategoryType } from "@/types/CategoryType";

import Category from "@/components/Category";
import CreateCategory from "@/components/CreateCategory";

import Loader from "./Loader";

type CategoriesResponse = {
    items: CategoryType[];
    totalItems: number;
    page: number;
    pageSize: number;
    totalPages: number;
};

const PAGE_SIZE = 6;

const CategoriesList = () => {
    const URL =
        import.meta.env.VITE_PATH_TO_SERVER +
        import.meta.env.VITE_PATH_TO_API +
        "category";

    const [categories, setCategories] =
        useState<CategoryType[]>([]);

    const [allCategories, setAllCategories] =
        useState<CategoryType[]>([]);

    const [search, setSearch] =
        useState("");

    const [page, setPage] =
        useState(1);

    const [totalPages, setTotalPages] =
        useState(1);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const loadCategories = async () => {
        try {
            setLoading(true);
            setError(null);

            const response =
                await fetch(
                    `${URL}?page=${page}&pageSize=${PAGE_SIZE}`
                );

            if (!response.ok) {
                throw new Error(
                    "Не вдалося завантажити категорії"
                );
            }

            const data:
                CategoriesResponse =
                await response.json();

            setCategories(
                data.items
            );

            setTotalPages(
                data.totalPages
            );

        } catch (error) {
            console.error(error);

            setError(
                "Не вдалося завантажити категорії"
            );

        } finally {
            setLoading(false);
        }
    };

    const loadAllCategories =
        async () => {
            try {
                const response =
                    await fetch(
                        `${URL}?page=1&pageSize=1000`
                    );

                if (!response.ok) {
                    return;
                }

                const data =
                    await response.json();

                setAllCategories(
                    data.items ?? []
                );

            } catch (error) {
                console.error(error);
            }
        };

    useEffect(() => {
        loadCategories();
    }, [page]);

    useEffect(() => {
        loadAllCategories();
    }, []);

    const handleCreated = async () => {
        await loadCategories();
        await loadAllCategories();
    };

    if (loading) {
        return (
            <Loader
                text="Завантаження категорій..."
            />
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center">
                <p className="text-lg text-red-500">
                    {error}
                </p>
            </div>
        );
    }

    const rootCategories =
        categories.filter(
            (category) =>
                category.parentId === null
        );

    const visibleCategories =
        search.trim() === ""
            ? rootCategories
            : categories.filter(
                (category) =>
                    category.name
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        )
            );

    return (
        <div className="mx-auto max-w-7xl p-6">

            <CreateCategory
                onCreated={handleCreated}
            />

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Пошук категорії..."
                    value={search}
                    onChange={(event) => {
                        setSearch(
                            event.target.value
                        );
                        setPage(1);
                    }}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
            </div>

            {visibleCategories.length === 0 ? (
                <p className="mt-10 text-center text-lg text-gray-500">
                    Категорію не знайдено
                </p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {visibleCategories.map(
                        (category) => (
                            <Category
                                key={category.id}
                                category={category}
                                categories={
                                    allCategories
                                }
                            />
                        )
                    )}
                </div>
            )}

            {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">

                    <button
                        type="button"
                        disabled={page === 1}
                        onClick={() =>
                            setPage(
                                (value) =>
                                    value - 1
                            )
                        }
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        ←
                    </button>

                    {Array.from(
                        {
                            length: totalPages
                        },
                        (_, index) =>
                            index + 1
                    ).map(
                        (pageNumber) => (
                            <button
                                type="button"
                                key={
                                    pageNumber
                                }
                                onClick={() =>
                                    setPage(
                                        pageNumber
                                    )
                                }
                                className={`rounded-lg px-4 py-2 ${
                                    page ===
                                    pageNumber
                                        ? "bg-blue-600 text-white"
                                        : "border border-gray-300 bg-white"
                                }`}
                            >
                                {
                                    pageNumber
                                }
                            </button>
                        )
                    )}

                    <button
                        type="button"
                        disabled={
                            page ===
                            totalPages
                        }
                        onClick={() =>
                            setPage(
                                (value) =>
                                    value + 1
                            )
                        }
                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        →
                    </button>

                </div>
            )}

        </div>
    );
};

export default CategoriesList;