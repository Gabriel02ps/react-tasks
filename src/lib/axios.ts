import { env } from "@/env"
import axios from "axios"

export const api = axios.create({
  baseURL: env.VITE_API_URL,
})

function getTokenFromCookies(): string | null {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [name, value] = cookie.split("=");
    if (name === "authToken") {
      return value;
    }
  }
  return null; 
}

api.interceptors.request.use((config) => {
  const token = getTokenFromCookies();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});