<template>
  <v-container max-width="w-auto">
    <div class="d-flex align-center mb-4">
      <h2>Projects</h2>
      <v-btn density="compact" icon="add" class="ml-3" @click="$router.push('/project/new')" />
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
          <template #item.description="{ item }">
            <span class="text-truncate">
              {{ item.description }}
            </span>
          </template>
          <template #item.link="{ item }">
            <span class="text-truncate">
              {{ item.link }}
            </span>
          </template>

          <template #item.actions="{ item }">
          <div class="text-right">
              <v-icon icon="edit" @click="$router.push(`/project/${item.id}/edit`)" class="me-2" />
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
import { useProjectStore } from '@/stores/project'

const store = useProjectStore()
const itemsPerPage = 10

onMounted(() => store.fetchAll())

const headers = [
  { title: 'Name', value: 'name' },
  { title: 'Description', value: 'description'},
  { title: 'Link', value: 'link'},
  { title: '', value: 'actions', sortable: false },
]
</script>

<style scoped>
.text-truncate {
  display: inline-block;
  max-width: 300px; 
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}
</style>