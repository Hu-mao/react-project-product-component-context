import type { ProductType } from "@/types/ProductType";
import {useCart} from "@/components/CartStore.tsx";

const Product = ({
                     product
                 }: {
    product: ProductType;
}) => {
    const {
        id,
        name,
        description,
        images,
        isActive,
        categoryId,
        stockQty,
        price
    } = product;
    const { addToCart } = useCart();
    const image =
        images?.length > 0
            ? images[0]
            : "";

    return (
        <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition hover:shadow-xl">

            {image && (
                <img
                    src={image}
                    alt={name}
                    className="h-48 w-full bg-gray-100 object-contain"
                />
            )}

            {!image && (
                <div className="flex h-48 items-center justify-center bg-gray-100 text-gray-400">
                    Немає зображення
                </div>
            )}

            <div className="p-5">

                <div className="flex items-start justify-between gap-3">

                    <h2 className="text-xl font-bold text-gray-800">
                        {name}
                    </h2>

                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                            isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {isActive
                            ? "Активний"
                            : "Неактивний"}
                    </span>

                </div>

                {description && (
                    <p className="mt-3 line-clamp-3 text-sm text-gray-500">
                        {description}
                    </p>
                )}

                <div className="mt-5 space-y-2 text-sm text-gray-600">

                    <div className="flex justify-between">
                        <span>ID:</span>
                        <span className="font-medium">
                            {id}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span>Категорія:</span>
                        <span className="font-medium">
                            {categoryId}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span>Кількість:</span>
                        <span className="font-medium">
                            {stockQty} шт.
                        </span>
                    </div>

                </div>

                <div className="mt-5 flex items-center justify-between">

                    <span className="text-2xl font-bold text-blue-600">
                        {price} ₴
                    </span>

                    <button
                        type="button"
                        onClick={() => addToCart(product)}
                        className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
                    >
                        Додати в кошик
                    </button>

                </div>

            </div>
        </div>
    );
};

export default Product;