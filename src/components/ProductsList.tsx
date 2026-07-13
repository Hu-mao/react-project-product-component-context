import Product from "./Product";
import { useProducts } from "../hooks/useProducts";
import Menu from "@/components/Menu.tsx";

const ProductsList = () => {
    const { products } = useProducts();

    if (products.length === 0) {
        return (
            <div className="p-8 text-center text-gray-500">
                Список товарів порожній
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl p-6">
            <Menu title={"Products"} />
            <div className="flex flex-wrap gap-6 p-8 justify-center">
               {products.map((product) => (
                   <Product key={product.id} product={product} />
               ))}
            </div>
        </div>
    );
};

export default ProductsList;
