import { defineStore } from 'pinia'
import api from '@/plugins/axios'
import type { Education } from '@/types/education'

export const useEducationStore = defineStore('education', {
  state: () => ({
    items: [] as Education[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchAll() {
      this.loading = true
      this.error = null
      try {
        const res = await api.get('/education')
        this.items = res.data
      } catch (err: any) {
        this.error = err.response?.data || err.message
      } finally {
        this.loading = false
      }
    },
    async fetchById(id: number): Promise<Education> {
      const res = await api.get(`/education/${id}`)
      const foundIndex = this.items.findIndex(i => i.id === id)
      if (foundIndex !== -1) this.items[foundIndex] = res.data
      else this.items.push(res.data)
      return res.data
    },
    async create(item: Omit<Education, 'id'>) {
      this.error = null
      try {
        const res = await api.post('/education', item)
        await this.fetchAll()
        return res.data
      } catch (err: any) {
        this.error = err.response?.data || err.message
        throw err
      }
    },
    async update(id: number, item: Education) {
      this.error = null
      try {
        await api.put(`/education/${id}`, item)
        await this.fetchAll()
      } catch (err: any) {
        this.error = err.response?.data || err.message
        throw err
      }
    },
    async delete(id: number) {
      this.error = null
      try {
        await api.delete(`/education/${id}`)
        this.items = this.items.filter(i => i.id !== id)
      } catch (err: any) {
        this.error = err.response?.data || err.message
      }
    }
  }
})
