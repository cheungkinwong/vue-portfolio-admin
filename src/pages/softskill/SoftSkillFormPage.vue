<template>
  <v-container max-width="800">
    <v-card>
      <v-card-title>{{ isEdit ? 'Edit Soft Skill' : 'Create Soft Skill' }}</v-card-title>
      <v-card-text>
        <v-alert v-if="store.error" type="error">{{ store.error }}</v-alert>
        <SoftSkillForm v-model="softSkill" @submit="handleSubmit" @cancel="router.push('/softskill')" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSoftSkillStore } from '@/stores/softSkill'
import SoftSkillForm from '@/components/form/SoftSkillForm.vue'
import type { SoftSkill } from '@/types/softSkill'

const store = useSoftSkillStore()
const route = useRoute()
const router = useRouter()

const id = Number(route.params.id)
const isEdit = computed(() => !!id)
const softSkill = ref<SoftSkill>({ id: 0, sectionId: 0, name: '', level: '' })

onMounted(async () => {
  if (isEdit.value) {
    softSkill.value = store.items.find(i => i.id === id) ?? await store.fetchById(id)
  }
})

async function handleSubmit() {
  if (isEdit.value) await store.update(softSkill.value.id, softSkill.value)
  else await store.create(softSkill.value)
  router.push('/softskill')
}
</script>