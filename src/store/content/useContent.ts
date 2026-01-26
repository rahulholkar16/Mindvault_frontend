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
                content: res?.data,
            });
            return true;
        } catch (error: any) {
            set({
                error: error?.response?.data?.message,
                loading: false
            });
            return false;
        }
    }
}));