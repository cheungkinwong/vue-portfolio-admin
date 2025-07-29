<template>
  <v-container max-width="800">
    <v-card>
      <v-card-title>
        {{ isEdit ? 'Edit Project' : 'Create Project' }}
      </v-card-title>
      <v-card-text>
        <v-alert v-if="store.error" type="error" class="mb-4">{{ store.error }}</v-alert>
        <ProjectForm v-model="project" @submit="handleSubmit" @cancel="router.push('/project')" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/project'
import ProjectForm from '@/components/form/ProjectForm.vue'
import type { Project } from '@/types/project'

const route = useRoute()
const router = useRouter()
const store = useProjectStore()
const id = Number(route.params.id)
const isEdit = computed(() => !!id)

const project = ref<Project>({
  id: 0,
  name: '',
  description: '',
  link: '',
  image: '',
})

onMounted(async () => {
  if (isEdit.value) {
    const existing = store.items.find(i => i.id === id)
    project.value = existing ?? await store.fetchById(id)
  }
})

async function handleSubmit(data: { model: Project; file: File | null; altText: string }) {
  console.log("handleSubmit", data)
  try {
    const { model, file, altText } = data

    let createdProject = model

    if (!model.name || !model.description) {
      throw new Error('Name and description are required.')
    }

    if (!model.id) {
      createdProject = await store.create(model)
    }

    if (file && createdProject.id) {
      const uploadResult = await store.uploadImage(createdProject.id, file, altText)
      createdProject.image = uploadResult.image
      createdProject.altText = uploadResult.altText

      await store.update(createdProject.id, createdProject)
    } else if (!model.id) {
      await store.update(createdProject.id, createdProject)
    }

    router.push('/project')
  } catch (error: any) {
    console.error('Submit failed:', error)
    store.error = error.message || 'Failed to save project.'
  }
}

</script>
