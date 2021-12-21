<template>
  <div id="the-background"
    class="vh-100 row justify-content-center align-items-center"
    :style="{ backgroundColor: `hsl(120, 20%, ${background}%)` }"
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

// TODO: Change hue, saturation dynamically
const background = computed(() => {
  if (props.currentQuote) {
    const sentiment = analyzer.analyze(props.currentQuote.contents).score;
    return (sentiment + 5) * 10;
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
