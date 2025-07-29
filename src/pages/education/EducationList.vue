<template>
  <v-container max-width="w-auto">
    <div class="d-flex align-center mb-4">
      <h2>Education</h2>
      <v-btn density="compact" icon="add" class="ml-3" @click="$router.push('/education/new')" />
    </div>
    <v-alert v-if="store.error" type="error" class="mb-4 pa-2">{{ store.error }}</v-alert>
    <v-card>
      <v-card-text>
        <v-data-table
          :items="store.items"
          :headers="headers"
          :loading="store.loading"
          :items-per-page="itemsPerPage"
          :hide-default-footer="store.items.length <= itemsPerPage"
        >
          <template #item.startDate="{ item }">
            {{ formatDate(item.startDate) }}
          </template>
          <template #item.endDate="{ item }">
            {{ formatDate(item.endDate) }}
          </template>
          <template #item.actions="{ item }">
            <div class="text-right">
              <v-icon icon="edit" @click="$router.push(`/education/${item.id}/edit`)" class="me-2" />
              <v-icon icon="delete" color="red" @click="store.delete(item.id)" />
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useEducationStore } from '@/stores/education'

const store = useEducationStore()
const itemsPerPage = 10

onMounted(() => store.fetchAll())

const headers = [
  { title: 'School', value: 'school' },
  { title: 'Course', value: 'course' },
  { title: 'Start Date', value: 'startDate' },
  { title: 'End Date', value: 'endDate' },
  { title: '', value: 'actions', sortable: false },
]

function formatDate(date?: string | null): string {
  if (!date) return ''
  return new Date(date).toISOString().slice(0, 10)
}
</script>
