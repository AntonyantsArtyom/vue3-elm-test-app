<script setup lang="ts">
import StocksTable from "@/entities/Stocks/StocksTable.vue";
import { getStocks } from "@/shared/api/requests/getStocks";
import type { TStock } from "@/shared/types/Stock";
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
