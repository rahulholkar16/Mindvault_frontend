import { create } from "zustand";
import { api } from "../../lib/api";
import type { ContentState } from "../../types";

export const useContent = create<ContentState>((set, get) => ({
    content: [],
    status: false,
    error: null,

    fetchAll: async () => {
        if (get().status === "loading") return;
        set({ status: "loading", error: null });
        try {
            const res = await api.get("/auth/content");
            set({ content: res.data.data, status: "success" });
        } catch (err: any) {
            set({
                error: err.response?.data?.message || "Failed to load",
                status: "error",
            });
        }
    },

    fetchByType: async (type) => {
        set({ status: "loading", error: null });
        try {
            const res = await api.get(`/auth/content/${type}`);
            set({ content: res.data.data, status: "success" });
        } catch (err: any) {
            set({
                error: err.response?.data?.message,
                status: "error",
            });
        }
    },

    create: async (title, url, description, type) => {
        set({
            status: "loading"
        })
        try {
            const res = await api.post("/auth/content", {title, url, description, type});
            set({
                status: "success",
                error: null
            })
            return true;
        } catch (err: any) {
            // rollback
            set({
                error: err.response?.data?.message,
                status: "error"
            });
            return false;
        }
    },
}));