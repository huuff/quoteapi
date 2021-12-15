<template>
  <the-expert-mode-switch 
    class="fixed-top d-flex flex-row justify-content-end me-4"
    v-model="expertMode"
  ></the-expert-mode-switch>
  <div class="vh-100 row justify-content-center align-items-center">
    <the-quote-box 
      :currentQuote="currentQuote"
      @requestRandom="requestRandom"
      @requestByAuthor="requestByAuthor"
      @requestByTag="requestByTag"
      @requestByWork="requestByWork"
      class="col col-sm-8 col-lg-6"
    ></the-quote-box>
  </div>
  <the-debug-window v-if="expertMode"
    class="fixed-bottom ms-4"
    :log="debugLog"
  ></the-debug-window>
</template>

<script setup lang="ts">
import { ref, onUnmounted, reactive } from 'vue';
import TheQuoteBox from '@/components/TheQuoteBox.vue';
import TheDebugWindow from '@/components/TheDebugWindow.vue';
import TheExpertModeSwitch from '@/components/TheExpertModeSwitch.vue';
import { Quote } from '@/quotes/quote';
/*import { JsonQuoteProvider } from '@/quotes/json-quote-provider';*/
import { QuotableQuoteProvider } from '@/quotes/quotable-quote-provider';
import { QuoteProvider } from '@/quotes/quote-provider';
import { RingBuffer } from 'ring-buffer-ts';
import { DebugMessage } from '@/debug/debug-message';

/*const quoteProvider: QuoteProvider = new JsonQuoteProvider();*/
const quoteProvider: QuoteProvider = new QuotableQuoteProvider();
const currentQuote = ref<Quote | null>(null);
let interval: number | undefined = undefined;
const debugLog = reactive(new RingBuffer<DebugMessage>(15));
const expertMode = ref(false);

function restartInterval() {
  clearInterval(interval);
  interval = setInterval(() => updateQuote(quoteProvider.random()), 5000);
}

function updateQuote(promisedQuote: Promise<Quote>) {
  promisedQuote.then(newQuote => {
    debugLog.add(new DebugMessage('received-quote', newQuote));
    currentQuote.value = newQuote;
  });
}

function requestRandom() {
  debugLog.add(new DebugMessage('request-random'));
  updateQuote(quoteProvider.random());
  restartInterval();
}

function requestByAuthor(author: string) {
  debugLog.add(new DebugMessage('request-by-author'));
  updateQuote(quoteProvider.byAuthor(author));
  restartInterval();
}

function requestByTag(tag: string) {
  debugLog.add(new DebugMessage('request-by-tag'));
  updateQuote(quoteProvider.byTag(tag));
  restartInterval();
}

function requestByWork(work: string) {
  debugLog.add(new DebugMessage('request-by-work'));
  updateQuote(quoteProvider.byWork(work));
  restartInterval();
}

onUnmounted(() => clearInterval(interval));

requestRandom();
</script>

<style>
</style>
