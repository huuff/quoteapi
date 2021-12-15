<template>
  <div class="form-check form-switch switch">
    <input class="form-check-input me-2" type="checkbox" id="expertModeSwitch" v-model="expertMode">
    <label class="form-check-label" for="expertModeSwitch">
      Expert Mode
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

const props = withDefaults(defineProps<{
  modelValue?: boolean
}>(), {
  modelValue: false
});

const emit = defineEmits<{
  (event: 'update:modelValue', expertMode: boolean): void
}>();

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

<style scoped>
.form-check-input, .form-check-label {
  cursor: pointer;
}
</style>
