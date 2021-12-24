<template>
  <div id="the-background"
    class="vh-100 row justify-content-center align-items-center}"
    :style="{ background }"
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
    const gradientStartingColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`
    const gradientEndingColor = `hsl(${hue}, ${saturation}%, ${lightness + 20}%)`;
    return `linear-gradient(to left top, ${gradientStartingColor}, ${gradientEndingColor})`;
  } else {
    return undefined;
  }
});
</script>

<!-- Transition won't work for gradients :( -->
<style scoped>
#the-background {
  transition: background 1s;
}
</style>
