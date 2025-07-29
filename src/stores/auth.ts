import { defineStore } from 'pinia'
import authApi from '@/plugins/authApi'

function parseJwt(token: string): any | null {
  try {
    const base64Payload = token.split('.')[1]
    const jsonPayload = atob(base64Payload)
    return JSON.parse(jsonPayload)
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
  }),
  getters: {
    isAuthenticated: (state) => {
      if (!state.token) return false

      const payload = parseJwt(state.token)

      if (!payload) return false

      const isExpired = Date.now() >= payload.exp * 1000
      const roleClaim =
        payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
      const isAdmin =
        roleClaim === 'Admin' ||
        (Array.isArray(roleClaim) && roleClaim.includes('Admin'))
            return !isExpired && isAdmin
          },
        },
  actions: {
    async login(username: string, password: string) {
      const res = await authApi.post('/login', { username, password })
      const token = res.data.token
      const roles = res.data.roles || []
      localStorage.setItem('token', token)
      this.token = token
      
      if (roles.includes('Admin')) {
        window.location.href = '/'
      } else {
        const redirectUrl = import.meta.env.VITE_CLIENT_REDIRECT_URL
        window.location.href = `${redirectUrl}?token=${encodeURIComponent(token)}`
      }
    },
    logout() {
      this.token = ''
      localStorage.removeItem('token')
    },
    validateToken() {
      if (!this.token) return false

      const payload = parseJwt(this.token)
      if (!payload) {
        this.logout()
        return false
      }

      const isExpired = Date.now() >= payload.exp * 1000
      const isAdmin = payload.role === 'Admin' || (Array.isArray(payload.role) && payload.role.includes('Admin'))

      if (isExpired || !isAdmin) {
        this.logout()
        return false
      }

      return true
    },
  },
})
