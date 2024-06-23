<template>
  <q-select
    class="select"
    option-label="title"
    option-value="value"
    :options="options"
    :label="label"
    :model-value="modelValue"
    @update:model-value="(val: object) => $emit('update:modelValue', val)"
  />
</template>

<script setup lang="ts">
interface SelectorProps {
  label: string;
  options: object[];
  modelValue: object;
}

defineProps<SelectorProps>();
</script>

<style scoped>
.select {
  width: 100%;
}
</style>
