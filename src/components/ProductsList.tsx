// import Product from "./Product";
// import { useProducts } from "../hooks/useProducts";
//
// const ProductsList = () => {
//     const { products } = useProducts();
//
//     if (products.length === 0) {
//         return (
//             <div className="p-8 text-center text-gray-500">
//                 Список товарів порожній
//             </div>
//         );
//     }
//
//     return (
//         <div className="mx-auto max-w-10xl p-6">
//             <div className="flex flex-wrap gap-6 p-8 justify-center">
//                {products.map((product) => (
//                    <Product key={product.id} product={product} />
//                ))}
//             </div>
//         </div>
//     );
// };
//
// export default ProductsList;


// import Product from "./Product";
// import { useProducts } from "../hooks/useProducts";
//
// const ProductsList = () => {
//     const { products, loading } = useProducts();
//
//     if (loading) {
//         return (
//             <div className="flex justify-center items-center py-10">
//                 <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
//             </div>
//         );
//     }
//
//     if (products.length === 0) {
//         return (
//             <div className="p-8 text-center text-gray-500">
//                 Список товарів порожній
//             </div>
//         );
//     }
//
//     return (
//         <div className="mx-auto max-w-7xl p-6">
//             <div className="flex flex-wrap gap-6 p-8 justify-center">
//                 {products.map((product) => (
//                     <Product
//                         key={product.id}
//                         product={product}
//                     />
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// export default ProductsList;

import {
    lazy,
    Suspense
} from "react";

import { useProducts } from "../hooks/useProducts";

import Loader from "./Loader";

const Product = lazy(() => import("./Product"));

const ProductsList = () => {

    const {
        products,
        loading
    } = useProducts();

    if (loading) {
        return <Loader text="Завантаження продуктів..." />;
    }

    if (products.length === 0) {
        return (
            <div className="p-8 text-center text-gray-500">
                Список товарів порожній
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-10xl p-6">

            <h1 className="mb-6 text-center text-3xl font-bold">
                Продукти
            </h1>

            <div className="flex flex-wrap justify-center gap-6 p-8">

                {products.map((product) => (

                    <Suspense
                        key={product.id}
                        fallback={
                            <Loader text="Завантаження товару..." />
                        }
                    >
                        <Product product={product} />
                    </Suspense>

                ))}

            </div>

        </div>
    );
};

export default ProductsList;
