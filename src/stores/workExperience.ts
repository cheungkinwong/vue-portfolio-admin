import { defineStore } from 'pinia'
import api from '@/plugins/axios'
import type { WorkExperience } from '@/types/workExperience'

export const useWorkExperienceStore = defineStore('workExperience', {
  state: () => ({
    items: [] as WorkExperience[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchAll() {
      this.loading = true
      this.error = null
      try {
        const res = await api.get('/workexperience')
        this.items = res.data
      } catch (err: any) {
        this.error = err.response?.data || err.message
      } finally {
        this.loading = false
      }
    },

    async fetchById(id: number): Promise<WorkExperience> {
        const res = await api.get(`/workexperience/${id}`)
        const foundIndex = this.items.findIndex(s => s.id === id)
        if (foundIndex !== -1) {
          this.items[foundIndex] = res.data
        } else {
          this.items.push(res.data)
        }
        return res.data
    },

    async create(item: Omit<WorkExperience, 'id'>) {
      this.error = null
      try {
        const res = await api.post('/workexperience', item)
        await this.fetchAll()
        return res.data
      } catch (err: any) {
        this.error = err.response?.data || err.message
        throw err
      }
    },

    async update(id: number, item: WorkExperience) {
      this.error = null
      try {
        await api.put(`/workexperience/${id}`, item)
        await this.fetchAll()
      } catch (err: any) {
        this.error = err.response?.data || err.message
        throw err
      }
    },
    
    async delete(id: number) {
      this.error = null
      try {
        await api.delete(`/workexperience/${id}`)
        this.items = this.items.filter(w => w.id !== id)
      } catch (err: any) {
        this.error = err.response?.data || err.message
      }
    }
  }
})
