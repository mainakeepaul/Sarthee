import axios from "axios";  

export const httpAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000", // "" works in dev for same origin
  headers: {
    "Content-Type": "application/json",
  },
});