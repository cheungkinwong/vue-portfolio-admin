import { defineStore } from 'pinia'
import api from '@/plugins/axios'
import type { Project } from '@/types/project'

export const useProjectStore = defineStore('project', {
  state: () => ({
    items: [] as Project[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchAll() {
      this.loading = true
      this.error = null
      try {
        const res = await api.get('/project')
        this.items = res.data
      } catch (err: any) {
        this.error = err.response?.data || err.message
      } finally {
        this.loading = false
      }
    },
    async fetchById(id: number): Promise<Project> {
      const res = await api.get(`/project/${id}`)
      const foundIndex = this.items.findIndex(i => i.id === id)
      if (foundIndex !== -1) this.items[foundIndex] = res.data
      else this.items.push(res.data)
      return res.data
    },
    async create(item: Omit<Project, 'id'>) {
      this.error = null
      try {
        const res = await api.post('/project', item)
        await this.fetchAll()
        return res.data
      } catch (err: any) {
        this.error = err.response?.data || err.message
        throw err
      }
    },
    async update(id: number, item: Project) {
      this.error = null
      try {
        await api.put(`/project/${id}`, item)
        await this.fetchAll()
      } catch (err: any) {
        this.error = err.response?.data || err.message
        throw err
      }
    },
    async delete(id: number) {
      this.error = null
      try {
        await api.delete(`/project/${id}`)
        this.items = this.items.filter(i => i.id !== id)
      } catch (err: any) {
        this.error = err.response?.data || err.message
      }
    },

      async uploadImage(id: number, file: File, altText: string): Promise<{ image: string; altText: string }> {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('altText', altText)

  try {
    const res = await api.post(`/project/${id}/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res.data 
  } catch (error: any) {
    console.error('Image upload failed:', error)
    this.error = 'Failed to upload image.'
    throw new Error(error?.response?.data?.message || 'Image upload failed.')
  }
}
  }
})
