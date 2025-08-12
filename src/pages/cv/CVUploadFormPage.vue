<template>
  <v-container>
    <v-card class="pa-4 max-w-md mx-auto">
      <v-card-title>Upload CV</v-card-title>
      
        <v-alert v-if="cvStore.error" type="error" class="mt-2">
          {{ cvStore.error }}
        </v-alert>

        <v-alert v-if="successMessage" type="success" class="mt-2">
          {{ successMessage }}
        </v-alert>

        <v-file-input
          v-model="file"
          label="Select CV (PDF)"
          accept=".pdf"
          :disabled="cvStore.loading"
          required
        />
        <div class="d-flex justify-end">
            <v-btn  color="secondary" :loading="cvStore.loading" @click="handleUpload" :disabled="!file">
                Upload
            </v-btn>
        </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCVStore } from '@/stores/cv'
import { useRouter } from 'vue-router'

const file = ref<File | null>(null)
const cvStore = useCVStore()
const router = useRouter()
const successMessage = ref<string | null>(null)

async function handleUpload() {
  if (!file.value) return

  try {
    const path = await cvStore.uploadCV(file.value)
    successMessage.value = `CV uploaded successfully to ${path}`
    router.push('/cv') 
  } catch (err) {
    successMessage.value = null
  }
}
</script>
