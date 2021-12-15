<template>
  <div class="form-check form-switch">
    <input class="form-check-input me-2" type="checkbox" id="expertModeSwitch" v-model="expertMode">
    <label class="form-check-label" for="expertModeSwitch">
      Expert Mode
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
});

const emit = defineEmits([ "update:modelValue" ]);

const expertMode = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});
</script>
