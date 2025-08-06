.<template>
  <v-container max-width="w-auto">
    <h2 class="mb-4">Sections</h2>
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
          <template #item.description="{ item }">
            <span class="text-truncate">
              {{ item.description }}
            </span>
          </template>
          <template #item.actions="{ item }">
              <div class="text-right">
                <v-icon icon="edit" @click="$router.push(`/section/${item.id}/edit`)" class="me-2" />
              </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useSectionStore } from '@/stores/section'
const store = useSectionStore()
const itemsPerPage = 10

const headers = [
  { title: 'Title', value: 'title' },
  { title: 'Description', value: 'description' },
  { title: '', value: 'actions', sortable: false },
]


store.fetchAll()
</script>
