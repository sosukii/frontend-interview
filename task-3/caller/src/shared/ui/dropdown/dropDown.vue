<template>
  <q-select
    :options="options"
    :label="label"
    :model-value="modelValue"
    @update:model-value="(val: string) => $emit('update:modelValue', val)"
  />
</template>

<script setup lang="ts">
interface SelectorProps {
  label: string;
  options: string[];
  modelValue: string;
}

defineProps<SelectorProps>();
</script>

<style scoped></style>
