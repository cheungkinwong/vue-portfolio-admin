<template>
  <v-form @submit.prevent="$emit('submit')">
    <v-text-field
      label="Company"
      v-model="model.company"
      density="compact"
      required
    />
    <v-text-field
      label="Position"
      v-model="model.position"
      density="compact"
    />
    <v-text-field
      label="Start Date"
      type="date"
      v-model="model.startDate"
      density="compact"
      required
    />
    <v-text-field
      label="End Date"
      type="date"
      v-model="model.endDate"
      density="compact"
    />
    <div class="d-flex justify-end">
      <v-btn type="submit" color="secondary" class="mr-2">{{ isEdit ? 'Edit' : 'Create' }}</v-btn>
      <v-btn @click="$emit('cancel')">Cancel</v-btn>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { WorkExperience } from '@/types/workExperience'

const props = defineProps<{
  modelValue: WorkExperience
}>()
const emit = defineEmits(['update:modelValue', 'submit', 'cancel'])
const model = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
const isEdit = computed(() => !!model.value.id)

</script>
