import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Header() {
    const { email, accessToken, logout } = useAuth();

    return (
        <header>
            <Link to="/">Home</Link>{" "}
            <Link to="/categories">Categories</Link>{" "}
            <Link to="/products">Products</Link>{" "}

            {accessToken ? (
                <>
                    <span>Welcome, {email}</span>{" "}
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/login">Login</Link>{" "}
                    <Link to="/register">Register</Link>
                </>
            )}
        </header>
    );
}