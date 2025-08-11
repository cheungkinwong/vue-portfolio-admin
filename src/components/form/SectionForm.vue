<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field v-model="form.title" label="Title" required />
    <v-textarea v-model="form.description" label="Description" required auto-grow />
    <v-file-input
      label="Image"
      accept="image/*"
      v-model="imageFile"
    />
    <v-text-field label="Alt Text" v-model="altText" />
    <div class="d-flex justify-end">
      <v-btn type="submit" color="primary" class="mr-2">Edit</v-btn>
      <v-btn @click="onCancel">Cancel</v-btn>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Section } from '@/types/section'

const props = defineProps<{ modelValue?: Section | null }>()

const form = ref<Section>({
  id: 0,
  title: '',
  description: '',
  image: '',
  altText: '',
})

const imageFile = ref<File | null>(null)
const altText = ref('')
const existingImageName = ref('')

watch(() => props.modelValue, (value) => {
  if (value) {
    form.value = { ...value }
    altText.value = value.altText || ''
    existingImageName.value = value.image?.split('/').pop() || ''
  }
}, { immediate: true })

function onSubmit() {
  emit('submit', {
    model: form.value,
    file: imageFile.value,
    altText: altText.value,
  })
}
function onCancel() {
  emit('cancel')
}

const emit = defineEmits<{
  (e: 'submit', payload: { model: Section, file: File | null, altText: string }): void
  (e: 'cancel'): void
}>()

</script>
