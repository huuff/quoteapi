<template>
  <div class="fixed-top d-flex flex-row justify-content-end me-4">
    <div class="d-flex flex-column">
      <the-expert-mode-switch v-model="expertMode"></the-expert-mode-switch>
      <div v-if="expertMode" class="mt-2 d-flex flex-row align-items-baseline">
        <label for="providerSelector" class="text-muted me-2">Provider: </label>
        <select id="providerSelector" v-model="currentProviderName" class="form-select">
          <option v-for="provider in ProviderName" :key="provider">{{provider}}</option>
        </select>
      </div>
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
import { ref, onUnmounted, reactive, computed, ComputedRef } from 'vue';
import TheQuoteBox from '@/components/TheQuoteBox.vue';
import TheDebugWindow from '@/components/TheDebugWindow.vue';
import TheExpertModeSwitch from '@/components/TheExpertModeSwitch.vue';
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

let currentProviderName = ref<ProviderName>('quotable');
const currentProvider: ComputedRef<QuoteProvider> = computed(() => getProvider(currentProviderName.value));

function restartInterval() {
  clearInterval(interval);
  interval = setInterval(() => updateQuote(currentProvider.value.random()), 7000);
}

function updateQuote(promisedQuote: Promise<Quote>) {
  promisedQuote.then(newQuote => {
    debugLog.add(new DebugMessage('received', newQuote));
    currentQuote.value = newQuote;
  });
}

function requestRandom() {
  debugLog.add(new DebugMessage('requested'));
  updateQuote(currentProvider.value.random());
  restartInterval();
}

function requestQuery(requestType: RequestType, query: string) {
  debugLog.add(new DebugMessage('requested', { [requestType]: query }));
  if (requestType === 'author')
    updateQuote(currentProvider.value.byAuthor(query));
  if (requestType === 'tag')
    updateQuote(currentProvider.value.byTag(query));
  if (requestType === 'work')
    updateQuote(currentProvider.value.byWork(query));

  restartInterval();
}

onUnmounted(() => clearInterval(interval));

requestRandom();
</script>

<style>
</style>
