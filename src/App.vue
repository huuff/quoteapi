<template>
  <div class="vh-100 row justify-content-center align-items-center">
    <the-quote-box 
      :currentQuote="currentQuote"
      @requestRandom="requestRandom"
      @requestAuthor="requestAuthor"
      class="col col-sm-8 col-lg-6"
    ></the-quote-box>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TheQuoteBox from '@/components/TheQuoteBox.vue';
import { Quote } from '@/quote';
import { randomQuote, randomFromAuthor } from '@/test-quotes';

const currentQuote = ref<Quote>(randomQuote());
let interval: number | null = null;

function restartInterval() {
  if (interval)
    clearInterval(interval);
  interval = setInterval(() => update(randomQuote()), 5000);
}

function update(newQuote: Quote) {
  currentQuote.value = newQuote;
}

function requestRandom() {
  update(randomQuote());
  restartInterval();
}

function requestAuthor(author: string) {
  update(randomFromAuthor(author));
  restartInterval();
}

restartInterval();

</script>

<style>
</style>
