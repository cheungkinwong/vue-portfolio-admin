<template>
  <v-form @submit.prevent="$emit('submit')">
    <v-text-field label="School" v-model="model.school" required />
    <v-text-field label="Course" v-model="model.course" required />
    <v-text-field label="Start Date" type="date" v-model="model.startDate" required />
    <v-text-field label="End Date" type="date" v-model="model.endDate" />
    <div class="d-flex justify-end">
      <v-btn type="submit" color="secondary" class="mr-2">{{ isEdit ? 'Edit' : 'Create' }}</v-btn>
      <v-btn @click="$emit('cancel')">Cancel</v-btn>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Education } from '@/types/education'

const props = defineProps<{ modelValue: Education }>()
const emit = defineEmits(['update:modelValue', 'submit', 'cancel'])

const model = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
const isEdit = computed(() => !!model.value.id)
</script>
