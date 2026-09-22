import { type FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import AuthModal from "./AuthModal";

interface LoginProps {
    onClose: () => void;
}

const API_URL = "https://localhost:7000";

export default function Login({ onClose }: LoginProps) {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(
                `${API_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error();
            }

            const data = await response.json();

            login(
                data.accessToken,
                data.refreshToken,
                email
            );

            onClose();
            navigate("/");
        } catch {
            setError("Неправильний email або пароль");
        }
    };

    return (
        <AuthModal onClose={onClose}>
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
                    className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                >
                    Увійти
                </button>

                {error && (
                    <p className="rounded-lg bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-600">
                        {error}
                    </p>
                )}
            </form>
        </AuthModal>
    );
}