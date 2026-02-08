// lib/api.ts
import axios from "axios";

export const api = axios.create({
    baseURL: "https://mindvault-blond.vercel.app/api/v1",
    withCredentials: true,
});