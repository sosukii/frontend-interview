<template>
  <q-checkbox
    class="checkbox"
    :val="label"
    :label="label"
    color="orange"
    :model-value="modelValue"
    @update:model-value="(val: string) => $emit('update:modelValue', val)"
  />
</template>

<script setup lang="ts">
interface CheckboxProps {
  label: string;
  modelValue: string[];
}

defineProps<CheckboxProps>();
</script>

<style scoped lang="scss">
.checkbox {
  display: flex;
}
</style>
