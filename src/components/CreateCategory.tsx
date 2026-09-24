import { useForm } from "react-hook-form";
import { useAuth } from "@/components/AuthContext";

type CategoryFormData = {
    name: string;
    slug: string;
    parentId: string;
    image: FileList;
};

type CreateCategoryProps = {
    onCreated: () => void;
};

const SERVER =
    import.meta.env.VITE_PATH_TO_SERVER;

const API =
    import.meta.env.VITE_PATH_TO_API;

export default function CreateCategory({
                                           onCreated
                                       }: CreateCategoryProps) {
    const { accessToken } = useAuth();

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<CategoryFormData>();

    const onSubmit = async (
        data: CategoryFormData
    ) => {
        if (!accessToken) {
            alert(
                "Для створення категорії потрібно увійти в акаунт."
            );
            return;
        }

        const formData = new FormData();

        formData.append(
            "Name",
            data.name
        );

        formData.append(
            "Slug",
            data.slug
        );

        if (data.parentId) {
            formData.append(
                "ParentId",
                data.parentId
            );
        }

        if (
            data.image &&
            data.image.length > 0
        ) {
            formData.append(
                "Image",
                data.image[0]
            );
        }

        try {
            const response = await fetch(
                `${SERVER}${API}Category`,
                {
                    method: "POST",
                    headers: {
                        Authorization:
                            `Bearer ${accessToken}`
                    },
                    body: formData
                }
            );

            if (!response.ok) {
                const message =
                    await response.text();

                throw new Error(
                    message ||
                    "Не вдалося створити категорію"
                );
            }

            reset();

            alert(
                "Категорію успішно створено!"
            );

            onCreated();

        } catch (error) {
            console.error(error);

            alert(
                error instanceof Error
                    ? error.message
                    : "Помилка створення категорії"
            );
        }
    };

    return (
        <div className="mb-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-md">

            <h2 className="mb-6 text-2xl font-bold text-gray-800">
                Створити категорію
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-5 md:grid-cols-2"
            >

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Назва
                    </label>

                    <input
                        type="text"
                        placeholder="Наприклад: Смартфони"
                        {...register("name", {
                            required:
                                "Введіть назву категорії"
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
                        Slug
                    </label>

                    <input
                        type="text"
                        placeholder="smartphones"
                        {...register("slug", {
                            required:
                                "Введіть slug"
                        })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    {errors.slug && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.slug.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        ID батьківської категорії
                    </label>

                    <input
                        type="number"
                        placeholder="Не обов'язково"
                        {...register("parentId")}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Зображення
                    </label>

                    <input
                        type="file"
                        accept="image/*"
                        {...register("image")}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
                    />
                </div>

                <div className="md:col-span-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSubmitting
                            ? "Створення..."
                            : "Створити категорію"}
                    </button>
                </div>

            </form>
        </div>
    );
}