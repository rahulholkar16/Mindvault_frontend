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
    checkAuth: () => Promise<void>;
    register: (email: string, password: string, name: string) => Promise<boolean>;
}

interface SidebarProp {
    isOpen: boolean;
    onToggle: () => void
}

interface NotesListProp {
    isOpen: boolean;
}

interface CardProp {
    Icon: ReactNode;
    title: string;
    url?: string;
}

interface Content {
    "_id": string,
    "title": string,
    "url"?: string,
    "tags"?: [],
    "type"?: "document" | "video" | "tweets" | "link",
    "userId": string,
    "isPublic"?: boolean
}

interface ContentState {
    content: Content | null;
    loading: boolean;
    error: string | null;

    getContent: () => Promise<boolean>;
}
