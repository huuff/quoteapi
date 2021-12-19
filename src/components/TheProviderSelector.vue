<template>
  <div class="mt-2 d-flex flex-row align-items-baseline">
    <label for="providerSelector" class="text-muted me-2">Provider: </label>
    <select id="providerSelector" class="form-select" v-model="providerType">
      <option v-for="provider in ProviderType" :key="provider">{{provider}}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ProviderType } from '@/quotes/quote-provider';
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';

const store = useStore();
const { provider } = storeToRefs(store);

const emit = defineEmits<{
  (event: 'changeProvider'): void;
}>();

const providerType = computed({
  get: () => provider.value.type,
  set: (providerType: ProviderType) => {
    store.setProvider(providerType);
    emit('changeProvider');
  },
});

</script>
