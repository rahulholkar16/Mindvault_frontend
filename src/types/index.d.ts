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
    isRefreshing: boolean;
    error: string | null;
    success: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<boolean>;
    refreshAccessToken: () => Promise<boolean>;
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
    type: NoteType | undefined;
    title: string;
    url?: string;
    description: string;
    date: string;
}

interface Content {
    "_id": string,
    "title": string,
    "url"?: string,
    "tags"?: [],
    "type"?: NoteType | undefined,
    "description": string,
    "userId": string,
    "isPublic"?: boolean,
    "createdAt": string
}

interface ContentState {
    content: Content[] | null;
    loading: boolean;
    error: string | null;

    getContent: () => Proise<boolean>;
    createContent: (title: string, url?: string, description?: string, type: NoteType) => Promise<boolean>;
}

interface NotesEditorProp {
    isSidebarOpen: boolean;
    setAddForm: Dispatch<SetStateAction<boolean>>;
}

export type NoteType = 'document' | 'tweet' | 'video' | 'url';
