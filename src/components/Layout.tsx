import { Outlet, Link } from "react-router";
import { useAuth } from "@/components/AuthContext";

export default function Layout() {
    const { email, accessToken, logout } = useAuth();

    return (
        <>
            <header>
                <Link to="/">Home</Link>{" "}
                <Link to="/Products">Products</Link>{" "}
                <Link to="/Contacts">Contacts</Link>{" "}
                <Link to="/search">Search</Link>

                <div>
                    {accessToken ? (
                        <>
                            <span>
                                Welcome, {email}
                            </span>{" "}

                            <button onClick={logout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                Login
                            </Link>{" "}

                            <Link to="/register">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    );
}