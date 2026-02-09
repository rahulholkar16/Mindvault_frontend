// lib/api.ts
import axios from "axios";

export const api = axios.create({
    baseURL: "https://mindvault-sleh.onrender.com/api/v1",
    withCredentials: true,
});