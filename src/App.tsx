import ProductsList from "./components/ProductsList";
import CreateProduct from "./components/CreateProduct";
import CategoriesList from "./components/CategoriesList.tsx";
// import {useState} from "react";
// import Timer from "./types/Test.tsx";
function App() {
    return (
        <>
            <CategoriesList />
            <ProductsList />
            <CreateProduct />
        </>
    );
}
// function App() {
//     const [showTimer, setShowTimer] = useState(false);
//
//     return (
//         <div>
//             <button onClick={() => setShowTimer(true)}>Start</button>
//             <button onClick={() => setShowTimer(false)}>Stop</button>
//
//             {showTimer && <Timer />}
//         </div>
//     );
// }

export default App;