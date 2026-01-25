import type { ReactNode } from "react";

interface ButtonProp {
    text: string;
    color: "primary" | "secondary" | "danger" | "success";
    size: "small" | "large";
    onClick?: () => void;
    disabled: boolean;
    children?: ReactNode;
}

interface Featurs {
    title: string;
    description: string;
    children: ReactNode;
}

interface User {
    _id: string;
    name: string;
    email: string;
}

interface AuthState {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    error: string | null;
    success: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<boolean>;
}