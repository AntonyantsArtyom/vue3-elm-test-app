<script setup lang="ts">
import { getSales } from "@/shared/api/getSales";
import { onMounted, ref } from "vue";

const sales = ref<any>(null);

onMounted(async () => {
  sales.value = await getSales("2025-03-12", "2025-08-12", 1, 1);
});
</script>

<template>
  Sales
  {{ JSON.stringify(sales, null, 3) }}
</template>

<style scoped></style>
