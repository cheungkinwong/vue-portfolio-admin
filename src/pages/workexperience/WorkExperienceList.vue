<template>
  <v-container max-width="w-auto">
    <div class="d-flex align-center mb-4">
        <h2>Work Experience</h2>
        <v-btn density="compact" icon="add" class="ml-3" @click="$router.push('/workexperience/new')" />
    </div>
    <v-alert v-if="store.error" type="error" class="mb-4 pa-2">{{ store.error }}</v-alert>
    <v-card class="pa-0">
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
                <v-icon icon="edit" @click="$router.push(`/workexperience/${item.id}/edit`)" class="me-2" />
                <v-icon icon="delete" color="red" @click="store.delete(item.id)" />
              </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useWorkExperienceStore } from '@/stores/workExperience'
import { onMounted } from 'vue'

const store = useWorkExperienceStore()
const itemsPerPage = 10

const headers = [
  { title: 'Company', value: 'company' },
  { title: 'Position', value: 'position' },
  { title: 'Start Date', value: 'startDate' },
  { title: 'End Date', value: 'endDate' },
  { title: '', value: 'actions', sortable: false },
]

function formatDate(date?: string | null): string {
  if (!date) return ''
  return new Date(date).toISOString().slice(0, 10)
}
onMounted(() => store.fetchAll())
</script>

