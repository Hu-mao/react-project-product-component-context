
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

type RegisterFormData = {
    email: string;
    password: string;
    confirmPassword: string;
};

export default function Register() {
    const { register, handleSubmit } = useForm<RegisterFormData>();
    const navigate = useNavigate();

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

            localStorage.setItem("accessToken", result.accessToken);

            if (result.refreshToken) {
                localStorage.setItem(
                    "refreshToken",
                    result.refreshToken
                );
            }

            localStorage.setItem("email", data.email);

            navigate("/");
        } catch (error) {
            console.error(error);
            alert("Помилка реєстрації");
        }
    };

    return (
        <div className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-gray-100 px-4 py-10">
            <form
                className="w-full max-w-md space-y-6 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2 className="text-center text-3xl font-bold text-gray-900">
                    Register
                </h2>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Email:
                    </label>

                    <input
                        type="email"
                        {...register("email")}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Password:
                    </label>

                    <input
                        type="password"
                        {...register("password")}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                        Confirm Password:
                    </label>

                    <input
                        type="password"
                        {...register("confirmPassword")}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md active:scale-[0.99]"
                >
                    Register
                </button>
            </form>
        </div>
    );
}
