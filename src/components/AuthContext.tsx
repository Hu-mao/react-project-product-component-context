import {
    createContext,
    useContext,
    useState,
    ReactNode
} from "react";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    email: string | null;

    login: (
        accessToken: string,
        refreshToken: string,
        email: string
    ) => void;

    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
                                 children
                             }: {
    children: ReactNode;
}) {
    const [accessToken, setAccessToken] =
        useState<string | null>(
            localStorage.getItem("accessToken")
        );

    const [refreshToken, setRefreshToken] =
        useState<string | null>(
            localStorage.getItem("refreshToken")
        );

    const [email, setEmail] =
        useState<string | null>(
            localStorage.getItem("email")
        );

    const login = (
        newAccessToken: string,
        newRefreshToken: string,
        newEmail: string
    ) => {
        localStorage.setItem(
            "accessToken",
            newAccessToken
        );

        localStorage.setItem(
            "refreshToken",
            newRefreshToken
        );

        localStorage.setItem(
            "email",
            newEmail
        );

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
        setEmail(newEmail);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("email");

        setAccessToken(null);
        setRefreshToken(null);
        setEmail(null);
    };

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                refreshToken,
                email,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}