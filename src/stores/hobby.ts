import { defineStore } from 'pinia'
import api from '@/plugins/axios'
import type { Hobby } from '@/types/hobby'

export const useHobbyStore = defineStore('hobby', {
  state: () => ({
    items: [] as Hobby[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchAll() {
      this.loading = true
      this.error = null
      try {
        const res = await api.get('/hobby')
        this.items = res.data
      } catch (err: any) {
        this.error = err.response?.data || err.message
      } finally {
        this.loading = false
      }
    },
    async fetchById(id: number): Promise<Hobby> {
      const res = await api.get(`/hobby/${id}`)
      const foundIndex = this.items.findIndex(i => i.id === id)
      if (foundIndex !== -1) this.items[foundIndex] = res.data
      else this.items.push(res.data)
      return res.data
    },
    async create(item: Omit<Hobby, 'id'>) {
      this.error = null
      try {
        const res = await api.post('/hobby', item)
        await this.fetchAll()
        return res.data
      } catch (err: any) {
        this.error = err.response?.data || err.message
        throw err
      }
    },
    async update(id: number, item: Hobby) {
      this.error = null
      try {
        await api.put(`/hobby/${id}`, item)
        await this.fetchAll()
      } catch (err: any) {
        this.error = err.response?.data || err.message
        throw err
      }
    },
    async delete(id: number) {
      this.error = null
      try {
        await api.delete(`/hobby/${id}`)
        this.items = this.items.filter(i => i.id !== id)
      } catch (err: any) {
        this.error = err.response?.data || err.message
      }
    }
  }
})
