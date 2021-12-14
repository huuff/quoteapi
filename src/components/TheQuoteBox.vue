<template>
  <main class="card px-0">
    <div class="card-header">
      <h5>Quote</h5>
    </div>
    <div class="card-body px-4">
      <transition name="fade" mode="out-in">
        <figure :key="currentQuote.contents">
          <blockquote class="blockquote">
            <p>
              {{ currentQuote.contents }}
            </p>
          </blockquote>
          <figcaption class="blockquote-footer">
            {{ currentQuote.author }}
          </figcaption>
        </figure>
      </transition>
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

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.75s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
