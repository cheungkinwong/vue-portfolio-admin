<template>
  <v-card max-width="800" width="100%">
    <v-row no-gutters>
      <v-col cols="12" md="6" class="pa-6 d-flex flex-column justify-center">
        <h2 class="text-h5 mb-4">Welcome!</h2>
        <p class="text-body-1 mb-2">I'm Cheung Kin Wong and this is the login portal to my portfolio app.</p>
        <p class="text-body-1 mb-2">
          This site uses role to redirected to either the admin or reader page after login.
          It uses a simple JWT token for authentication, and I plan to add SSO and OAuth2 in the future.
        </p>
        <p class="text-body-1 mb-2">
          You can use the following credentials:<br>
          reader / reader123, admin / admin123. 
        </p>
        <p class="text-body-1 mb-2">
          Due to the limitations of my free web hosting service, HTTPS is currently not available.
        </p>
      </v-col>

      <v-col cols="12" md="6" class="pa-6 d-flex flex-column justify-center">
        <h2 class="text-h5 mb-4">Login</h2>

        <v-alert
          v-if="error"
          color="error"
          density="compact"
          class="mb-4"
        >
          {{ error }}
        </v-alert>

        <v-form fast-fail @submit.prevent="submit">
          <v-text-field
            label="Username"
            v-model="username"

          />
          <v-text-field
            label="Password"
            v-model="password"
            type="password"

          />
          <v-btn
            :loading="isLoading"
            type="submit"
            color="secondary"
            block
          >
            Login
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
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