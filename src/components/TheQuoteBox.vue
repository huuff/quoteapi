<template>
  <main class="card px-0">
    <div class="card-header">
      <h5>Quote</h5>
    </div>
    <div class="card-body px-4">
      <figure>
        <blockquote class="blockquote">
          <p>
            {{ currentQuote.contents }}
          </p>
        </blockquote>
        <figcaption>
          {{ currentQuote.author }}
        </figcaption>
      </figure>
    </div>
  </main>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Quote } from '@/quote';

const props = defineProps({
  currentQuote: {
    type: Object as PropType<Quote>,
    required: true
  } ,
});
</script>
