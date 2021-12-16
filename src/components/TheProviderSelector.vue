<template>
  <div class="mt-2 d-flex flex-row align-items-baseline">
    <label for="providerSelector" class="text-muted me-2">Provider: </label>
    <select id="providerSelector" @change="setProvider" v-model="selectedProviderName" class="form-select">
      <option v-for="provider in ProviderName" :key="provider">{{provider}}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getProvider, ProviderName } from '@/quotes/get-provider';
import { QuoteProvider } from '@/quotes/quote-provider';

const selectedProviderName = ref<ProviderName>(ProviderName.quotable);

const emit = defineEmits<{
  (event: 'setProvider', provider: QuoteProvider): void;
}>();

function setProvider() {
  localStorage.setItem('provider', selectedProviderName.value.toString() )
  emit('setProvider', getProvider(selectedProviderName.value));
}

function getFromLocalStorage(): ProviderName {
  const storedName = localStorage.getItem('provider');

  if (storedName) {
    return ProviderName[storedName as keyof typeof ProviderName]
  } else {
    return ProviderName.quotable; // Default
  }
}

onMounted(() => {
  selectedProviderName.value = getFromLocalStorage();
  setProvider();
})
</script>
