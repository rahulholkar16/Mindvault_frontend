import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../../lib/api.js";
import type { AuthState } from "../../types";

export const useAuth = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            status: "idle",
            error: null,
            isRefreshing: false,
            signupData: {
                name: "",
                email: "",
                password: "",
                avatar: "",
            },

            // ================= INIT =================
            initAuth: async () => {
                if (get().status !== "idle") return false;

                set({ status: "loading" });
                try {
                    const res = await api.get("/auth/me");
                    set({ user: res.data.user, status: "authenticated" });
                    return true;
                } catch {
                    set({ user: null, status: "unauthenticated" });
                    return false;
                }
            },

            // ================= LOGIN =================
            login: async (email, password) => {
                set({ status: "loading", error: null });

                try {
                    const res = await api.post("/auth/login", { email, password });
                    set({ user: res.data.user, status: "authenticated" });
                    // prefetch dashboard
                    import("../../pages/Dashboard");
                    return true;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Login failed",
                        status: "unauthenticated",
                    });
                    return false;
                }
            },

            // ================= LOGOUT =================
            logout: async () => {
                await api.delete("/auth/logout");
                set({ user: null, status: "unauthenticated" });
            },

            // ================= REGISTER =================
            register: async (email, password, name) => {
                set({ status: "loading", error: null });
                try {
                    await api.post("/auth/register", { name, email, password });
                    set({ status: "idle" });
                    return true;
                } catch (err: any) {
                    set({
                        error: err.response?.data?.message || "Register failed",
                        status: "idle",
                    });
                    return false;
                }
            },

            // ================= REFRESH =================
            refresh: async () => {
                if (get().isRefreshing) return false;

                set({ isRefreshing: true });
                try {
                    await api.get("/auth/refresh-token");
                    set({ isRefreshing: false });
                    return true;
                } catch {
                    set({
                        isRefreshing: false,
                        user: null,
                        status: "unauthenticated",
                    });
                    return false;
                }
            },

            setData: (data) =>
                set({
                    signupData: {
                        ...get().signupData,
                        ...data,
                    },
                }),

            resetData: () =>
                set({
                    signupData: {
                        name: "",
                        email: "",
                        password: "",
                        avatar: "",
                    },
                }),
        }),
        {
            name: "auth-storage",
            partialize: (s) => ({ user: s.user }),
        }
    )
);
