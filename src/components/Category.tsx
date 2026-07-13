import type { CategoryType } from "@/types/CategoryType";


const Category = ({ category }: {category:CategoryType}) => {
    const imageUrl = import.meta.env.VITE_PATH_TO_SERVER+
        import.meta.env.VITE_PATH_TO_IMAGE+'/'+category.url;

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition hover:shadow-xl">
            <img
                src={imageUrl}
                alt={category.name}
                className="h-52 w-full object-cover"
            />

            <div className="p-5">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">
                        {category.name}
                    </h2>

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                        #{category.id}
                    </span>
                </div>

                <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <p>
                        <span className="font-semibold">Slug:</span>{" "}
                        {category.slug}
                    </p>

                    <p>
                        <span className="font-semibold">Parent:</span>{" "}
                        {category.parentId ?? "Root"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Category;