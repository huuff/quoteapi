<template>
  <div class="mt-2 d-flex flex-row align-items-baseline">
    <label for="providerSelector" class="text-muted me-2">Provider: </label>
    <select id="providerSelector" @change="setProvider" v-model="selectedProviderName" class="form-select">
      <option v-for="provider in ProviderName" :key="provider">{{provider}}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
// TODO: Save and get provider to and from localStorage
import { ref } from 'vue';
import { getProvider, ProviderName } from '@/quotes/get-provider';
import { QuoteProvider } from '@/quotes/quote-provider';

const selectedProviderName = ref<ProviderName>(ProviderName.quotable);

const emit = defineEmits<{
  (event: 'setProvider', provider: QuoteProvider): void;
}>();

function setProvider() {
  console.log(`Emitting to set provider to: ${selectedProviderName.value}`);
  emit('setProvider', getProvider(selectedProviderName.value));
}
</script>
