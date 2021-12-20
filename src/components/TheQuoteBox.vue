<template>
  <main class="card px-0 shadow-lg" id="quoteBox">
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
            {{ currentQuote.author }}<cite v-if="currentQuote.work">, <span class="work" @click="$emit('requestQuery', 'work', currentQuote.work)">{{ currentQuote.work }}</span></cite>
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
        <font-awesome-icon 
          :icon="[ store.isFavorite(currentQuote.id) ? 'fas' : 'far', 'heart']" 
          class="fa-lg me-2 text-danger" 
          id="like"
          @click="store.toggleFavorite(currentQuote.id)"
          >
        </font-awesome-icon>
        <transition name="fade" mode="out-in">
          <span :key="currentQuote.tags">
            <a v-for="tag in currentQuote.tags" :key="tag" href="#" class="card-link" @click="$emit('requestQuery', 'tag', tag)">{{tag}}</a>
          </span>
        </transition>
      </div>

      <div>
        <button 
          class="btn btn-outline mx-2" 
          :class="autoplay ? 'btn-primary' : 'btn-success'"
          @click="$emit('toggleAutoplay')"
        >
          <font-awesome-icon :icon="autoplay ? 'pause' : 'play'"></font-awesome-icon>
        </button>
        <button class="btn btn-info" @click="$emit('requestQuery', 'author', currentQuote.author)">Same author</button>
        <button class="btn btn-secondary" @click="$emit('requestRandom')">Random</button>
      </div>
    </div>
    <div class="card-footer text-center">
      <a href="#" @click="$emit('requestFavorite')">Give me one of my favorites!</a>
    </div>
  </main>
</template>

<script setup lang="ts">
import { Quote } from '@/quotes/quote';
import { RequestType } from '@/request-type';
import { useStore } from '@/store';

const store = useStore();

const props = defineProps<{
  currentQuote?: Quote;
  autoplay: boolean;
}>();

const emit = defineEmits<{
  (event: 'requestRandom'): void;
  (event: 'requestQuery', type: RequestType, author: string): void;
  (event: 'requestFavorite'): void;
  (event: 'toggleAutoplay'): void;
}>();

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

.work, #like {
  cursor: pointer;
}

#like:hover {
  transform: scale(1.2);
  transition: transform 0.2s;
}
</style>
