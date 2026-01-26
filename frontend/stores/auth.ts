import { defineStore } from "pinia";
import {
  type User,
  type LoginCredentials,
  type RegisterData,
  UserRole,
} from "~/types/auth";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  _initialized: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false,
    _initialized: false,
  }),

  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated,
  },

  actions: {
    async loginDummy(credentials: LoginCredentials) {
      const config = useRuntimeConfig();

      try {
        // const response = await $fetch<{ user: User; token: string }>(
        //   `${config.public.apiBase}/auth/login`,
        //   {
        //     method: "POST",
        //     body: credentials,
        //   },
        // );

        this.user = {
          id: "1",
          email: "x6H8K@example.com",
          fullName: "John Doe",
          role: UserRole.ADMIN,
          department: "IT",
          createdAt: "2022-01-01",
          updatedAt: "2022-01-01",
        };
        this.token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";
        this.isAuthenticated = true;

        // Store token and user in cookies
        const tokenCookie = useCookie("auth-token", {
          maxAge: credentials.rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24, // 30 days or 1 day
        });
        tokenCookie.value = this.token;

        const userCookie = useCookie("auth-user", {
          maxAge: credentials.rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
        });
        userCookie.value = JSON.stringify(this.user);
      } catch (error: any) {
        throw new Error(error.data?.message || "Login failed");
      }
    },
    async login(credentials: LoginCredentials) {
      const config = useRuntimeConfig();

      try {
        const response = await $fetch<{ user: User; token: string }>(
          `${config.public.apiBase}/auth/login`,
          {
            method: "POST",
            body: credentials,
          },
        );

        this.user = response.user;
        this.token = response.token;
        this.isAuthenticated = true;

        // Store token in cookie
        const tokenCookie = useCookie("auth-token", {
          maxAge: credentials.rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24, // 30 days or 1 day
        });
        tokenCookie.value = response.token;

        return response;
      } catch (error: any) {
        throw new Error(error.data?.message || "Login failed");
      }
    },

    async register(data: RegisterData) {
      const config = useRuntimeConfig();

      try {
        const response = await $fetch<{ user: User; token: string }>(
          `${config.public.apiBase}/auth/register`,
          {
            method: "POST",
            body: data,
          },
        );

        this.user = response.user;
        this.token = response.token;
        this.isAuthenticated = true;

        const tokenCookie = useCookie("auth-token");
        tokenCookie.value = response.token;

        const userCookie = useCookie("auth-user");
        userCookie.value = JSON.stringify(response.user);

        return response;
      } catch (error: any) {
        throw new Error(error.data?.message || "Registration failed");
      }
    },

    async logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;

      const tokenCookie = useCookie("auth-token");
      tokenCookie.value = null;

      const userCookie = useCookie("auth-user");
      userCookie.value = null;

      await navigateTo("/auth/login");
    },

    async fetchUserDummy() {
      this.user = {
        id: "1",
        email: "x6H8K@example.com",
        fullName: "John Doe",
        role: UserRole.ADMIN,
        department: "IT",
        createdAt: "2022-01-01",
        updatedAt: "2022-01-01",
      };
      this.token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30";
      this.isAuthenticated = true;
    },
    async fetchUser() {
      const tokenCookie = useCookie("auth-token");
      const userCookie = useCookie("auth-user");

      if (!tokenCookie.value || !userCookie.value) {
        this._initialized = true;
        return;
      }

      try {
        this.user = JSON.parse(userCookie.value);
        this.token = tokenCookie.value;
        this.isAuthenticated = true;
        this._initialized = true;
      } catch (error) {
        this._initialized = true;
        this.logout();
      }
    },

    async forgotPassword(email: string) {
      const config = useRuntimeConfig();

      try {
        await $fetch(`${config.public.apiBase}/auth/forgot-password`, {
          method: "POST",
          body: { email },
        });
      } catch (error: any) {
        throw new Error(error.data?.message || "Failed to send reset email");
      }
    },

    async resetPassword(token: string, password: string) {
      const config = useRuntimeConfig();

      try {
        await $fetch(`${config.public.apiBase}/auth/reset-password`, {
          method: "POST",
          body: { token, password },
        });
      } catch (error: any) {
        throw new Error(error.data?.message || "Failed to reset password");
      }
    },
  },
});
