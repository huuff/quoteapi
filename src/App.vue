<template>

  <div class="vh-100 row justify-content-center align-items-center">
    <the-quote-box 
      :currentQuote="currentQuote"
      @requestRandom="requestRandom"
      class="col-lg-8"
    ></the-quote-box>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TheQuoteBox from '@/components/TheQuoteBox.vue';
import { Quote } from '@/quote';
import { randomQuote } from '@/test-quotes';

const currentQuote = ref<Quote>(randomQuote());
let interval: number | null = null;

function restartInterval() {
  if (interval)
    clearInterval(interval);
  interval = setInterval(updateWithRandom, 5000);
}

function updateWithRandom() {
  currentQuote.value = randomQuote();
}

function requestRandom() {
  updateWithRandom();
  restartInterval();
}

restartInterval();

</script>

<style>
</style>
