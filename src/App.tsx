import { RouterProvider } from "react-router";
import { routes } from "@/routes";
import { AuthProvider } from "@/components/AuthContext";

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={routes} />
        </AuthProvider>
    );
}

export default App;