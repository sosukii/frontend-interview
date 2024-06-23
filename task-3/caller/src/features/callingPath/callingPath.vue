<template>
  <q-card class="path">
    <span class="head">{{ price }} $</span>
    <div class="body">
      <div class="body__company">{{ company }} {{ price }}$</div>
      <div class="body__paths">
        <span class="code">{{ src }}</span>
        <q-icon class="body__arrow" color="grey" name="arrow_forward" />
        <span class="code">{{ des }}</span>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { Path } from './types';

defineProps<Path>();
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
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    &__company {
      color: black;
      background-color: orange;
      color: white;
      padding: 5px 10px;
      border-radius: 16px;
    }
    &__paths {
      display: flex;
      align-items: center;
      gap: 35px;
    }
    .code {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 35px;
      border-radius: 12px;
      background-color: #546e7a;
    }
    &__arrow {
      font-size: 45px;
    }
  }
}
</style>
