<template>
  <q-card class="path">
    <span class="head">{{ totalPrice }} $</span>
    <div class="body">
      <div class="companies">
        <span
          v-for="(company, i) in companies"
          :key="i"
          class="companies__company"
          >{{ company }}</span
        >
      </div>
      <div class="codes">
        <span v-for="(code, i) in codes" :key="i" class="codes__code">
          {{ code }}
        </span>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Path } from './types';

const props = defineProps<{
  data: Path[];
}>();

const totalPrice = ref<number>(0);
const companies = ref<string[]>([]);
const codes = ref<string[]>([]);

onMounted(() => {
  totalPrice.value = props.data.reduce((acc, path) => acc + path.price, 0);
  props.data.forEach((item, index) => {
    if (index === 0) {
      codes.value.push(item.src);
      codes.value.push(item.des);
    } else {
      const prevItem = codes.value[codes.value.length - 1];
      if (item.src !== prevItem) {
        codes.value.push(item.src);
      }
      if (item.des !== prevItem) {
        codes.value.push(item.des);
      }
    }
    if (item.company) {
      companies.value.push(`${item.company} ${item.price}$`);
    }
  });
});
</script>

<style scoped lang="scss">
.path {
  width: 100%;
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  .head {
    background-color: orange;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .body {
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    .codes {
      display: flex;
      align-items: center;
      gap: 35px;
      &__code {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 35px;
        border-radius: 12px;
        background-color: #546e7a;
        color: white;
        position: relative;
        &:not(:last-child)::after {
          content: '→';
          display: block;
          font-size: 28px;
          position: absolute;
          right: -70%;
          width: 60%;
          height: 50px;
          color: grey;
        }
      }
    }
    .companies {
      display: flex;
      gap: 20px;
      &__company {
        color: black;
        background-color: orange;
        color: white;
        padding: 5px 10px;
        border-radius: 16px;
      }
    }
  }
}
</style>
