<script setup lang="ts">
import IncomesTable from "@/entities/Incomes/IncomesTable.vue";
import { getIncomes } from "@/entities/Incomes/getIncomes.api";
import type { TIncome } from "@/entities/Incomes/Income.types";
import { ref, watch } from "vue";
import FiltersTemplate from "@/shared/components/FiltersTemplate.vue";
import PaginationTemplate from "@/shared/components/PaginationTemplate.vue";
import { ElLoading } from "element-plus";

const PAGE_SIZE = 40;

const incomes = ref<TIncome[]>([]);
const total = ref<number>(0);
const page = ref<number>(1);
const date = ref(["", ""]);
const type = ref<"table" | "diagram">("table");

watch(
  [date, page],
  async ([newDate, newPage]) => {
    if (!newDate[0] || !newDate[1]) return;
    const loading = ElLoading.service({
      lock: true,
    });
    try {
      const { data, lastPage } = await getIncomes(newDate[0], newDate[1], newPage, PAGE_SIZE);
      incomes.value = data;
      total.value = lastPage;
    } catch (error) {
    } finally {
      loading.close();
    }
  },
  { immediate: true }
);
</script>

<template>
  <FiltersTemplate v-model:date="date" v-model:type="type">
    <PaginationTemplate :pageSize="PAGE_SIZE" :total="total" v-model:page="page">
      <IncomesTable :incomes="incomes" />
    </PaginationTemplate>
  </FiltersTemplate>
</template>

<style scoped></style>
