<template>
   <v-card
        subtitle="Welcome to my portfolio login portal"
        title="Login"
        width="100%"
        max-width="400"
      >
    <v-form fast-fail @submit.prevent="submit" class="pa-5 pt-0">
        <v-alert
          v-if="error"
          color="error"
          density="compact"
          class="mb-5"
        >
          {{ error }}
        </v-alert>
      <v-text-field label="Username" v-model="username" />
      <v-text-field label="Password" v-model="password" type="password" />
      <v-btn :loading="isLoading" type="submit" color="secondary">Login</v-btn>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

const ui = useUiStore()
const { isLoading, error } = storeToRefs(ui)

const authStore = useAuthStore()
const username = ref('')
const password = ref('')

const submit = async () => {
  ui.setLoading(true)
  ui.setError(null)
  try {
    await authStore.login(username.value, password.value)
  }  catch (e) {
    ui.setError('Invalid username or password.')
  } finally {
    ui.setLoading(false)
  }
}
</script>