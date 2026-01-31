import { create } from "zustand";
import type { SignupDataStore } from "../../types";

export const useSingupStore = create<SignupDataStore>((set) => ({
    name: "",
    password: "",
    email: "",
    avatar: null,

    setData: (data) => set(data),
    resetData: () => set({
        name: "",
        email: "",
        password: "",
        avatar: null
    })
}));