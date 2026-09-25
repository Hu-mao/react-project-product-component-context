
import { useForm } from "react-hook-form";
import { useAuth } from "./AuthContext";
import AuthModal from "./AuthModal";

type RegisterFormData = {
    email: string;
    password: string;
    confirmPassword: string;
};

interface RegisterProps {
    onClose: () => void;
}

export default function Register({ onClose }: RegisterProps) {
    const { register, handleSubmit } = useForm<RegisterFormData>();
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
                result.refreshToken ?? "",
                data.email
            );

            onClose();
        } catch (error) {
            console.error(error);
            alert("Помилка реєстрації");
        }
    };

    return (
        <AuthModal onClose={onClose}>
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
                Реєстрація
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
            >
                <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

                <input
                    type="password"
                    placeholder="Пароль"
                    {...register("password", { required: true })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

                <input
                    type="password"
                    placeholder="Повторіть пароль"
                    {...register("confirmPassword", { required: true })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />

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

