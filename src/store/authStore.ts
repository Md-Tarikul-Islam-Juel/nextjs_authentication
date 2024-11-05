import { login as authLogin, verifyOtp } from "@/services/authService";
import { LoginResponse, User } from "@/types/login.types";
import { create } from "zustand";

interface AuthState {
  verifyOtp: any;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  initializeUser: () => void; // New function to load user from localStorage
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,

  initializeUser: () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      set({ user: JSON.parse(storedUser) });
    }
  },

  login: async (email: string, password: string) => {
    try {
      //getting data from api
      const response: LoginResponse = await authLogin(email, password);
      //update state
      set({ user: response.data.user });
      //store in local db
      localStorage.setItem("accessToken", response.tokens.accessToken);
      localStorage.setItem("refreshToken", response.tokens.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Failed to login. Please check your credentials.");
    }
  },

  verifyOtp: async (email: string, otp: string) => {
    try {
      //getting data from api
      const response = await verifyOtp(email, otp); // Ensure you import verifyOtp from your service
      //update state
      set({ user: response.data.user });
      //store in local db
      localStorage.setItem("accessToken", response.tokens.accessToken);
      localStorage.setItem("refreshToken", response.tokens.refreshToken);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      console.error("OTP verification failed:", error);
      throw new Error("Failed to verify OTP. Please try again.");
    }
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },
}));

export default useAuthStore;
