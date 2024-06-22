<template>
  <div>
    <BaseSelector
      v-model="srcCountry"
      :label="'Звонящая сторона (Caller)'"
      :options="options"
    />

    <BaseSelector
      v-model="destCountry"
      :label="'Принимающая сторона (Callee)'"
      :options="options"
    />
    <div class="conditions">
      <Checkbox v-model="filterConditions" :label="'Все'" />
      <Checkbox v-model="filterConditions" :label="'Прямое соединение'" />
      <Checkbox v-model="filterConditions" :label="'Один дополнительный узел'" />
      <Checkbox v-model="filterConditions" :label="'Два дополнительных узла'" />
    </div>

    {{ filterConditions }}
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import BaseSelector from '../shared/ui/dropdown';
import Checkbox from '../shared/ui/checkbox';

const options = ref<string[]>([]);
const srcCountry = ref('');
const destCountry = ref('');
const filterConditions = ref([]);

onMounted(async () => {
  const data = await axios.get('src/shared/api/call-paths.json');

  const arr: string[] = Object.keys(data.data.data.country).map(
    (key) => `${data.data.data.country[key]} (${key})`
  );

  options.value = arr;
});
</script>
