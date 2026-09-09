import { useForm } from "react-hook-form";
type RegisterFormData = {
    email: string;
    password: string;
    confirmPassword: string;
};
export default function Register() {
    const { register, handleSubmit } = useForm<RegisterFormData>();

    const onSubmit = (data: RegisterFormData) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">Email:</label>

            <input type="email" {...register("email")} />
            <label htmlFor="password">Password:</label>

            <input type="password" {...register("password")} />
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" {...register("confirmPassword")} />
            <button type="submit">Register</button>
        </form>
    );
}