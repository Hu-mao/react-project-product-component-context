import { useCart } from "@/components/CartStore";

export default function Cart() {

    const {
        cart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart
    } = useCart();

    const total = cart.reduce(
        (sum, item) =>
            sum + item.price * item.quantity,
        0
    );

    if (cart.length === 0) {
        return (
            <div className="rounded-2xl bg-white p-10 text-center shadow">
                <h1 className="text-3xl font-bold">
                    Кошик порожній
                </h1>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                    Кошик
                </h1>

                <button
                    onClick={clearCart}
                    className="rounded-lg bg-red-600 px-4 py-2 text-white"
                >
                    Очистити кошик
                </button>
            </div>

            <div className="space-y-4">

                {cart.map(item => (
                    <div
                        key={item.id}
                        className="flex items-center justify-between rounded-xl bg-white p-5 shadow"
                    >

                        <div>
                            <h2 className="text-xl font-bold">
                                {item.name}
                            </h2>

                            <p className="text-gray-500">
                                {item.price} ₴
                            </p>
                        </div>

                        <div className="flex items-center gap-3">

                            <button
                                onClick={() =>
                                    decreaseQuantity(item.id)
                                }
                                className="rounded-lg bg-gray-200 px-3 py-1"
                            >
                                −
                            </button>

                            <span className="font-bold">
                                {item.quantity}
                            </span>

                            <button
                                onClick={() =>
                                    increaseQuantity(item.id)
                                }
                                className="rounded-lg bg-gray-200 px-3 py-1"
                            >
                                +
                            </button>

                        </div>

                        <span className="font-bold">
                            {item.price * item.quantity} ₴
                        </span>

                        <button
                            onClick={() =>
                                removeFromCart(item.id)
                            }
                            className="rounded-lg bg-red-100 px-3 py-2 text-red-600"
                        >
                            Видалити
                        </button>

                    </div>
                ))}

            </div>

            <div className="rounded-xl bg-white p-5 text-right shadow">
                <span className="text-2xl font-bold">
                    Разом: {total} ₴
                </span>
            </div>

        </div>
    );
}