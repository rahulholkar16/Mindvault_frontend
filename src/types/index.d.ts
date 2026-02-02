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
    status: "idle" | "loading" | "authenticated" | "unauthenticated" | "success" | "unsuccess";
    isRefreshing: boolean;
    error: string | null | {
        errors: {
            fieldErrors: {
                name?: Array<string>;
                password?: Array<string>;
                email?: Array<string>;
            }
        }
    };

    initAuth: () => Promise<boolean>;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    refresh: () => Promise<boolean>;
    register: (data: FormData) => Promise<boolean>;
}

interface SignupData {
    name: string;
    email: string;
    password: string;
    avatar: File | null;
}

interface SignupDataStore extends SignupData {
    setData: (data: Partial<SignupData>) => void;
    resetData: () => void;
}

interface SidebarProp {
    isOpen: boolean;
    onToggle: () => void
    onProfileOpen: (state: boolean) => void
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
    status: idle | loading | success | error;
    error: string | null;
    myContent: Content[] | null;
    activeProfileTab: string;
    setActiveProfileTab: (tab: string) => void;
    fetchMyContent: () => Promise<boolean>;
    fetchMySpecificContent: (type: string) => Promise<boolean>;
    fetchAll: () => Proise<boolean>;
    fetchByType: (type: string) => Promise<void>;
    create: (title: string, url?: string, description?: string, type: NoteType) => Promise<boolean>;
}

interface NotesEditorProp {
    isSidebarOpen: boolean;
    setAddForm: Dispatch<SetStateAction<boolean>>;
}

export type NoteType = 'document' | 'tweet' | 'video' | 'url';
