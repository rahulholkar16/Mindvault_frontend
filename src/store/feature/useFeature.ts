import { create } from "zustand";
import type { FeatureState } from "../../types";
import { api } from "../../lib/api";

export const useFeature = create<FeatureState>((set) => ({
    status: "idle",
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
}))