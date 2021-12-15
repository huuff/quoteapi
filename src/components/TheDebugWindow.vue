<template>
<div class="card">
  <div class="card-header d-flex flex-row justify-content-between align-items-baseline">
    <h5 class="d-inline">Debug </h5>
    <button type="button" @click="show = !show" class="btn btn-outline">
        <font-awesome-icon :icon="show ? 'chevron-down' : 'chevron-up'"></font-awesome-icon>
    </button>
  </div>
  <div class="collapse" ref="collapsibleElement">
    <div class="card-body">
      <ul>
        <li v-for="msg in log.toArray()" :key="msg.timestamp">{{ JSON.stringify(msg) }}</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, PropType } from 'vue';
import { Collapse } from 'bootstrap';
import { RingBuffer } from 'ring-buffer-ts';
import { DebugMessage } from '@/debug/debug-message';

const collapsibleElement = ref<null | Element>(null);
let collapsible: null | Collapse;
const show = ref(false);

const props = defineProps({
  log: {
    type: Object as PropType<RingBuffer<DebugMessage>>,
    required: true,
  },
});

onMounted(() => {
  if (collapsibleElement.value) {
    collapsible = new Collapse(collapsibleElement.value, { toggle: false});
  } 
});

watch(show, (newValue: boolean) => {
  if (newValue)
    collapsible?.show();
  else
    collapsible?.hide();
});
</script>

<style scoped>
.card {
  width: 400px;
}

.card-body {
  max-height: 400px;
  overflow: scroll;
}
</style>
