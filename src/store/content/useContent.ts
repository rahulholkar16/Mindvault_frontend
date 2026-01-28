import { create } from "zustand";
import axios from "axios";
import type { ContentState } from "../../types";

export const useContent = create<ContentState>((set) => ({
    content: null,
    loading: false,
    error: null,

    getContent: async () => {
        try {
            set({loading: true, error: null});
            const res = await axios.get("http://localhost:3000/api/v1/auth/content", { withCredentials: true });
            set({
                loading: false,
                content: res?.data?.data,
            });
            return true;
        } catch (error: any) {
            set({
                error: error?.response?.data?.message,
                loading: false
            });
            return false;
        }
    },

    createContent: async (title, url, description, type) => {
        try {
            set({ loading: true, error: null});
            await axios.post("http://localhost:3000/api/v1/auth/content", {
                title,
                description,
                url,
                type,
                // tags
            }, { withCredentials: true });
            set({ loading: false });
            return true;
        } catch (error: any) {
            set({
                loading: false,
                error: error?.response?.data?.message,
            });
            return false;
        }
    },
}));