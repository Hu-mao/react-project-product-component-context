//
// import { useEffect, useState } from "react";
// import type { CategoryType } from "@/types/CategoryType";
// import Category from "@/components/Category";
//
// const CategoriesList = () => {
//     const URL =
//         import.meta.env.VITE_PATH_TO_SERVER +
//         import.meta.env.VITE_PATH_TO_API +
//         "category";
//
//     const [categories, setCategories] = useState<CategoryType[]>([]);
//     const [search, setSearch] = useState("");
//
//     useEffect(() => {
//         fetch(URL)
//             .then((res) => res.json())
//             .then((data: CategoryType[]) => {
//                 setCategories(data);
//             })
//             .catch((error) => {
//                 console.error("Помилка завантаження категорій:", error);
//             });
//     }, []);
//
//     // Категорії верхнього рівня
//     const rootCategories = categories.filter(
//         (category) => category.parentId === null
//     );
//
//     // Пошук
//     const visibleCategories =
//         search.trim() === ""
//             ? rootCategories
//             : categories.filter((category) =>
//                 category.name
//                     .toLowerCase()
//                     .includes(search.toLowerCase())
//             );
//
//     return (
//         <div className="mx-auto max-w-7xl p-6">
//
//             {/* Пошук */}
//             <div className="mb-6">
//                 <input
//                     type="text"
//                     placeholder="Пошук категорії..."
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
//                 />
//             </div>
//
//             {/* Категорії */}
//             {categories.length === 0 ? (
//                 <p className="text-center text-gray-500 text-lg mt-10">
//                     Завантаження...
//                 </p>
//             ) : visibleCategories.length === 0 ? (
//                 <p className="text-center text-gray-500">
//                     Категорію не знайдено
//                 </p>
//             ) : (
//                 <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//                     {visibleCategories.map((category) => (
//                         <Category
//                             key={category.id}
//                             category={category}
//                             categories={categories}
//                         />
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };
//
// export default CategoriesList;

import { useEffect, useState } from "react";
import type { CategoryType } from "@/types/CategoryType";
import Category from "@/components/Category";

const CategoriesList = () => {
    const URL =
        import.meta.env.VITE_PATH_TO_SERVER +
        import.meta.env.VITE_PATH_TO_API +
        "category";

    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(URL)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Помилка завантаження категорій");
                }

                return res.json();
            })
            .then((data: CategoryType[]) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error("Помилка:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Loader
    if (loading) {
        return (
            <div className="flex justify-center items-center py-10">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
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

    return (
        <div className="mx-auto max-w-7xl p-6">

            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Пошук категорії..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
            </div>

            {visibleCategories.length === 0 ? (
                <p className="text-center text-gray-500">
                    Категорію не знайдено
                </p>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {visibleCategories.map((category) => (
                        <Category
                            key={category.id}
                            category={category}
                            categories={categories}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoriesList;