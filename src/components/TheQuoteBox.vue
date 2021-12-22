<template>
  <main class="card px-0 shadow-lg" id="quoteBox">
    <div class="card-header">
      <h5>Quote</h5>
    </div>
    <div class="card-body px-4 d-flex flex-column justify-content-center">
      <base-fade v-if="currentQuote" :show="currentQuote">
        <figure :key="currentQuote.contents" >
          <blockquote class="blockquote">
            <p>
              “{{ currentQuote.contents }}”
            </p>
          </blockquote>
          <figcaption class="blockquote-footer">
            {{ currentQuote.author }}<cite v-if="currentQuote.work">, <span class="work" @click="$emit('requestByWork', currentQuote.work)">{{ currentQuote.work }}</span></cite>
          </figcaption>
        </figure>
      </base-fade>
      <div v-else class="spinner-border mx-auto" role="status" style="height: 3rem; width: 3rem;">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <!-- Quote Actions slot -->
    <slot></slot>
  </main>
</template>

<script setup lang="ts">
import { Quote } from '@/quotes/quote';
import BaseFade from '@/components/BaseFade.vue';

const props = defineProps<{
  currentQuote?: Quote;
}>();

const emit = defineEmits<{
  (event: 'requestByWork', work: string): void;
}>();

</script>

<style>
#quoteBox {
  min-height: 30%;
}

.work:hover {
 text-decoration: underline; 
}

.work {
  cursor: pointer;
}
</style>
