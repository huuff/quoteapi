<template>

  <div class="vh-100 row justify-content-center align-items-center">
    <the-quote-box 
      :currentQuote="currentQuote"
      class="col-lg-8 h-25"
    ></the-quote-box>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import TheQuoteBox from '@/components/TheQuoteBox.vue';
import { Quote } from '@/quote';
import { randomQuote } from '@/test-quotes';

const currentQuote = ref<Quote>(randomQuote());

setInterval(() => currentQuote.value = randomQuote(), 5000);
</script>

<style>
</style>
