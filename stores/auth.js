import { defineStore } from 'pinia'

const STORAGE_KEY = 'library-auth-session'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),
  getters: {
    loggedIn: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === 'admin'
  },
  actions: {
    loadSession() {
      if (process.client) {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
          this.user = JSON.parse(raw)
        }
      }
    },
    saveSession() {
      if (process.client) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.user))
      }
    },
    logout() {
      this.user = null
      if (process.client) {
        localStorage.removeItem(STORAGE_KEY)
      }
    },
    async login(username, password) {
      const config = useRuntimeConfig()
      const response = await fetch(`${config.public.apiBase}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      if (!response.ok) {
        const error = await response.json().catch(() => null)
        throw new Error(error?.message || 'Login failed')
      }
      this.user = await response.json()
      this.saveSession()
      return this.user
    },
    async register(name, email, membershipId, password) {
      const config = useRuntimeConfig()
      const response = await fetch(`${config.public.apiBase}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, membershipId, password })
      })
      if (!response.ok) {
        const error = await response.json().catch(() => null)
        throw new Error(error?.message || 'Registration failed')
      }
      this.user = await response.json()
      this.saveSession()
      return this.user
    }
  }
})