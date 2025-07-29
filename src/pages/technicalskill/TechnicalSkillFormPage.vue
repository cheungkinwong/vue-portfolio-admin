<template>
  <v-container max-width="800">
    <v-card>
      <v-card-title>
        {{ isEdit ? 'Edit Technical Skill' : 'Create Technical Skill' }}
      </v-card-title>
      <v-card-text>
        <v-alert v-if="store.error" type="error" class="mb-4">{{ store.error }}</v-alert>
        <TechnicalSkillForm v-model="technicalSkill" @submit="handleSubmit" @cancel="router.push('/technicalskill')" />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTechnicalSkillStore } from '@/stores/technicalSkill'
import TechnicalSkillForm from '@/components/form/TechnicalSkillForm.vue'
import type { TechnicalSkill } from '@/types/technicalSkill'

const route = useRoute()
const router = useRouter()
const store = useTechnicalSkillStore()
const id = Number(route.params.id)
const isEdit = computed(() => !!id)

const technicalSkill = ref<TechnicalSkill>({
  id: 0,
  sectionId: 0,
  name: '',
})

onMounted(async () => {
  if (isEdit.value) {
    const existing = store.items.find(i => i.id === id)
    technicalSkill.value = existing ?? await store.fetchById(id)
  }
})

async function handleSubmit() {
  try {
    if (isEdit.value) {
      await store.update(technicalSkill.value.id, technicalSkill.value)
    } else {
      await store.create(technicalSkill.value)
    }
    router.push('/technicalskill')
  } catch (e) {
    console.error(e)
  }
}
</script>
