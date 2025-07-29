<template>
  <v-container max-width="800">
    <v-card>
      <v-card-title>
        {{ isEdit ? 'Edit Education' : 'Create Education' }}
      </v-card-title>
      <v-card-text>
        <v-alert v-if="store.error" type="error" class="mb-4">{{ store.error }}</v-alert>
        <EducationForm v-model="education" @submit="handleSubmit" @cancel="router.push('/education')" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEducationStore } from '@/stores/education'
import EducationForm from '@/components/form/EducationForm.vue'
import type { Education } from '@/types/education'

const route = useRoute()
const router = useRouter()
const store = useEducationStore()
const id = Number(route.params.id)
const isEdit = computed(() => !!id)

const education = ref<Education>({
  id: 0,
  sectionId: 0,
  school: '',
  course: '',
  startDate: '',
  endDate: null,
})

onMounted(async () => {
  if (isEdit.value) {
    const existing = store.items.find(e => e.id === id)
    education.value = existing ?? await store.fetchById(id)
  }
})

async function handleSubmit() {
  try {
    if (isEdit.value) {
      await store.update(education.value.id, education.value)
    } else {
      await store.create(education.value)
    }
    router.push('/education')
  } catch (e) {
    console.error(e)
  }
}
</script>
