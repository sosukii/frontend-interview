<template>
  <div class="wrap">
    <section class="section">
      <Dropdown
        v-model="caller"
        :label="'Звонящая сторона (Caller)'"
        :options="countryList"
      />
      <Dropdown
        v-model="callee"
        :label="'Принимающая сторона (Callee)'"
        :options="countryList"
      />

      <div class="conditions">
        <Checkbox v-model="isAllVariants" :label="'Все'" />
        <Checkbox v-model="isStraight" :label="'Прямое соединение'" />
        <Checkbox
          v-model="isOneAdditionalNode"
          :label="'Один дополнительный узел'"
        />
        <Checkbox
          v-model="isTwoAdditionalNode"
          :label="'Два дополнительных узла'"
        />
      </div>
    </section>
    <section class="section section--big">
      <div v-if="pagedCallingPaths.length === 0">Ничего не найдено</div>
      <div v-else class="paths">
        <CallingPath
          v-for="(path, i) in pagedCallingPaths"
          :key="i"
          :data="Array.isArray(path) ? path : [path]"
        />
      </div>
      <q-pagination
        v-model="currentPage"
        :max="maxPage"
        direction-links
        flat
        color="grey"
        active-color="orange"
        @input="changePage"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue';
import axios from 'axios';
import Dropdown from '../shared/ui/dropdown';
import Checkbox from '../shared/ui/checkbox';
import CallingPath from 'src/features/callingPath';
import { Path } from 'src/features/callingPath/types';
type PathOrArrayOfPaths = Path | Path[];

const dataFromServer = ref();
const countryList = ref<object[]>([]);
const caller = ref({ title: 'Россия (ru)', value: 'ru' });
const callee = ref({ title: 'Германия (de)', value: 'de' });

const callingPaths = ref<Path[]>([]);
const filteredCallingPaths = ref<PathOrArrayOfPaths[]>([]);

const isAllVariants = ref<boolean>(false);
const isStraight = ref<boolean>(false);
const isOneAdditionalNode = ref<boolean>(false);
const isTwoAdditionalNode = ref<boolean>(false);

const currentPage = ref<number>(1);
const pageSize = 4;

watch(isAllVariants, () => {
  if (isAllVariants.value) {
    isStraight.value = true;
    isOneAdditionalNode.value = true;
    isTwoAdditionalNode.value = true;
  }
});

watch([isStraight, isOneAdditionalNode, isTwoAdditionalNode], () => {
  if (
    isStraight.value &&
    isOneAdditionalNode.value &&
    isTwoAdditionalNode.value
  ) {
    isAllVariants.value = true;
  } else {
    isAllVariants.value = false;
  }
});
watch(
  [
    isAllVariants,
    isStraight,
    isOneAdditionalNode,
    isTwoAdditionalNode,
    caller,
    callee,
  ],
  () => {
    const filtredList: PathOrArrayOfPaths[] = [];

    if (isStraight.value) {
      filtredList.push(
        ...callingPaths.value.filter(
          (path: Path) =>
            path.src === caller.value.value && path.des === callee.value.value
        )
      );
    }
    if (isOneAdditionalNode.value) {
      const startRoutes = callingPaths.value.filter(
        (path) => path.src === caller.value.value
      ); // все объекты, где совпала страна src
      const restRoutes = callingPaths.value.filter(
        (path) =>
          path.src !== caller.value.value && path.des === callee.value.value
      ); // оставшиеся объекты (у кот. des совпадает с выбранным конечным пунктом)

      startRoutes.forEach((startRoute) => {
        restRoutes.forEach((restRoute) => {
          if (startRoute.des === restRoute.src) {
            // формируем связку с 1 доп роутом
            filtredList.push([startRoute, restRoute]);
          }
        });
      });
    }

    // sort by price
    filteredCallingPaths.value = filtredList.sort((a, b) => {
      let firstEl, secondEl;
      if (Array.isArray(a)) {
        firstEl = a.reduce((sum, path) => sum + path.price, 0);
      } else {
        firstEl = a.price;
      }

      if (Array.isArray(b)) {
        secondEl = b.reduce((sum, path) => sum + path.price, 0);
      } else {
        secondEl = b.price;
      }
      return firstEl - secondEl;
    });
  }
);

// pagination ---
const maxPage = computed(() =>
  Math.ceil(filteredCallingPaths.value.length / pageSize)
);

const pagedCallingPaths = computed(() => {
  return filteredCallingPaths.value.slice(
    (currentPage.value - 1) * pageSize,
    currentPage.value * pageSize
  );
});

const changePage = (page: number) => {
  currentPage.value = page;
};
// pagination ---

onMounted(async () => {
  const response = await axios.get('src/shared/api/call-paths.json');
  const data = response.data.data;

  countryList.value = Object.keys(data.country).map((key) => {
    let count = 1;
    return {
      id: count++,
      title: `${data.country[key]} (${key})`,
      value: key === 'us' ? 'usa' : key,
    };
  });

  for (const [company, paths] of Object.entries(data.company)) {
    const pathsArr: Path[] = paths as Path[];
    pathsArr.forEach((path: Path, index: number) => {
      path.id = index + 1;
      path.company = company;
    });
    callingPaths.value = [...callingPaths.value, ...pathsArr];
  }

  dataFromServer.value = data;
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
