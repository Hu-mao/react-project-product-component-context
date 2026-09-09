//
//
//
// import {
//     useEffect,
//     useState
// } from "react";
//
// import type { CategoryType } from "@/types/CategoryType";
//
// import Category from "@/components/Category";
//
// import Loader from "./Loader";
//
// const CategoriesList = () => {
//
//     const URL =
//         import.meta.env.VITE_PATH_TO_SERVER +
//         import.meta.env.VITE_PATH_TO_API +
//         "category";
//
//     const [categories, setCategories] =
//         useState<CategoryType[]>([]);
//
//     const [search, setSearch] =
//         useState("");
//
//     const [loading, setLoading] =
//         useState(true);
//
//     const [error, setError] =
//         useState<string | null>(null);
//
//
//     useEffect(() => {
//
//         const loadCategories = async () => {
//
//             try {
//
//                 setLoading(true);
//                 setError(null);
//
//                 const response = await fetch(URL);
//
//                 if (!response.ok) {
//                     throw new Error(
//                         "Не вдалося завантажити категорії"
//                     );
//                 }
//
//                 const data: CategoryType[] =
//                     await response.json();
//
//                 setCategories(data);
//
//             } catch (error) {
//
//                 console.error(
//                     "Помилка завантаження категорій:",
//                     error
//                 );
//
//                 setError(
//                     "Не вдалося завантажити категорії"
//                 );
//
//             } finally {
//
//                 setLoading(false);
//
//             }
//         };
//
//         loadCategories();
//
//     }, [URL]);
//
//
//     if (loading) {
//
//         return (
//             <Loader text="Завантаження категорій..." />
//         );
//
//     }
//
//
//     if (error) {
//
//         return (
//             <div className="p-8 text-center">
//
//                 <p className="text-lg text-red-500">
//                     {error}
//                 </p>
//
//             </div>
//         );
//
//     }
//
//
//     const rootCategories =
//         categories.filter(
//             (category) =>
//                 category.parentId === null
//         );
//
//
//     const visibleCategories =
//         search.trim() === ""
//             ? rootCategories
//             : categories.filter(
//                 (category) =>
//                     category.name
//                         .toLowerCase()
//                         .includes(
//                             search.toLowerCase()
//                         )
//             );
//
//
//     return (
//         <div className="mx-auto max-w-7xl p-6">
//
//             <div className="mb-6">
//
//                 <input
//                     type="text"
//                     placeholder="Пошук категорії..."
//                     value={search}
//                     onChange={(e) =>
//                         setSearch(e.target.value)
//                     }
//                     className="
//                         w-full
//                         rounded-lg
//                         border
//                         border-gray-300
//                         px-4
//                         py-3
//                         outline-none
//                         focus:border-blue-500
//                     "
//                 />
//
//             </div>
//
//
//             {visibleCategories.length === 0 ? (
//
//                 <p className="mt-10 text-center text-lg text-gray-500">
//                     Категорію не знайдено
//                 </p>
//
//             ) : (
//
//                 <div
//                     className="
//                         grid
//                         gap-6
//                         sm:grid-cols-2
//                         lg:grid-cols-3
//                         xl:grid-cols-4
//                     "
//                 >
//
//                     {visibleCategories.map(
//                         (category) => (
//
//                             <Category
//                                 key={category.id}
//                                 category={category}
//                                 categories={categories}
//                             />
//
//                         )
//                     )}
//
//                 </div>
//
//             )}
//
//         </div>
//     );
// };
//
// export default CategoriesList;
import { useEffect, useState } from "react";
import type { CategoryType } from "@/types/CategoryType";
import Category from "@/components/Category";
import Loader from "./Loader";

type CategoriesResponse = {
    items: CategoryType[];
    totalPages: number;
    currentPage: number;
};

const PAGE_SIZE = 6;

