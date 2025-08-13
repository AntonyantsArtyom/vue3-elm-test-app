<script setup lang="ts">
import { getStocks } from "@/entities/Stocks/getStocks.api";
import StocksTable from "@/entities/Stocks/StocksTable.vue";
import PaginationTemplate from "@/shared/components/PaginationTemplate.vue";
import type { TStock } from "@/entities/Stocks/Stock.types";
import { ref, watch } from "vue";
import FiltersTemplate from "@/shared/components/FiltersTemplate.vue";
import StocksDiagrams from "@/entities/Stocks/StocksDiagrams.vue";

const PAGE_SIZE = 40;
const stocks = ref<TStock[]>([]);
const total = ref<number>(0);
const page = ref<number>(1);
const type = ref<"table" | "diagram">("table");

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
  <FiltersTemplate v-model:type="type">
    <PaginationTemplate :pageSize="PAGE_SIZE" :total="total" v-model:page="page">
      <StocksTable v-if="type === 'table'" :stocks="stocks" />
      <StocksDiagrams v-else :stocks="stocks" />
    </PaginationTemplate>
  </FiltersTemplate>
</template>

<style scoped></style>
