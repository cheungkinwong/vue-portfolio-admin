<template>
  <v-app-bar v-if="auth.isAuthenticated" app permanent color="primary-dark">
    <v-app-bar-nav-icon @click="toggleNavigationDrawer"></v-app-bar-nav-icon>
    <v-app-bar-title>Portfolio Cheung Kin Wong</v-app-bar-title>
    <v-btn @click="logout">Logout</v-btn>
  </v-app-bar>
      <v-navigation-drawer v-model="showNavigationDrawer" app temporary>
        <v-list-item v-for="item in links" :key="item.to" :to="item.to" link>
          <v-list-item-title>{{ item.label }}</v-list-item-title>
        </v-list-item>
    </v-navigation-drawer>
</template>

<script setup lang="ts">

import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const auth = useAuthStore()
const logout = () => {
  auth.logout()
  router.push('/login')
}
const showNavigationDrawer = ref(false)

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

const toggleNavigationDrawer = () => {
  showNavigationDrawer.value = !showNavigationDrawer.value
}
</script>