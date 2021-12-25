<template>
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
      <base-fade :show="currentQuote">
        <span :key="currentQuote.tags">
          <a v-for="tag in currentQuote.tags" :key="tag" href="#" class="card-link" @click="$emit('requestQuery', 'tag', tag)">{{tag}}</a>
        </span>
      </base-fade>
    </div>

    <div>
      <button 
        class="btn btn-outline mx-2" 
        :class="autoplay ? 'btn-primary' : 'btn-success'"
        @click="$emit('toggleAutoplay')"
      >
        <font-awesome-icon :icon="autoplay ? 'pause' : 'play'"></font-awesome-icon>
      </button>
      <button class="btn btn-info" id="requestAuthorButton" @click="$emit('requestQuery', 'author', currentQuote.author)">Same author</button>
      <button class="btn btn-secondary" id="requestRandomButton" @click="$emit('requestRandom')">Random</button>
    </div>
  </div>
  <div class="card-footer text-center">
    <a href="#" @click="$emit('requestFavorite')">Give me one of my favorites!</a>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { Quote } from '@/quotes/quote';
import BaseFade from '@/components/BaseFade.vue';

const store = useStore();

const props = defineProps<{
  currentQuote: Quote;
  autoplay: boolean;
}>();


const emit = defineEmits<{
  (event: 'requestRandom'): void;
  (event: 'requestQuery', type: 'author' | 'tag' | 'work', query: string): void;
  (event: 'requestFavorite'): void;
  (event: 'toggleAutoplay'): void;
}>();
</script>

<style scoped>
#quoteBoxActions button,
#quoteBoxActions a
{
  margin: 0 0.2em;
}

#like {
  cursor: pointer;
}


#like:hover {
  transform: scale(1.2);
  transition: transform 0.2s;
}
</style>
