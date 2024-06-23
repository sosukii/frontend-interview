<template>
  <div class="wrap">
    <section class="section">
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
        <Checkbox
          v-model="filterConditions"
          :label="'Один дополнительный узел'"
        />
        <Checkbox
          v-model="filterConditions"
          :label="'Два дополнительных узла'"
        />
      </div>
      {{ filterConditions }}
    </section>
    <section class="section section--big">
      <div v-if="filteredCallingPaths.length === 0">Ничего не найдено</div>
      <div v-else class="paths">
        <CallingPath
          v-for="path in filteredCallingPaths"
          :id="path.id"
          :key="path.id"
          :price="path.price"
          :des="path.des"
          :src="path.src"
          :company="path.company"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import BaseSelector from '../shared/ui/dropdown';
import Checkbox from '../shared/ui/checkbox';
import CallingPath from 'src/features/callingPath';
import { Path } from 'src/features/callingPath/types';

const options = ref<object[]>([]);
const companies = ref();
const srcCountry = ref({ title: 'Россия (ru)', value: 'ru' });
const destCountry = ref({ title: 'Германия (de)', value: 'de' });
const filterConditions = ref([]);

const filteredCallingPaths = computed(() => {
  const filtredList: Path[] = [];

  for (let company in companies.value) {
    const availablePaths = companies.value[company]; // arr of paths [{}, {}]
    availablePaths.map((path: Path) => (path.company = company));

    filtredList.push(
      ...availablePaths.filter(
        (pathObj: Path) =>
          pathObj.src === srcCountry.value.value &&
          pathObj.des === destCountry.value.value
      )
    );
  }
  return filtredList.sort((a, b) => a.price - b.price);
});

onMounted(async () => {
  let count = 0;
  const data = await axios.get('src/shared/api/call-paths.json');

  const arr: object[] = Object.keys(data.data.data.country).map((key) => {
    return {
      id: count++,
      title: `${data.data.data.country[key]} (${key})`,
      value: key === 'us' ? 'usa' : key,
    };
  });

  options.value = arr;
  companies.value = data.data.data.company;
});
</script>

<style scoped lang="scss">
.wrap {
  display: flex;
  max-width: 90%;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 25px;
  margin: auto;
  padding: 50px;
  .section {
    flex-grow: 1;
    &--big {
      flex-grow: 2;
    }
  }
  .paths {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
}
</style>
