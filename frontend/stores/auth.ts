import { defineStore } from 'pinia'
import type { User, LoginCredentials, RegisterData } from '~/types/auth'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: null,
    isAuthenticated: false
  }),

  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated
  },

  actions: {
    async login(credentials: LoginCredentials) {
      const config = useRuntimeConfig()

      try {
        const response = await $fetch<{ user: User; token: string }>(`${config.public.apiBase}/auth/login`, {
          method: 'POST',
          body: credentials
        })

        this.user = response.user
        this.token = response.token
        this.isAuthenticated = true

        // Store token in cookie
        const tokenCookie = useCookie('auth-token', {
          maxAge: credentials.rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 // 30 days or 1 day
        })
        tokenCookie.value = response.token

        return response
      } catch (error: any) {
        throw new Error(error.data?.message || 'Login failed')
      }
    },

    async register(data: RegisterData) {
      const config = useRuntimeConfig()

      try {
        const response = await $fetch<{ user: User; token: string }>(`${config.public.apiBase}/auth/register`, {
          method: 'POST',
          body: data
        })

        this.user = response.user
        this.token = response.token
        this.isAuthenticated = true

        const tokenCookie = useCookie('auth-token')
        tokenCookie.value = response.token

        return response
      } catch (error: any) {
        throw new Error(error.data?.message || 'Registration failed')
      }
    },

    async logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false

      const tokenCookie = useCookie('auth-token')
      tokenCookie.value = null

      await navigateTo('/auth/login')
    },

    async fetchUser() {
      const config = useRuntimeConfig()
      const tokenCookie = useCookie('auth-token')

      if (!tokenCookie.value) {
        return
      }

      try {
        const user = await $fetch<User>(`${config.public.apiBase}/auth/me`, {
          headers: {
            Authorization: `Bearer ${tokenCookie.value}`
          }
        })

        this.user = user
        this.token = tokenCookie.value
        this.isAuthenticated = true
      } catch (error) {
        this.logout()
      }
    },

    async forgotPassword(email: string) {
      const config = useRuntimeConfig()

      try {
        await $fetch(`${config.public.apiBase}/auth/forgot-password`, {
          method: 'POST',
          body: { email }
        })
      } catch (error: any) {
        throw new Error(error.data?.message || 'Failed to send reset email')
      }
    },

    async resetPassword(token: string, password: string) {
      const config = useRuntimeConfig()

      try {
        await $fetch(`${config.public.apiBase}/auth/reset-password`, {
          method: 'POST',
          body: { token, password }
        })
      } catch (error: any) {
        throw new Error(error.data?.message || 'Failed to reset password')
      }
    }
  }
})
