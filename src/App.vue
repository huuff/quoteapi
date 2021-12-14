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
import { Quote } from '@/quotes/quote';
import { JsonQuoteRetriever } from '@/quotes/json-quote-retriever';

const quoteRetriever = new JsonQuoteRetriever();

const currentQuote = ref<Quote | null>(null);
requestRandom();

let interval: number | null = null;

function restartInterval() {
  if (interval)
    clearInterval(interval);
  interval = setInterval(() => update(quoteRetriever.random()), 5000);
}

function update(promisedQuote: Promise<Quote>) {
  promisedQuote.then(newQuote => currentQuote.value = newQuote);
}

function requestRandom() {
  update(quoteRetriever.random());
  restartInterval();
}

function requestAuthor(author: string) {
  update(quoteRetriever.byAuthor(author));
  restartInterval();
}

restartInterval();

</script>

<style>
</style>
