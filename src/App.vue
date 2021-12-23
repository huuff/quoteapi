<template>
  <the-error-alert :error="latestError"></the-error-alert>
  <div class="fixed-top d-flex flex-row justify-content-end me-4">
    <div class="d-flex flex-column card shadow align-items-center p-1">
      <the-expert-mode-switch></the-expert-mode-switch>
      <div v-show="expertMode">
        <the-provider-selector 
          @changeProvider="request('random')"
        ></the-provider-selector>
      </div>
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
    class="fixed-bottom ms-4 shadow-sm"
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
import TheErrorAlert from './components/TheErrorAlert.vue';
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
const latestError = ref<string | undefined>(undefined);


function updateQuote(newQuote: Quote) {
  debugLog.add(new DebugMessage('received', newQuote));
  if (newQuote.id !== currentQuote.value?.id) {
    currentQuote.value = newQuote;
    latestError.value = undefined;
  } else {
    latestError.value = "The received query is the same as the current one";
  }
}

function request(requestType: 'random' | 'id'): void;
function request(requestType: 'tag' | 'work' | 'author', query: string): void;
async function request(requestType: RequestType, query?: string): Promise<void> {
  debugLog.add(new DebugMessage('requested', { [requestType]: query}));
  
  let quote: (Quote | undefined) = undefined;
  try {
    if (requestType === 'id') { // requesting a favorite
      if (favoriteQuotes.value.size === 0)
        throw new Error("You didn't like any quotes!");
      const randomFavoriteId = randomElement(Array.from(favoriteQuotes.value));
      quote = await provider.value.request(requestType, randomFavoriteId);
    } else if (requestType !== 'random' && query) {
      quote = await provider.value.request(requestType, query);
    } else if (requestType === 'random') {
      quote = await provider.value.request(requestType);
    }
  } catch(caught) {
    if (caught instanceof Error) {
      latestError.value = caught.message;
    }
  }

  if (!quote)
    return;

  updateQuote(quote);
  autoplay.resetTimeout(quote.contents.length);
}

onUnmounted(() => autoplay.stop());
</script>

<style>
</style>
