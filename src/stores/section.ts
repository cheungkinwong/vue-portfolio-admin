import { defineStore } from 'pinia'
import api from '@/plugins/axios'
import type { Section } from '@/types/section'

export const useSectionStore = defineStore('section', {
  state: () => ({
    items: [] as Section[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchAll() {
      this.loading = true
      try {
        const res = await api.get('/section')
        this.items = res.data
      } catch (err) {
        this.error = 'Failed to load sections'
      } finally {
        this.loading = false
      }
    },

  async fetchById(id: number): Promise<Section> {
    const res = await api.get(`/section/${id}`)
    const foundIndex = this.items.findIndex(s => s.id === id)
    if (foundIndex !== -1) {
      this.items[foundIndex] = res.data
    } else {
      this.items.push(res.data)
    }
    return res.data
  },

  async update(id: number, model: Section) {
    const res = await api.put(`/section/${id}`, model)

    const index = this.items.findIndex(s => s.id === id)
    if (index !== -1) {
      this.items[index] = res.data
    }
  },

  async uploadImage(id: number, file: File, altText: string): Promise<{ image: string; altText: string }> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('altText', altText)

  try {
    const res = await api.post(`/section/${id}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data 
  } catch (error: any) {
    console.error('Image upload failed:', error)
    this.error = 'Failed to upload image.'
    throw new Error(error?.response?.data?.message || 'Image upload failed.')
  }
}



  },
})
