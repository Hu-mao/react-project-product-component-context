import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import AuthModal from "./AuthModal";
import { useAuth } from "./AuthContext";

type RegisterFormData = {
    email: string;
    password: string;
    confirmPassword: string;
};

interface RegisterProps {
    onClose: () => void;
}

export default function Register({ onClose }: RegisterProps) {
    const {
        register,
        handleSubmit
    } = useForm<RegisterFormData>();

    const navigate = useNavigate();
    const { login } = useAuth();

    const onSubmit = async (data: RegisterFormData) => {
        if (data.password !== data.confirmPassword) {
            alert("Паролі не співпадають");
            return;
        }

        try {
            const response = await fetch(
                "https://localhost:7000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: data.email,
                        password: data.password,
                        confirmPassword: data.confirmPassword,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Registration failed");
            }

            const result = await response.json();

            login(
                result.accessToken,
                result.refreshToken,
                data.email
            );

            onClose();
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Помилка реєстрації");
        }
    };

    return (
        <AuthModal onClose={onClose}>
            <form
                className="space-y-6"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2 className="text-center text-3xl font-bold text-gray-900">
                    Реєстрація
                </h2>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Email
                    </label>

                    <input
                        type="email"
                        {...register("email")}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Пароль
                    </label>

                    <input
                        type="password"
                        {...register("password")}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Повторіть пароль
                    </label>

                    <input
                        type="password"
                        {...register("confirmPassword")}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                >
                    Зареєструватися
                </button>
            </form>
        </AuthModal>
    );
}