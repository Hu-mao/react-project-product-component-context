import { useState } from "react";
import { useNavigate } from "react-router";

const SERVER =
    `${import.meta.env.VITE_PATH_TO_SERVER}${import.meta.env.VITE_PATH_TO_API}`;

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`${SERVER}auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    email,
                    password
                })
            });

            if (!response.ok) {
                throw new Error("Неправильний email або пароль");
            }

            const data = await response.json();

            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("email", email);

            navigate("/");
            window.location.reload();

        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Помилка авторизації"
            );
        }
    };

    return (
        <div className="mx-auto mt-10 max-w-md rounded-lg border p-6 shadow">
            <h2 className="mb-6 text-2xl font-bold">
                Авторизація
            </h2>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
            >
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded border p-3"
                    required
                />

                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded border p-3"
                    required
                />

                {error && (
                    <p className="text-red-500">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="rounded bg-blue-600 p-3 text-white"
                >
                    Увійти
                </button>
            </form>
        </div>
    );
};

export default Login;