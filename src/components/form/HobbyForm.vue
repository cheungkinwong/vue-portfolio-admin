<template>
  <v-form @submit.prevent="$emit('submit')">
    <v-text-field label="Name" v-model="model.name" required />
    <div class="d-flex justify-end">
      <v-btn type="submit" color="secondary" class="mr-2">{{ isEdit ? 'Edit' : 'Create' }}</v-btn>
      <v-btn @click="$emit('cancel')">Cancel</v-btn>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Hobby } from '@/types/hobby'

const props = defineProps<{ modelValue: Hobby }>()
const emit = defineEmits(['update:modelValue', 'submit', 'cancel'])

const model = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})
const isEdit = computed(() => !!model.value.id)
</script>
