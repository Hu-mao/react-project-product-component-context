import {
    createContext,
    useContext,
    useReducer,
    type ReactNode
} from "react";

import type { ProductType } from "@/types/ProductType";

type CartItem = ProductType & {
    quantity: number;
};

type CartState = {
    cart: CartItem[];
};

type CartAction =
    | {
    type: "ADD_TO_CART";
    payload: ProductType;
}
    | {
    type: "REMOVE_FROM_CART";
    payload: number;
}
    | {
    type: "INCREASE_QUANTITY";
    payload: number;
}
    | {
    type: "DECREASE_QUANTITY";
    payload: number;
}
    | {
    type: "CLEAR_CART";
};

const initialState: CartState = {
    cart: []
};

function cartReducer(
    state: CartState,
    action: CartAction
): CartState {

    switch (action.type) {

        case "ADD_TO_CART": {
            const existingProduct = state.cart.find(
                item => item.id === action.payload.id
            );

            if (existingProduct) {
                return {
                    cart: state.cart.map(item =>
                        item.id === action.payload.id
                            ? {
                                ...item,
                                quantity: item.quantity + 1
                            }
                            : item
                    )
                };
            }

            return {
                cart: [
                    ...state.cart,
                    {
                        ...action.payload,
                        quantity: 1
                    }
                ]
            };
        }

        case "REMOVE_FROM_CART":
            return {
                cart: state.cart.filter(
                    item => item.id !== action.payload
                )
            };

        case "INCREASE_QUANTITY":
            return {
                cart: state.cart.map(item =>
                    item.id === action.payload
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                )
            };

        case "DECREASE_QUANTITY":
            return {
                cart: state.cart
                    .map(item =>
                        item.id === action.payload
                            ? {
                                ...item,
                                quantity: item.quantity - 1
                            }
                            : item
                    )
                    .filter(item => item.quantity > 0)
            };

        case "CLEAR_CART":
            return {
                cart: []
            };

        default:
            return state;
    }
}

type CartContextType = {
    cart: CartItem[];

    addToCart: (product: ProductType) => void;
    removeFromCart: (productId: number) => void;
    increaseQuantity: (productId: number) => void;
    decreaseQuantity: (productId: number) => void;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({
                                 children
                             }: {
    children: ReactNode;
}) {
    const [state, dispatch] = useReducer(
        cartReducer,
        initialState
    );

    const addToCart = (product: ProductType) => {
        dispatch({
            type: "ADD_TO_CART",
            payload: product
        });
    };

    const removeFromCart = (productId: number) => {
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: productId
        });
    };

    const increaseQuantity = (productId: number) => {
        dispatch({
            type: "INCREASE_QUANTITY",
            payload: productId
        });
    };

    const decreaseQuantity = (productId: number) => {
        dispatch({
            type: "DECREASE_QUANTITY",
            payload: productId
        });
    };

    const clearCart = () => {
        dispatch({
            type: "CLEAR_CART"
        });
    };

    return (
        <CartContext.Provider
            value={{
                cart: state.cart,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }

    return context;
}