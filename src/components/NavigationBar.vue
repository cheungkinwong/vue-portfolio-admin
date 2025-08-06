<template>
  <v-app-bar v-if="auth.isAuthenticated" app permanent>
    <v-list-item>Portfolio admin client</v-list-item>
    <v-list class="d-flex align-center px-4 mx-auto">
      <v-list-item v-for="item in links" :key="item.to" :to="item.to" link>
        <v-list-item-title>{{ item.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
     <v-btn @click="logout">Logout</v-btn>
  </v-app-bar>
</template>

<script setup lang="ts">

import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore()
const logout = () => {
  auth.logout()
  router.push('/login')
}

const links = [
  { label: 'Home', to: '/' },
  { label: 'Section', to: '/section' },
  { label: 'Work Experience', to: '/workexperience' },
  { label: 'Education', to: '/education' },
  { label: 'Soft Skills', to: '/softskill' },
  { label: 'Technical Skills', to: '/technicalskill' },
  { label: 'Hobbies', to: '/hobby' },
  { label: 'Projects', to: '/project' },
  { label: 'CV', to: '/cv' },
]
</script>