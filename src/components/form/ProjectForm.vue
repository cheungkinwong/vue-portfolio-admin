<template>
  <v-form ref="formRef" @submit.prevent="onSubmit">
    <v-text-field label="Name" v-model="form.name" required />
    <v-text-field label="Description" v-model="form.description" required />
    <v-text-field label="Link" v-model="form.link" />
    <v-file-input
      label="Image"
      accept="image/*"
      v-model="imageFile"
    />
    <v-text-field label="Alt Text" v-model="altText" />
    <div class="d-flex justify-end">
      <v-btn type="submit" color="primary" class="mr-2">{{ isEdit ? 'Edit' : 'Create' }}</v-btn>
      <v-btn @click="onCancel">Cancel</v-btn>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Project } from '@/types/project'

const props = defineProps<{ modelValue?: Project | null }>()

const form = ref<Project>({
  id: 0,
  name: '',
  link: '',
  description: '',
  image: '',
  altText: '',
})

const imageFile = ref<File | null>(null)
const altText = ref('')
const existingImageName = ref('')
watch(() => props.modelValue, (value) => {
  if (value) {
    Object.assign(form.value, value)
    altText.value = value.altText || ''
    existingImageName.value = value.image?.split('/').pop() || ''
  }
}, { immediate: true })
const isEdit = computed(() => !!form.value.id)

const formRef = ref()
function onSubmit() {
  formRef.value?.validate().then((isValid: boolean) => {
    if (!isValid) return
    emit('submit', {
      model: form.value,
      file: imageFile.value,
      altText: altText.value,
    })
  })
}


function onCancel() {
  emit('cancel')
}

const emit = defineEmits<{
  (e: 'submit', payload: { model: Project, file: File | null, altText: string }): void
  (e: 'cancel'): void
}>()

</script>
