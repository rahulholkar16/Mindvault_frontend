import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../../lib/api.js";
import type { AuthState } from "../../types";

export const useAuth = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            status: "idle",
            isAuthenticated: false,
            error: null,
            isRefreshing: false,
            shareLink: "",

            initAuth: async () => {
                set({ status: "loading" });
                try {
                    const res = await api.get("/auth/me");
                    set({ user: res.data.data, status: "success", isAuthenticated: true });
                    return true;
                } catch {
                    set({ user: null, status: "error", isAuthenticated: false });
                    return false;
                }
            },

            login: async (email, password) => {
                set({ status: "loading", error: null });

                try {
                    const res = await api.post("/auth/login", { email, password });
                    set({ user: res.data.data.user, status: "success", isAuthenticated: true });
                    // prefetch dashboard
                    import("../../pages/Dashboard");
                    return true;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Login failed",
                        status: "error",
                        isAuthenticated: false
                    });
                    return false;
                }
            },

            logout: async () => {
                try {
                    await api.delete("/auth/logout");
                    set({ user: null, status: "success", isAuthenticated: false });
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message,
                        status: "error"
                    })
                }
            },

            register: async (data) => {
                set({ error: null, status: "loading" });
                try {
        
                    await api.post("/auth/register", data, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    });
                    set({ status: "success", error: null });
                    return true;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || err.response?.data || "Register failed",
                        status: "error",
                    });
                    return false;
                }
            },

            refresh: async () => {
                if (get().isRefreshing) return false;
                set({ isRefreshing: true });
                try {
                    await api.get("/auth/refresh-token");
                    set({ isRefreshing: false, status: "idle", });
                    return true;
                } catch {
                    set({
                        isRefreshing: false,
                        user: null,
                        status: "error",
                    });
                    return false;
                }
            },

            onShare: async () => {
                set({ status: "loading", error: null });
                try {
                    const res = await api.get("/auth/share-link");
                    set({ status: "success", shareLink: res.data?.shareLink});
                    return true;
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message,
                        status: "error"
                    });
                    return false;
                }
            },
        }),
        {
            name: "auth-storage",
        }
    )
);
