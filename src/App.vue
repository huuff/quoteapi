<template>
  <div class="vh-100 row justify-content-center align-items-center">
    <the-quote-box 
      :currentQuote="currentQuote"
      @requestRandom="requestRandom"
      @requestByAuthor="requestByAuthor"
      @requestByTag="requestByTag"
      class="col col-sm-8 col-lg-6"
    ></the-quote-box>
  </div>
  <the-debug-window class="fixed-bottom ms-4"></the-debug-window>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import TheQuoteBox from '@/components/TheQuoteBox.vue';
import TheDebugWindow from '@/components/TheDebugWindow.vue';
import { Quote } from '@/quotes/quote';
import { JsonQuoteRetriever } from '@/quotes/json-quote-retriever';

const quoteRetriever = new JsonQuoteRetriever();

const currentQuote = ref<Quote | null>(null);

let interval: number | undefined = undefined;

function restartInterval() {
  clearInterval(interval);
  interval = setInterval(() => updateQuote(quoteRetriever.random()), 5000);
}

function updateQuote(promisedQuote: Promise<Quote>) {
  promisedQuote.then(newQuote => {
    console.log(`Updating with: ${JSON.stringify(newQuote)}`);
    currentQuote.value = newQuote;
  });
}

function requestRandom() {
  updateQuote(quoteRetriever.random());
  restartInterval();
}

function requestByAuthor(author: string) {
  updateQuote(quoteRetriever.byAuthor(author));
  restartInterval();
}

function requestByTag(tag: string) {
  updateQuote(quoteRetriever.byTag(tag));
  restartInterval();
}

onUnmounted(() => clearInterval(interval));

requestRandom();
</script>

<style>
</style>
