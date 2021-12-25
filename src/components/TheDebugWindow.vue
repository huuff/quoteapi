<template>
<div class="card shadow">
  <div class="card-header d-flex flex-row justify-content-between align-items-baseline">
    <h5 class="d-inline">Debug </h5>
    <button type="button" @click="show = !show" class="btn btn-outline">
        <font-awesome-icon :icon="show ? 'chevron-down' : 'chevron-up'"></font-awesome-icon>
    </button>
  </div>
  <div class="collapse" ref="collapsibleElement">
    <div class="card-body" ref="logElement">
      <ul class="list-group list-group-flush">
        <li v-for="msg in log.toArray()" 
          :key="msg.timestamp.toISOString()"
          class="list-group-item"
        >
          <div class="text-muted">{{ msg.timestamp.toISOString() }}</div>
          <div :class="`text-${getColor(msg.type)}`">{{ msg.type }} </div> 
          <p v-text="JSON.stringify(msg.contents, null, 2)" class="pre-wrap"></p>
        </li>
      </ul>
    </div>
    <footer class="card-footer d-flex flex-row justify-content-between align-items-baseline">
      <button class="btn btn-danger btn btn-sm" @click="clearStorage">Clear storage</button>
      <span>Next quote in: {{ timeToRefresh }}</span>
    </footer>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { Collapse } from 'bootstrap';
import { RingBuffer } from 'ring-buffer-ts';
import { DebugMessage, DebugMessageType } from '@/debug/debug-message';
import { BootstrapColor } from '@/bootstrap-color';

const collapsibleElement = ref<null | Element>(null);
const logElement = ref<null | Element>(null);
const show = ref(false);
let collapsible: null | Collapse;

const props = defineProps<{
  log: RingBuffer<DebugMessage>;
  nextRefresh: number;
}>();

function calculateTimeToRefresh() {
  return Math.round((props.nextRefresh - new Date().getTime()) / 1000) ;
}

const timeToRefresh = ref(calculateTimeToRefresh());
const updateTimeToRefresh = setInterval(() => timeToRefresh.value = calculateTimeToRefresh(), 250);

onMounted(() => {
  if (collapsibleElement.value) {
    collapsible = new Collapse(collapsibleElement.value, { toggle: false });
  } 
});

watch(show, (newValue: boolean) => {
  if (newValue)
    collapsible?.show();
  else
    collapsible?.hide();
});

watch(() => props.log.toArray(), () => {
    setTimeout(() => {
      if (logElement.value)
        logElement.value.scrollTop = logElement.value.scrollHeight
    }, 10);
});

function getColor(messageType: DebugMessageType): BootstrapColor {
  if (messageType === 'received')
    return 'primary';
  if (messageType === 'requested')
    return 'warning';
  else
    throw new Error(`Debug message type ${messageType} not defined`);
}

function clearStorage() {
  localStorage.clear();
}

onUnmounted(() => clearInterval(updateTimeToRefresh));
</script>

<style scoped>
.card {
  width: 400px;
}

.card-body {
  max-height: 400px;
  overflow: scroll;
}

.pre-wrap {
  white-space: pre-wrap;
  font-size: 10px;
}
</style>
