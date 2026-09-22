
import {type FormEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext.tsx';

const API_URL = "https://localhost:7000";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error("Помилка авторизації");
            }

            const data = await response.json();

            login(
                data.accessToken,
                data.refreshToken,
                email
            );

            navigate("/");
        } catch {
            setError("Неправильний email або пароль");
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-gray-100 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">

                <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
                    Авторизація
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                >
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md active:scale-[0.99]"
                    >
                        Увійти
                    </button>

                    {error && (
                        <p className="rounded-lg bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
                            {error}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