const CategoriesList = () => {
    const URL =
        import.meta.env.VITE_PATH_TO_SERVER +
        import.meta.env.VITE_PATH_TO_API +
        "category";

    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [allCategories, setAllCategories] = useState<CategoryType[]>([]);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    `${URL}?page=${page}&pageSize=${PAGE_SIZE}`
                );

                if (!response.ok) {
                    throw new Error(
                        "Не вдалося завантажити категорії"
                    );
                }

                const data: CategoriesResponse =
                    await response.json();

                setCategories(data.items);
                setTotalPages(data.totalPages);

            } catch (error) {
                console.error(
                    "Помилка завантаження категорій:",
                    error
                );

                setError(
                    "Не вдалося завантажити категорії"
                );
            } finally {
                setLoading(false);
            }
        };

        loadCategories();
    }, [URL, page]);

    // Окремо отримуємо всі категорії,
    // щоб Category міг знаходити дочірні категорії
    useEffect(() => {
        const loadAllCategories = async () => {
            try {
                const response = await fetch(URL);

                if (!response.ok) {
                    return;
                }

                const data: CategoryType[] =
                    await response.json();

                setAllCategories(data);
            } catch (error) {
                console.error(
                    "Помилка завантаження всіх категорій:",
                    error
                );
            }
        };

        loadAllCategories();
    }, [URL]);

    if (loading) {
        return (
            <Loader text="Завантаження категорій..." />
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

    const rootCategories = categories.filter(
        (category) => category.parentId === null
    );

    const visibleCategories =
        search.trim() === ""
            ? rootCategories
            : categories.filter((category) =>
                category.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );

    const handlePageChange = (newPage: number) => {
        if (
            newPage < 1 ||
            newPage > totalPages
        ) {
            return;
        }

        setPage(newPage);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="mx-auto max-w-7xl p-6">

            {/* Пошук */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Пошук категорії..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                    className="
                        w-full
                        rounded-lg
                        border
                        border-gray-300
                        px-4
                        py-3
                        outline-none
                        focus:border-blue-500
                    "
                />
            </div>

            {/* Категорії */}
            {visibleCategories.length === 0 ? (
                <p className="mt-10 text-center text-lg text-gray-500">
                    Категорію не знайдено
                </p>
            ) : (
                <div
                    className="
                        grid
                        gap-6
                        sm:grid-cols-2
                        lg:grid-cols-3
                        xl:grid-cols-4
                    "
                >
                    {visibleCategories.map((category) => (
                        <Category
                            key={category.id}
                            category={category}
                            categories={allCategories}
                        />
                    ))}
                </div>
            )}

            {/* Пагінація */}
            {totalPages > 1 && (
                <div className="mt-10 flex items-center justify-center gap-2">

                    {/* Назад */}
                    <button
                        onClick={() =>
                            handlePageChange(page - 1)
                        }
                        disabled={page === 1}
                        className="
                            rounded-lg
                            border
                            px-4
                            py-2
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                            hover:bg-gray-100
                        "
                    >
                        ←
                    </button>

                    {/* Номери сторінок */}
                    {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                    ).map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() =>
                                handlePageChange(pageNumber)
                            }
                            className={`
                                rounded-lg
                                border
                                px-4
                                py-2
                                ${
                                page === pageNumber
                                    ? "bg-blue-500 text-white"
                                    : "hover:bg-gray-100"
                            }
                            `}
                        >
                            {pageNumber}
                        </button>
                    ))}

                    {/* Вперед */}
                    <button
                        onClick={() =>
                            handlePageChange(page + 1)
                        }
                        disabled={page === totalPages}
                        className="
                            rounded-lg
                            border
                            px-4
                            py-2
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                            hover:bg-gray-100
                        "
                    >
                        →
                    </button>

                </div>
            )}

            {/* Інформація */}
            {totalPages > 1 && (
                <p className="mt-4 text-center text-sm text-gray-500">
                    Сторінка {page} з {totalPages}
                </p>
            )}
        </div>
    );
};

export default CategoriesList;