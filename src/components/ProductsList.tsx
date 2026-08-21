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
import Product from "./Product";
import { useProducts } from "../hooks/useProducts";

const ProductsList = () => {
    const { products, loading } = useProducts();

    if (loading) {
        return (
            <div className="flex justify-center items-center py-10">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="p-8 text-center text-gray-500">
                Список товарів порожній
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl p-6">
            <div className="flex flex-wrap gap-6 p-8 justify-center">
                {products.map((product) => (
                    <Product
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsList;
