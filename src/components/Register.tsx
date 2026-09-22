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
        <div className="auth-container">
            <form
                className="auth-form"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2>Register</h2>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        {...register("email")}
                    />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        {...register("password")}
                    />
                </div>

                <div className="form-group">
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        {...register("confirmPassword")}
                    />
                </div>

                <button type="submit">
                    Register
                </button>
            </form>
        </div>
    );
}