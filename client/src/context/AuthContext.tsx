import { createContext } from "react";
import type { User, RegisterCredentials } from "@/types/user";

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (credentials: {email: string; password: string}) => Promise<void>;
    register: (userData: RegisterCredentials) => Promise<void>;
    logout: () => void;
}

// Initialize the AuthContext with undefined to enforce type safety
export const AuthContext = createContext<AuthContextType | undefined>(undefined);