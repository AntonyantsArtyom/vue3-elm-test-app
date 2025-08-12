<script setup lang="ts">
import SalesTable from "@/entities/Sales/SalesTable.vue";
import { getSales } from "@/entities/Sales/getSales.api";
import type { TSale } from "@/entities/Sales/Sale.types";
import { ref, watch } from "vue";
import FiltersTemplate from "@/shared/FiltersTemplate.vue";
import PaginationTemplate from "@/shared/PaginationTemplate.vue";

const PAGE_SIZE = 40;

const sales = ref<TSale[]>([]);
const total = ref<number>(0);
const page = ref<number>(1);
const date = ref(["", ""]);
const type = ref<"table" | "diagram">("table");

watch(
  [date, page],
  async ([newDate, newPage]) => {
    if (!newDate[0] || !newDate[1]) return;
    const { data, lastPage } = await getSales(newDate[0], newDate[1], newPage, PAGE_SIZE);
    sales.value = data;
    total.value = lastPage;
  },
  { immediate: true }
);
</script>

<template>
  <FiltersTemplate v-model:date="date" v-model:type="type">
    <PaginationTemplate :pageSize="PAGE_SIZE" :total="total" v-model:page="page">
      <SalesTable :sales="sales" />
    </PaginationTemplate>
  </FiltersTemplate>
</template>

<style scoped></style>
