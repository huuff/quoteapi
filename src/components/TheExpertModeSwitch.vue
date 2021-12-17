<template>
  <div class="form-check form-switch switch">
    <input class="form-check-input me-2" type="checkbox" id="expertModeSwitch" v-model="switchState">
    <label class="form-check-label" for="expertModeSwitch">
      Expert Mode
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';

const store = useStore();
const { expertMode } = storeToRefs(store);

const switchState = computed({
  get: () => expertMode.value,
  set: (_) => store.toggleExpertMode()
});
</script>

<style scoped>
.form-check-input, .form-check-label {
  cursor: pointer;
}
</style>
