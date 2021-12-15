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
  <the-debug-window 
    class="fixed-bottom ms-4"
    :log="debugLog"
  ></the-debug-window>
</template>

<script setup lang="ts">
import { ref, onUnmounted, reactive } from 'vue';
import TheQuoteBox from '@/components/TheQuoteBox.vue';
import TheDebugWindow from '@/components/TheDebugWindow.vue';
import { Quote } from '@/quotes/quote';
import { JsonQuoteRetriever } from '@/quotes/json-quote-retriever';
import { RingBuffer } from 'ring-buffer-ts';
import { DebugMessage, DebugMessageType } from '@/debug/debug-message';

const quoteRetriever = new JsonQuoteRetriever();
const currentQuote = ref<Quote | null>(null);
let interval: number | undefined = undefined;
const debugLog = reactive(new RingBuffer<DebugMessage>(5));

function restartInterval() {
  clearInterval(interval);
  interval = setInterval(() => updateQuote(quoteRetriever.random()), 5000);
}

function updateQuote(promisedQuote: Promise<Quote>) {
  promisedQuote.then(newQuote => {
    debugLog.add(new DebugMessage(new Date(), 'received-quote', newQuote));
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
