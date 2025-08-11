<template>
  <v-container max-width="w-auto">
    <v-card>
      <v-card-text>
        <div class="mb-4">
          <h2 class="text-h6 font-weight-bold mb-2">
            Welcome to the Portfolio Admin Client
          </h2>
          <p class="text-body-1">
            A secure, role-based dashboard for managing all portfolio content.
            Built for administrators to create, edit, and organize sections such as
            Work Experience, Education, Skills, Projects, and more — with plans to
            integrate SSO and OAuth2 authentication in the future.
          </p>
        </div>

        <v-divider class="my-4" />

          <v-list density="compact" lines="one" >
            <v-list-item prepend-icon="lock" title="Secure Login with JWT Authentication" />
            <v-list-item prepend-icon="person" title="Role-based Access — Admin & Reader Modes" />
            <v-list-item prepend-icon="folder" title="Full CRUD for Portfolio Entities" />
            <v-list-item prepend-icon="palette" title="Modern UI with Vue 3, Vuetify & TypeScript" />
            <v-list-item prepend-icon="rocket" title="Future Features — SSO & OAuth2 Support" />
          </v-list>
      </v-card-text>
    </v-card> 
  </v-container>
</template>

<script setup lang="ts">

</script>
