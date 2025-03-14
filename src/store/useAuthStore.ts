import users from "@/data/users";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  user: {
    image: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    phone: string;
    country: string;
    token: string;
  } | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (email, password) => {
        const user = users.find(
          (u: { email: string; password: string }) =>
            u.email === email && u.password === password
        );

        if (user) {
          set({
            user: {
              image: user.image,
              email: user.email,
              token: user.token,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
              phone: user.phone,
              country: user.country,
            },
          });
          // Set the authentication token in a cookie
          document.cookie = `auth-token=${user.token}; path=/; max-age=${
            60 * 60
          }`; // Expires in 1 hour
        } else {
          throw new Error("Invalid email or password");
        }
      },
      logout: () => {
        set({ user: null });
        // Clear the authentication token cookie
        document.cookie =
          "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      },
    }),
    {
      name: "auth-storage", // Unique name for the storage
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);
