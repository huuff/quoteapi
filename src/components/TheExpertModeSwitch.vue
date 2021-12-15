<template>
  <div class="form-check form-switch">
    <input class="form-check-input me-2" type="checkbox" id="expertModeSwitch" v-model="expertMode">
    <label class="form-check-label" for="expertModeSwitch">
      Expert Mode
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits([ "update:modelValue" ]);

const expertMode = computed({
  get: () => props.modelValue,
  set: (newValue: boolean) => {
    emit("update:modelValue", newValue);
    localStorage.setItem("expertMode", `${newValue}`);
  },
});

onMounted(() => {
  if (localStorage.getItem("expertMode") === 'true')
    expertMode.value = true;
});

</script>
