<template>
  <div id="the-background"
    class="vh-100 row justify-content-center align-items-center"
    :style="{ backgroundColor: background }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Sentiment from 'sentiment';
import { Quote } from '@/quotes/quote';

const props = defineProps<{
  currentQuote?: Quote
}>();

const analyzer = new Sentiment();

const background = computed(() => {
  if (props.currentQuote) {
    const sentiment = analyzer.analyze(props.currentQuote.contents).score;
    const lightness = (sentiment + 5) * 10;
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.round(20 + (Math.random() * 20));
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  } else {
    return undefined;
  }
});
</script>

<style scoped>
#the-background {
  transition: background-color 1s;
}
</style>
