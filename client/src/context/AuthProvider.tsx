import { useState, useMemo, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import { authService } from "@/services/authService";
import type { User, RegisterCredentials } from "@/types/user";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        try {
            return authService.getUser();
        } catch {
            return null;
        }
    });

    const [loading, setLoading] = useState(false);

    const login = async (credentials: {email: string; password: string}) => {
        setLoading(true);
        try {
            const data = await authService.login(credentials);
            setUser(data.user);
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData: RegisterCredentials) => {
        setLoading(true);
        try {
            const data = await authService.register(userData);
            setUser(data.user);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    const value = useMemo(() => ({
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout
    }), [user, loading]);

    return (
        // Provide the context value to children components
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};