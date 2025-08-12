<script setup lang="ts">
import IncomesTable from "@/entities/Incomes/IncomesTable.vue";
import { getIncomes } from "@/entities/Incomes/getIncomes";
import type { TIncome } from "@/shared/types/Income";
import { onMounted, ref } from "vue";

const incomes = ref<TIncome[]>([]);

onMounted(async () => {
  incomes.value = await getIncomes("2025-03-12", "2025-08-12", 1, 1);
});
</script>

<template>
  Incomes
  <IncomesTable :incomes="incomes" />
</template>

<style scoped></style>
