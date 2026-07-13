import { useEffect, useState } from "react";
import type { CategoryType } from "@/types/CategoryType";
import Category from "@/components/Category";

import Menu from "@/components/Menu.tsx";

const CategoriesList = () => {
    const URL = import.meta.env.VITE_PATH_TO_SERVER+import.meta.env.VITE_PATH_TO_API+'category'
    const [categories, setCategories] = useState<CategoryType[]>([]);

    useEffect(() => {
        fetch(URL)
            .then((res) => res.json())
            .then((data: CategoryType[]) => {
                setCategories(data);
            });
    }, []);

    if (categories.length === 0) {
        return (
            <p className="text-center text-gray-500 text-lg mt-10">
                List is empty
            </p>
        );
    }

    return (
        <div className="mx-auto max-w-7xl p-6">
            <Menu title="Categories" />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categories.map((category) => (
                    <Category
                        key={category.id}
                        category={category}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoriesList;