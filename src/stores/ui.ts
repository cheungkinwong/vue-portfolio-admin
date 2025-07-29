import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    isLoading: false,
    error: '' as string | null,
  }),
  actions: {
    setLoading(value: boolean) {
      this.isLoading = value
    },
    setError(message: string | null) {
      this.error = message
    },
    clearError() {
      this.error = null
    },
  },
})
