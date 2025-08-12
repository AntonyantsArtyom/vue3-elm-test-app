<script setup lang="ts">
import { getStocks } from "@/entities/Stocks/getStocks.api";
import StocksTable from "@/entities/Stocks/StocksTable.vue";
import type { TStock } from "@/entities/Stocks/Stock.types";
import { onMounted, ref } from "vue";

const stocks = ref<TStock[]>([]);

onMounted(async () => {
  stocks.value = await getStocks("2025-08-12", 1, 1);
});
</script>

<template>
  Stocks
  <StocksTable :stocks="stocks" />
</template>

<style scoped></style>
