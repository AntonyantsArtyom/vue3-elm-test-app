<script setup lang="ts">
import { getStocks } from "@/entities/Stocks/getStocks.api";
import StocksTable from "@/entities/Stocks/StocksTable.vue";
import PaginationTemplate from "@/shared/PaginationTemplate.vue";
import type { TStock } from "@/entities/Stocks/Stock.types";
import { ref, watch } from "vue";

const PAGE_SIZE = 40;
const stocks = ref<TStock[]>([]);
const total = ref<number>(0);
const page = ref<number>(1);

const today = new Date().toISOString().split("T")[0];

watch(
  page,
  async (newPage) => {
    const { data, lastPage } = await getStocks(today, newPage, PAGE_SIZE);
    stocks.value = data;
    total.value = lastPage;
  },
  { immediate: true }
);
</script>

<template>
  <PaginationTemplate :pageSize="PAGE_SIZE" :total="total" v-model:page="page">
    <StocksTable :stocks="stocks" />
  </PaginationTemplate>
</template>

<style scoped></style>
