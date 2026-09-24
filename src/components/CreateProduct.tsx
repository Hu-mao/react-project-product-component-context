import { useForm } from "react-hook-form";
import { useAuth } from "@/components/AuthContext";
import type { CategoryType } from "@/types/CategoryType";

type ProductFormData = {
    name: string;
    description: string;
    price: number;
    stockQty: number;
    categoryId: number;
    images: string;
};

type CreateProductProps = {
    categories: CategoryType[];
    onCreated: () => void;
};

const SERVER =
    import.meta.env.VITE_PATH_TO_SERVER;

export default function CreateProduct({
                                          categories,
                                          onCreated
                                      }: CreateProductProps) {
    const { accessToken } = useAuth();

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<ProductFormData>({
        defaultValues: {
            price: 0,
            stockQty: 0,
            categoryId:
                categories[0]?.id ?? 0
        }
    });

    const onSubmit = async (
        data: ProductFormData
    ) => {
        const images = data.images
            .split(",")
            .map((image) => image.trim())
            .filter(Boolean);

        try {
            const response = await fetch(
                `${SERVER}api/Product`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",

                        ...(accessToken
                            ? {
                                Authorization:
                                    `Bearer ${accessToken}`
                            }
                            : {})
                    },
                    body: JSON.stringify({
                        name: data.name,
                        description:
                            data.description ||
                            null,
                        price: Number(
                            data.price
                        ),
                        stockQty: Number(
                            data.stockQty
                        ),
                        categoryId: Number(
                            data.categoryId
                        ),
                        images
                    })
                }
            );

            if (!response.ok) {
                const message =
                    await response.text();

                throw new Error(
                    message ||
                    "Не вдалося створити продукт"
                );
            }

            reset({
                name: "",
                description: "",
                price: 0,
                stockQty: 0,
                categoryId:
                    categories[0]?.id ?? 0,
                images: ""
            });

            alert(
                "Продукт успішно створено!"
            );

            onCreated();

        } catch (error) {
            console.error(error);

            alert(
                error instanceof Error
                    ? error.message
                    : "Помилка створення продукту"
            );
        }
    };

    return (
        <div className="mb-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-md">

            <h2 className="mb-6 text-2xl font-bold text-gray-800">
                Створити продукт
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-5 md:grid-cols-2"
            >

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Назва продукту
                    </label>

                    <input
                        type="text"
                        placeholder="Наприклад: iPhone 17"
                        {...register("name", {
                            required:
                                "Введіть назву продукту"
                        })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Категорія
                    </label>

                    <select
                        {...register(
                            "categoryId",
                            {
                                required:
                                    "Виберіть категорію"
                            }
                        )}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                        <option value="">
                            Виберіть категорію
                        </option>

                        {categories.map(
                            (category) => (
                                <option
                                    key={
                                        category.id
                                    }
                                    value={
                                        category.id
                                    }
                                >
                                    {category.name}
                                </option>
                            )
                        )}
                    </select>

                    {errors.categoryId && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.categoryId.message}
                        </p>
                    )}
                </div>

                <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Опис
                    </label>

                    <textarea
                        rows={4}
                        placeholder="Опис продукту"
                        {...register(
                            "description"
                        )}
                        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Ціна
                    </label>

                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        {...register("price", {
                            required:
                                "Введіть ціну",
                            min: {
                                value: 0,
                                message:
                                    "Ціна не може бути від'ємною"
                            }
                        })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    {errors.price && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.price.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Кількість
                    </label>

                    <input
                        type="number"
                        min="0"
                        {...register(
                            "stockQty",
                            {
                                required:
                                    "Введіть кількість",
                                min: {
                                    value: 0,
                                    message:
                                        "Кількість не може бути від'ємною"
                                }
                            }
                        )}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    {errors.stockQty && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.stockQty.message}
                        </p>
                    )}
                </div>

                <div className="md:col-span-2">
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Зображення
                    </label>

                    <input
                        type="text"
                        placeholder="https://site.com/image.jpg, https://site.com/image2.jpg"
                        {...register("images")}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <p className="mt-1 text-xs text-gray-500">
                        Якщо декілька URL — розділіть їх комою.
                    </p>
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={
                            isSubmitting ||
                            categories.length === 0
                        }
                        className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSubmitting
                            ? "Створення..."
                            : "Створити продукт"}
                    </button>
                </div>

            </form>
        </div>
    );
}