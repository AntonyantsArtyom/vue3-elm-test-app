<script setup lang="ts">
import SalesTable from "@/entities/Sales/SalesTable.vue";
import { getSales } from "@/entities/Sales/getSales.api";
import type { TSale } from "@/entities/Sales/Sale.types";
import { ref, watch } from "vue";
import FiltersTemplate from "@/shared/components/FiltersTemplate.vue";
import PaginationTemplate from "@/shared/components/PaginationTemplate.vue";
import SalesDiagrams from "@/entities/Sales/SalesDiagrams.vue";
import { ElLoading } from "element-plus";
import dayjs from "dayjs";

const PAGE_SIZE = 40;

const sales = ref<TSale[]>([]);
const total = ref<number>(0);
const page = ref<number>(1);

const filtersRef = ref<InstanceType<typeof FiltersTemplate>>();

watch(
  [page, () => filtersRef.value?.date],
  async ([newPage, newDate], [oldPage, oldDate]) => {
    const isEmptyDate = !newDate || !newDate[0] || !newDate[1];
    if (isEmptyDate) return;

    const oldDateEmpty = !oldDate || !oldDate[0] || !oldDate[1];
    const pageChanged = newPage !== oldPage;

    const isSameDates =
      !oldDateEmpty &&
      dayjs(new Date(newDate[0])).format("YYYY-MM-DD") === dayjs(new Date(oldDate[0])).format("YYYY-MM-DD") &&
      dayjs(new Date(newDate[1])).format("YYYY-MM-DD") === dayjs(new Date(oldDate[1])).format("YYYY-MM-DD");

    if (!pageChanged && isSameDates) return;

    const loading = ElLoading.service({ lock: true });
    try {
      const { data, lastPage } = await getSales(
        dayjs(new Date(newDate[0])).format("YYYY-MM-DD"),
        dayjs(new Date(newDate[1])).format("YYYY-MM-DD"),
        newPage,
        PAGE_SIZE
      );
      sales.value = data;
      total.value = lastPage;
    } finally {
      loading.close();
    }
  },
  { immediate: true }
);
</script>

<template>
  <FiltersTemplate ref="filtersRef">
    <PaginationTemplate :pageSize="PAGE_SIZE" :total="total" v-model:page="page">
      <SalesTable v-if="filtersRef?.type === 'table'" :sales="sales" />
      <SalesDiagrams v-else :sales="sales" />
    </PaginationTemplate>
  </FiltersTemplate>
</template>
