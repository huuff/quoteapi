<template>
  <div class="fixed-top d-flex flex-row justify-content-end me-4">
    <div class="d-flex flex-column">
      <the-expert-mode-switch v-model="expertMode"></the-expert-mode-switch>
      <the-provider-selector 
        :style="{ opacity: expertMode ? '100%' : '0%'}"
        @setProvider="setProvider"
      ></the-provider-selector>
    </div>
  </div>
  <div class="vh-100 row justify-content-center align-items-center">
    <the-quote-box 
      :currentQuote="currentQuote"
      @requestRandom="requestRandom"
      @requestQuery="requestQuery"
      class="col col-sm-8 col-lg-6"
    ></the-quote-box>
  </div>
  <the-debug-window v-if="expertMode"
    class="fixed-bottom ms-4"
    :log="debugLog"
  ></the-debug-window>
</template>

<script setup lang="ts">
import { ref, onUnmounted, reactive, } from 'vue';
import TheQuoteBox from '@/components/TheQuoteBox.vue';
import TheDebugWindow from '@/components/TheDebugWindow.vue';
import TheExpertModeSwitch from '@/components/TheExpertModeSwitch.vue';
import TheProviderSelector from '@/components/TheProviderSelector.vue';
import { Quote } from '@/quotes/quote';
import { RequestType } from '@/request-type';
import { QuoteProvider } from '@/quotes/quote-provider';
import { RingBuffer } from 'ring-buffer-ts';
import { DebugMessage } from '@/debug/debug-message';
import { getProvider, ProviderName } from '@/quotes/get-provider';

const currentQuote = ref<Quote | null>(null);
let interval: number | undefined = undefined;
const debugLog = reactive(new RingBuffer<DebugMessage>(15));
const expertMode = ref<boolean | null>(null);
const provider = ref<QuoteProvider>(getProvider(ProviderName.quotable));

function restartInterval() {
  clearInterval(interval);
  interval = setInterval(() => updateQuote(provider.value.random()), 7000);
}

function updateQuote(promisedQuote: Promise<Quote>) {
  promisedQuote.then(newQuote => {
    debugLog.add(new DebugMessage('received', newQuote));
    currentQuote.value = newQuote;
  });
}

function requestRandom() {
  debugLog.add(new DebugMessage('requested'));
  updateQuote(provider.value.random());
  restartInterval();
}

function requestQuery(requestType: RequestType, query: string) {
  debugLog.add(new DebugMessage('requested', { [requestType]: query }));
  if (requestType === 'author')
    updateQuote(provider.value.byAuthor(query));
  if (requestType === 'tag')
    updateQuote(provider.value.byTag(query));
  if (requestType === 'work')
    updateQuote(provider.value.byWork(query));

  restartInterval();
}

function setProvider(newProvider: QuoteProvider): void {
  provider.value = newProvider;
  requestRandom();
}

onUnmounted(() => clearInterval(interval));
</script>

<style>
</style>
