<template>
  <transition v-show="show" name="fade" mode="out-in">
    <slot></slot>
  </transition>
</template>

<script setup lang="ts">

const props = defineProps<{
  show?: any
}>();
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
