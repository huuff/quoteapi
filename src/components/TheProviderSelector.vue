<template>
  <div class="mt-2 d-flex flex-row align-items-baseline">
    <label for="providerSelector" class="text-muted me-2">Provider: </label>
    <select id="providerSelector" class="form-select" v-model="providerName">
      <option v-for="provider in ProviderName" :key="provider">{{provider}}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ProviderName } from '@/quotes/get-provider';
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';

const store = useStore();
const { provider } = storeToRefs(store);

const emit = defineEmits<{
  (event: 'changeProvider'): void;
}>();

const providerName = computed({
  get: () => provider.value.name,
  set: (providerName: ProviderName) => {
    store.setProvider(providerName);
    emit('changeProvider');
  },
});

</script>
