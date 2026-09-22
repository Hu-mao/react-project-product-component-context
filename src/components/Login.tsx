// import { useState } from "react";
// import { useNavigate } from "react-router";
//
// const SERVER =
//     `${import.meta.env.VITE_PATH_TO_SERVER}${import.meta.env.VITE_PATH_TO_API}`;
//
// const Login = () => {
//     const navigate = useNavigate();
//
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError("");
//
//         try {
//             const response = await fetch(`${SERVER}auth/login`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 credentials: "include",
//                 body: JSON.stringify({
//                     email,
//                     password
//                 })
//             });
//
//             if (!response.ok) {
//                 throw new Error("Неправильний email або пароль");
//             }
//
//             const data = await response.json();
//
//             localStorage.setItem("accessToken", data.accessToken);
//             localStorage.setItem("email", email);
//
//             navigate("/");
//             window.location.reload();
//
//         } catch (error) {
//             setError(
//                 error instanceof Error
//                     ? error.message
//                     : "Помилка авторизації"
//             );
//         }
//     };
//
//     return (
//         <div className="mx-auto mt-10 max-w-md rounded-lg border p-6 shadow">
//             <h2 className="mb-6 text-2xl font-bold">
//                 Авторизація
//             </h2>
//
//             <form
//                 onSubmit={handleSubmit}
//                 className="flex flex-col gap-4"
//             >
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="rounded border p-3"
//                     required
//                 />
//
//                 <input
//                     type="password"
//                     placeholder="Пароль"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="rounded border p-3"
//                     required
//                 />
//
//                 {error && (
//                     <p className="text-red-500">
//                         {error}
//                     </p>
//                 )}
//
//                 <button
//                     type="submit"
//                     className="rounded bg-blue-600 p-3 text-white"
//                 >
//                     Увійти
//                 </button>
//             </form>
//         </div>
//     );
// };
//
// export default Login;
// import { useState } from "react";
// import { useNavigate } from "react-router";
//
// const SERVER =
//     `${import.meta.env.VITE_PATH_TO_SERVER}${import.meta.env.VITE_PATH_TO_API}`;
//
// const Login = () => {
//     const navigate = useNavigate();
//
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError("");
//
//         try {
//             const response = await fetch(`${SERVER}auth/login`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 credentials: "include",
//                 body: JSON.stringify({
//                     email,
//                     password
//                 })
//             });
//
//             if (!response.ok) {
//                 throw new Error("Неправильний email або пароль");
//             }
//
//             const data = await response.json();
//
//             localStorage.setItem("accessToken", data.accessToken);
//             localStorage.setItem("email", email);
//
//             navigate("/");
//             window.location.reload();
//
//         } catch (error) {
//             setError(
//                 error instanceof Error
//                     ? error.message
//                     : "Помилка авторизації"
//             );
//         }
//     };
//
//     return (
//         <div className="mx-auto mt-10 max-w-md rounded-lg border p-6 shadow">
//             <h2 className="mb-6 text-2xl font-bold">
//                 Авторизація
//             </h2>
//
//             <form
//                 onSubmit={handleSubmit}
//                 className="flex flex-col gap-4"
//             >
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="rounded border p-3"
//                     required
//                 />
//
//                 <input
//                     type="password"
//                     placeholder="Пароль"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="rounded border p-3"
//                     required
//                 />
//
//                 {error && (
//                     <p className="text-red-500">
//                         {error}
//                     </p>
//                 )}
//
//                 <button
//                     type="submit"
//                     className="rounded bg-blue-600 p-3 text-white"
//                 >
//                     Увійти
//                 </button>
//             </form>
//         </div>
//     );
// };
//
// export default Login;
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
        <div>
            <h2>Авторизація</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">
                    Увійти
                </button>

                {error && <p>{error}</p>}
            </form>
        </div>
    );
}