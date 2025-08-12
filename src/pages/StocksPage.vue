<script setup lang="ts">
import { getStocks } from "@/shared/api/requests/getStocks";
import { onMounted, ref } from "vue";

const stocks = ref<any>(null);

onMounted(async () => {
  stocks.value = await getStocks("2025-08-12", 1, 1);
});
</script>

<template>
  Stocks
  {{ JSON.stringify(stocks, null, 3) }}
</template>

<style scoped></style>
