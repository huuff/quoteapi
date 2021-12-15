<template>
  <main class="card px-0" id="quoteBox">
    <div class="card-header">
      <h5>Quote</h5>
    </div>
    <div class="card-body px-4 d-flex flex-column justify-content-center">
      <transition v-if="currentQuote" name="fade" mode="out-in">
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
      </transition>
      <div v-else class="spinner-border mx-auto" role="status" style="height: 3rem; width: 3rem;">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div id="quoteBoxActions"
      class="card-footer d-flex flex-row justify-content-between align-items-baseline"
      >
      <div v-if="currentQuote">
        <transition name="fade" mode="out-in">
          <span :key="currentQuote.tags">
            <a v-for="tag in currentQuote.tags" :key="tag" href="#" class="card-link" @click="$emit('requestByTag', tag)">{{tag}}</a>
          </span>
        </transition>
      </div>

      <div>
        <button class="btn btn-info" @click="$emit('requestByAuthor', currentQuote.author)">Same author</button>
        <button class="btn btn-secondary" @click="$emit('requestRandom')">Random</button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Quote } from '@/quotes/quote';

const props = defineProps({
  currentQuote: {
    type: Object as PropType<Quote | null>,
    required: false
  } ,
});

const emit = defineEmits([ "requestRandom", "requestByAuthor", "requestByTag", "requestByWork" ])
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

.work:hover {
 text-decoration: underline; 
}

.work {
  cursor: pointer;
}
</style>
