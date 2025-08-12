<script setup lang="ts">
import SalesTable from "@/entities/Sales/SalesTable.vue";
import { getSales } from "@/shared/api/requests/getSales";
import type { TSale } from "@/shared/types/Sale";
import { onMounted, ref } from "vue";

const sales = ref<TSale[]>([]);

onMounted(async () => {
  sales.value = await getSales("2025-03-12", "2025-08-12", 1, 3);
});
</script>

<template>
  Sales
  <SalesTable :sales="sales" />
</template>

<style scoped></style>
