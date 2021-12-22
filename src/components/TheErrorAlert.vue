<template>
  <template v-if="error">
    <transition name="fade" mode="out-in" v-show="show">
      <div class="alert alert-danger col-12 col-md-6 fixed-top my-1 shadow mx-auto text-center">
        {{ error }}
      </div>
    </transition>
  </template>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.alert {
  z-index: 99999;
}
</style>
