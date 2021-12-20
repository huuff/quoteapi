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
      :autoplay="autoplay.enabled"
      @requestRandom="requestRandom"
      @requestQuery="requestQuery"
      @requestFavorite="requestFavorite"
      @toggleAutoplay="autoplay.toggle()"
      class="col col-sm-8 col-lg-6"
    ></the-quote-box>
  </div>
  <the-debug-window v-if="expertMode"
    class="fixed-bottom ms-4"
    :log="debugLog"
    :nextRefresh="autoplay.nextRefresh"
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
import { Autoplay } from '@/autoplay';

const currentQuote = ref<Quote | undefined>(undefined);
const debugLog = reactive(new RingBuffer<DebugMessage>(15));
const { expertMode, provider, favoriteQuotes } = storeToRefs(useStore());
const autoplay = reactive(new Autoplay(updateQuote));


function updateQuote(newQuote: Quote) {
  debugLog.add(new DebugMessage('received', newQuote));
  currentQuote.value = newQuote;
}

// TODO: clean this up by refactoring my request code so it's terser (only one method?)
function updateQuoteAndResetTimeout(newQuote: Quote) {
  updateQuote(newQuote);
  autoplay.resetTimeout(newQuote.contents.length);
}

function requestRandom() {
  debugLog.add(new DebugMessage('requested'));
  provider.value.random().then(updateQuoteAndResetTimeout);
}

function requestFavorite() {
  const randomFavoriteId = randomElement(Array.from(favoriteQuotes.value));
  debugLog.add(new DebugMessage('requested'));
  provider.value.byId(randomFavoriteId).then(updateQuoteAndResetTimeout);
}

function requestQuery(requestType: RequestType, query: string) {
  debugLog.add(new DebugMessage('requested', { [requestType]: query }));
  if (requestType === 'author')
    provider.value.byAuthor(query).then(updateQuoteAndResetTimeout);
  else if (requestType === 'tag')
    provider.value.byTag(query).then(updateQuoteAndResetTimeout);
  else if (requestType === 'work')
    provider.value.byWork(query).then(updateQuoteAndResetTimeout);
}

onUnmounted(() => autoplay.stop());
</script>

<style>
</style>
