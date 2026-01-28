import { create } from "zustand";
import type { AuthState } from "../../types";
import axios from "axios";
import { persist } from "zustand/middleware";

export const useAuth = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            loading: false,
            error: null,
            isRefreshing: false,
            isAuthenticated: false,
            success: false,

            login: async (email, password) => {
                try {
                    set({ loading: true, error: null });
                    const res = await axios.post(
                        "http://localhost:3000/api/v1/auth/login",
                        { email, password },
                        { withCredentials: true },
                    );

                    set({
                        user: res.data,
                        isAuthenticated: true,
                        loading: false,
                    });
                    return true;
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message,
                        loading: false,
                    });
                    return false;
                }
            },

            logout: async () => {
                await axios.delete("http://localhost:3000/api/v1/auth/logout", {
                    withCredentials: true,
                });
                set({
                    user: null,
                    isAuthenticated: false,
                });
            },

            register: async (email, password, name) => {
                try {
                    set({
                        loading: true,
                        error: null,
                    });
                    await axios.post(
                        "http://localhost:3000/api/v1/auth/register",
                        { name, email, password },
                        { withCredentials: true },
                    );
                    set({
                        loading: false,
                        success: true,
                    });
                    return true;
                } catch (error: any) {
                    set({
                        error: error.response?.data?.message,
                        loading: false,
                    });
                    return false;
                }
            },

            checkAuth: async () => {
                try {
                    console.log("Hello");
                    const res = await axios.get("http://localhost:3000/api/v1/auth/me", {withCredentials: true});
                    set({
                        user: res.data.user,
                        isAuthenticated: true,
                    })
                    return true;
                } catch (error: any) {
                    set({
                        user: null,
                        isAuthenticated: false,
                    })
                    return false;
                }
            },

            refreshAccessToken: async () => {
                try {
                    set({ isRefreshing: true })
                    await axios.get("http://localhost:3000/api/v1/auth/refresh-token", { withCredentials: true });
                    set({ isRefreshing: false })
                    return true
                } catch {
                    set({
                        isRefreshing: false,
                        user: null,
                        isAuthenticated: false,
                    })
                    return false
                }
            },
        }),
        {
            name: "auth-storage",
            partialize: (s) => ({
                user: s.user,
                isAuthenticated: s.isAuthenticated
            }),
        },
    ),
);
