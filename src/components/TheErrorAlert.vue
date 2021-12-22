<template>
  <template v-if="error">
    <base-fade :show="show">
      <div class="alert alert-danger col-12 col-md-6 fixed-top my-1 shadow mx-auto text-center">
        {{ error }}
      </div>
    </base-fade>
  </template>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import BaseFade from '@/components/BaseFade.vue';
const ERROR_DURATION = 2500;

const props = defineProps<{
  error?: string;
}>();

const show = ref(false);

watch(() => props.error, (newVal) => {
  if (newVal) {
    show.value = true;
    setTimeout(() => show.value = false, ERROR_DURATION);
  }
});

</script>

<style scoped>
.alert {
  z-index: 99999;
}
</style>
