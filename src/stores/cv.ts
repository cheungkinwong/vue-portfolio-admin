// stores/cvStore.ts
import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useCVStore = defineStore('cv', {
  state: () => ({
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async uploadCV(file: File): Promise<string> {
      this.loading = true
      this.error = null

      const formData = new FormData()
      formData.append('file', file)

      try {
        const res = await api.post('/cv/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })

        return res.data.cvPath // e.g. "/files/cv.pdf"
      } catch (error: any) {
        console.error('CV upload failed:', error)
        this.error = 'Failed to upload CV.'
        throw new Error(error?.response?.data?.message || 'CV upload failed.')
      } finally {
        this.loading = false
      }
    },
  },
})
