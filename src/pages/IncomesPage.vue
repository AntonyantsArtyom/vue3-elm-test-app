<script setup lang="ts">
import { getIncomes } from "@/shared/api/getIncomes";
import { onMounted, ref } from "vue";

const incomes = ref<any>(null);

onMounted(async () => {
  incomes.value = await getIncomes("2025-03-12", "2025-08-12", 1, 1);
});
</script>

<template>
  Incomes
  {{ JSON.stringify(incomes, null, 3) }}
</template>

<style scoped></style>
