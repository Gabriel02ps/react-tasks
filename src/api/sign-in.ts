import { api } from "@/lib/axios";

export interface SignInBody {
  email: string;
  password: string;
}

export async function signIn({ email, password }: SignInBody) {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const token = response.data.token;

    saveTokenToCookies(token);

    return token; 
  } catch (error) {
    console.error("Erro durante o login:", error);
    throw error; 
  }
}

function saveTokenToCookies(token: string, expirationDays: number = 7) {
  const date = new Date();
  date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000); // Expiração em dias
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `authToken=${token}; ${expires}; path=/; Secure; SameSite=Strict`;
}
