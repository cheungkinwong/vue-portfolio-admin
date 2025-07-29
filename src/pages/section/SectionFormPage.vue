<template>
  <v-container width="100%"  max-width="800">
    <v-card >
      <v-card-title>  
        <h2>{{ 'Edit Section' }}</h2>
      </v-card-title>
      <v-card-text>    
        <SectionForm :modelValue="section" @submit="handleSubmit" @cancel="router.push('/section')"/></v-card-text>
      </v-card> 

  </v-container>
</template>

<script setup lang="ts">
import SectionForm from '@/components/form/SectionForm.vue'
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useSectionStore } from '@/stores/section'
import type { Section } from '@/types/section'

const route = useRoute()
const router = useRouter()
const sectionStore = useSectionStore()
const section = ref<Section | null>(null)

onMounted(async () => {
  const id = Number(route.params.id)
  if (id) {
    const existing = sectionStore.items.find(s => s.id === id)
    if (existing) {
      section.value = existing
    } else {
      const res = await sectionStore.fetchById(id)
      section.value = res
    }
  }
})

async function handleSubmit(data: { model: Section; file: File | null; altText: string }) {
  try {
    const { model, file, altText } = data

    if (!model.title || !model.description) {
      throw new Error('Title and description are required.')
    }
    if (file && model.id) {
      const uploadResult = await sectionStore.uploadImage(model.id, file, altText)
      model.image = uploadResult.image
      model.altText = uploadResult.altText
    }
    if (model.id) {
      await sectionStore.update(model.id, model)
    }
    router.push('/section')
  } catch (error: any) {
    console.error('Update failed:', error)
    sectionStore.error = error.message || 'Failed to update section.'
  }
}


</script>
