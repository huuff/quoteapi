<template>
  <div class="fixed-top d-flex flex-row justify-content-end me-4">
    <div class="d-flex flex-column">
      <the-expert-mode-switch></the-expert-mode-switch>
      <the-provider-selector 
        :style="{ opacity: expertMode ? '100%' : '0%'}"
        @changeProvider='requestRandom()'
      ></the-provider-selector>
    </div>
  </div>
  <div class="vh-100 row justify-content-center align-items-center">
    <the-quote-box 
      :currentQuote="currentQuote"
      :autoplay="autoplay"
      @requestRandom="requestRandom"
      @requestQuery="requestQuery"
      @requestFavorite="requestFavorite"
      @toggleAutoplay="toggleAutoplay"
      class="col col-sm-8 col-lg-6"
    ></the-quote-box>
  </div>
  <the-debug-window v-if="expertMode"
    class="fixed-bottom ms-4"
    :log="debugLog"
  ></the-debug-window>
</template>

<script setup lang="ts">
import { ref, onUnmounted, reactive, onMounted } from 'vue';
import TheQuoteBox from '@/components/TheQuoteBox.vue';
import TheDebugWindow from '@/components/TheDebugWindow.vue';
import TheExpertModeSwitch from '@/components/TheExpertModeSwitch.vue';
import TheProviderSelector from '@/components/TheProviderSelector.vue';
import { Quote } from '@/quotes/quote';
import { RequestType } from '@/request-type';
import { RingBuffer } from 'ring-buffer-ts';
import { DebugMessage } from '@/debug/debug-message';
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';
import { randomElement } from '@/random-element';

const currentQuote = ref<Quote | null>(null);
const debugLog = reactive(new RingBuffer<DebugMessage>(15));
const { expertMode, provider, favoriteQuotes } = storeToRefs(useStore());
const autoplay = ref(true);
let timeout: number | undefined = undefined;

function resetTimeout(quoteLength: number) {
  if (timeout)
    clearTimeout(timeout);
  timeout = setTimeout(() => updateQuote(provider.value.random()), 7000 + (quoteLength * 10));
}

function updateQuote(promisedQuote: Promise<Quote>) {
  promisedQuote.then(newQuote => {
    debugLog.add(new DebugMessage('received', newQuote));
    currentQuote.value = newQuote;
    resetTimeout(newQuote.contents.length);
  });
}

function requestRandom() {
  debugLog.add(new DebugMessage('requested'));
  autoplay.value = true; // TODO: Why should it? Just keep paused until unpaused manually
  updateQuote(provider.value.random());
}

function requestFavorite() {
  const randomFavoriteId = randomElement(Array.from(favoriteQuotes.value));
  debugLog.add(new DebugMessage('requested'));
  updateQuote(provider.value.byId(randomFavoriteId));
}

function requestQuery(requestType: RequestType, query: string) {
  debugLog.add(new DebugMessage('requested', { [requestType]: query }));
  if (requestType === 'author')
    updateQuote(provider.value.byAuthor(query));
  else if (requestType === 'tag')
    updateQuote(provider.value.byTag(query));
  else if (requestType === 'work')
    updateQuote(provider.value.byWork(query));
}

function toggleAutoplay() {
  const nextAutoplayState = !autoplay.value;

  if (nextAutoplayState) {
    requestRandom();
  } else {
    clearTimeout(timeout);
  }

  autoplay.value = nextAutoplayState;
}

onMounted(() => {
  requestRandom();
});

onUnmounted(() => clearTimeout(timeout));
</script>

<style>
</style>
