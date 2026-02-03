import { create } from "zustand";
import { api } from "../../lib/api";
import type { ContentState } from "../../types";

export const useContent = create<ContentState>((set, get) => ({
    content: [],
    status: false,
    error: null,
    myContent: [],
    activeProfileTab: "All",

    setActiveProfileTab: (tab) => set({ activeProfileTab: tab }),

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

    fetchMyContent: async () => {
        if (get().status === "loading") return false;
        set({ status: "loading", error: null });
        try {
            const res = await api.get("/auth/me/content");
            set({ myContent: res.data.data, status: "success" });
            console.log(res.data.data);
            
            return true;
        } catch (err: any) {
            set({
                error: err.response?.data?.message || "Failed to load",
                status: "error",
            });
            return false;
        }
    },

    fetchMySpecificContent: async (type) => {
        if (get().status === "loading") return false;
        set({ status: "loading", error: null });
        try {
            const res = await api.get(`/auth/me/content/${type}`);
            set({ myContent: res.data.data, status: "success" });
            return true;
        } catch (err: any) {
            set({
                error: err.response?.data?.message || "Failed to load",
                status: "error",
            });
            return false;
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

    delete: async (contentId) => {
        try {
            const res = await api.delete(`/auth/content/${contentId}`);
            set({ status: "success", activeProfileTab: "All" })
        } catch (error: any) {
            set({
                error: error.response?.data?.message,
                status: "error"
            })
        }
    }
}));