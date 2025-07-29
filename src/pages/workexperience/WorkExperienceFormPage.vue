<template>
  <v-container width="100%"  max-width="800">
    <v-card>
      <v-card-title>
        {{ isEdit ? 'Edit Work Experience' : 'Create Work Experience' }}
      </v-card-title>
      <v-card-text>
        <v-alert v-if="store.error" type="error" class="mb-4">{{ store.error }}</v-alert>
        <WorkExperienceForm v-model="workExperience" @submit="handleSubmit" @cancel="router.push('/workexperience')"/>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useWorkExperienceStore } from '@/stores/workExperience'
import type { WorkExperience } from '@/types/workExperience'
import WorkExperienceForm from '@/components/form/WorkExperienceForm.vue'

const route = useRoute()
const router = useRouter()
const store = useWorkExperienceStore()

const id = Number(route.params.id)
const isEdit = computed(() => !!id)

const workExperience = ref<WorkExperience>({
  id: 0,
  company: '',
  sectionId: 3, 
  startDate: '',
  endDate: null,
  position: '',
})

onMounted(async () => {
  if (isEdit.value) {
    const existing = store.items.find(w => w.id === id)
    workExperience.value = existing ?? await store.fetchById(id)
  }
})

async function handleSubmit() {
  try {
    if (!workExperience.value.company || !workExperience.value.startDate) {
      throw new Error('Company and start date are required.')
    }

    if (isEdit.value) {
      await store.update(workExperience.value.id, workExperience.value)
    } else {
      await store.create(workExperience.value)
    }

    router.push('/workexperience')
  } catch (error) {
    console.error('Failed to save:', error)
  }
}
</script>
