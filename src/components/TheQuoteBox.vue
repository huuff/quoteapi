<template>
  <main class="card px-0" id="quoteBox">
    <div class="card-header">
      <h5>Quote</h5>
    </div>
    <div class="card-body px-4 d-flex flex-column justify-content-center">
      <transition name="fade" mode="out-in">
        <figure :key="currentQuote.contents" >
          <blockquote class="blockquote">
            <p>
              “{{ currentQuote.contents }}”
            </p>
          </blockquote>
          <figcaption class="blockquote-footer">
            {{ currentQuote.author }}<span v-if="currentQuote.work">, {{ currentQuote.work }}</span>
          </figcaption>
        </figure>
      </transition>
    </div>
    <div id="quoteBoxActions"
      class="card-footer d-flex flex-row justify-content-between align-items-baseline"
      >
      <div>
        <transition-group name="fade">
          <a v-for="tag in currentQuote.tags" :key="tag" href="#" class="card-link">{{tag}}</a>
        </transition-group>
      </div>

      <div>
        <button class="btn btn-info" @click="$emit('requestAuthor', currentQuote.author)">Same author</button>
        <button class="btn btn-secondary" @click="$emit('requestRandom')">Random</button>
      </div>
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

const emit = defineEmits([ "requestRandom", "requestAuthor" ])
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

#quoteBox {
  min-height: 30%;
}

#quoteBoxActions button,
#quoteBoxActions a
{
  margin: 0 0.2em;
}
</style>
