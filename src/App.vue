<template>
  <v-app>
    <NavigationBar />
    <v-main>
      <v-container class="fill-height d-flex flex-column justify-center align-center pa-0 ">
        <RouterView/>
      </v-container>
    </v-main>
  </v-app>
</template>
<script setup>
import NavigationBar from '@/components/NavigationBar.vue'
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>
