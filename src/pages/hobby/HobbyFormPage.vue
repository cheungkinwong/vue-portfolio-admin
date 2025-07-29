<template>
  <v-container max-width="800">
    <v-card>
      <v-card-title>
        {{ isEdit ? 'Edit Hobby' : 'Create Hobby' }}
      </v-card-title>
      <v-card-text>
        <v-alert v-if="store.error" type="error" class="mb-4">{{ store.error }}</v-alert>
        <HobbyForm v-model="hobby" @submit="handleSubmit" @cancel="router.push('/hobby')" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHobbyStore } from '@/stores/hobby'
import HobbyForm from '@/components/form/HobbyForm.vue'
import type { Hobby } from '@/types/hobby'

const route = useRoute()
const router = useRouter()
const store = useHobbyStore()
const id = Number(route.params.id)
const isEdit = computed(() => !!id)

const hobby = ref<Hobby>({
  id: 0,
  sectionId: 0,
  name: '',
})

onMounted(async () => {
  if (isEdit.value) {
    const existing = store.items.find(i => i.id === id)
    hobby.value = existing ?? await store.fetchById(id)
  }
})

async function handleSubmit() {
  try {
    if (isEdit.value) {
      await store.update(hobby.value.id, hobby.value)
    } else {
      await store.create(hobby.value)
    }
    router.push('/hobby')
  } catch (e) {
    console.error(e)
  }
}
</script>
