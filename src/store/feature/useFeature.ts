import { create } from "zustand";
import type { FeatureState } from "../../types";
import { api } from "../../lib/api";
import { useAuth } from "../auth/useAuth";

export const useFeature = create<FeatureState>((set) => ({
    status: "idle",
    brainContent: null,
    brainUser: null,
    error: null,
    onShare: async () => {
        set({ status: "loading", error: null });
        try {
            const res = await api.get("/auth/share-link");
            set({ status: "success" });
            return res.data?.data.shareLink;
        } catch (error: any) {
            set({
                error: error.response?.data?.message,
                status: "error"
            });
            return false;
        }
    },

    getShare: async (token) => {
        set({ status: "loading", error: null });
        try {
            const res = await api.get(`/auth/share-brain/${token}`);
            set({
                status: "success",
                brainContent: res.data.data.content,
                brainUser: res.data.data.user,
            })
        } catch (error: any) {
            set({
                error: error.response?.data?.message,
                status: "error"
            });
        }
    },

    changeName: async (name) => {
        set({ status: "loading" });
        try {
            const res = await api.post("/auth/change-name", { name });
            useAuth.setState({
                user: res.data.data
            });
            console.log(res.data.data);
            
            set({ status: "success" });
        } catch (error: any) {
            set({
                error: error.response?.data?.message,
                status: "error"
            });
        }
    },

    changeEmail: async (email) => {
        set({ status: "loading" });
        try {
            const res = await api.post("/auth/change-email", { email });
            useAuth.setState({
                user: res.data.data
            });
            set({ status: "success" });
        } catch (error: any) {
            set({
                error: error.response?.data?.message,
                status: "error"
            });
        }
    },
}))