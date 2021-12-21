<template>
  <div class="fixed-top d-flex flex-row justify-content-end me-4">
    <div class="d-flex flex-column card shadow">
      <the-expert-mode-switch></the-expert-mode-switch>
      <the-provider-selector 
        :style="{ opacity: expertMode ? '100%' : '0%' }"
        @changeProvider="request('random')"
      ></the-provider-selector>
    </div>
  </div>
  <the-background :currentQuote="currentQuote">
    <div class="vh-100 row justify-content-center align-items-center">
      <the-quote-box 
        :currentQuote="currentQuote"
        :autoplay="autoplay.enabled"
        @requestByWork="(work) => request('work', work)"
        @toggleAutoplay="autoplay.toggle()"
        class="col col-md-10 col-lg-8 col-xl-6"
      >
        <the-quote-actions v-if="currentQuote" 
          :currentQuote="currentQuote"
          :autoplay="autoplay.enabled"
          @requestRandom="request('random')"
          @requestFavorite="request('id')"
          @requestQuery="request"
        >
        </the-quote-actions>
      </the-quote-box>
    </div>
  </the-background>
  <the-debug-window v-if="expertMode"
    class="fixed-bottom ms-4"
    :log="debugLog"
    :nextRefresh="autoplay.nextRefresh"
  ></the-debug-window>
</template>

<script setup lang="ts">
import { ref, onUnmounted, reactive, } from 'vue';
import TheQuoteBox from '@/components/TheQuoteBox.vue';
import TheDebugWindow from '@/components/TheDebugWindow.vue';
import TheExpertModeSwitch from '@/components/TheExpertModeSwitch.vue';
import TheProviderSelector from '@/components/TheProviderSelector.vue';
import TheQuoteActions from '@/components/TheQuoteActions.vue';
import TheBackground from '@/components/TheBackground.vue';
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

function request(requestType: 'random' | 'id'): void;
function request(requestType: 'tag' | 'work' | 'author', query: string): void;
function request(requestType: RequestType, query?: string): void {
  function updateAndResetAutoplay(quote: Quote): void {
    updateQuote(quote);
    autoplay.resetTimeout(quote.contents.length);
  }

  if (requestType === 'id') { // requesting a favorite
    const randomFavoriteId = randomElement(Array.from(favoriteQuotes.value));
    provider.value.request(requestType, randomFavoriteId).then(updateAndResetAutoplay);
  } else if (requestType !== 'random' && query) {
    provider.value.request(requestType, query).then(updateAndResetAutoplay);
  } else if (requestType === 'random') {
    provider.value.request(requestType).then(updateAndResetAutoplay);
  }
  debugLog.add(new DebugMessage('requested', { [requestType]: query}));
}

onUnmounted(() => autoplay.stop());
</script>

<style>
</style>
