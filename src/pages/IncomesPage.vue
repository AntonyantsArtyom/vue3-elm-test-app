<script setup lang="ts">
import IncomesTable from "@/entities/Incomes/IncomesTable.vue";
import { getIncomes } from "@/entities/Incomes/getIncomes.api";
import type { TIncome } from "@/entities/Incomes/Income.types";
import { ref, watch } from "vue";
import FiltersTemplate from "@/shared/components/FiltersTemplate.vue";
import PaginationTemplate from "@/shared/components/PaginationTemplate.vue";
import { ElLoading } from "element-plus";
import dayjs from "dayjs";

const PAGE_SIZE = 40;

const incomes = ref<TIncome[]>([]);
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
      dayjs(newDate[0]).format("YYYY-MM-DD") === dayjs(oldDate[0]).format("YYYY-MM-DD") &&
      dayjs(newDate[1]).format("YYYY-MM-DD") === dayjs(oldDate[1]).format("YYYY-MM-DD");

    if (!pageChanged && isSameDates) return;

    const loading = ElLoading.service({ lock: true });
    try {
      const { data, lastPage } = await getIncomes(dayjs(newDate[0]).format("YYYY-MM-DD"), dayjs(newDate[1]).format("YYYY-MM-DD"), newPage, PAGE_SIZE);
      incomes.value = data;
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
      <IncomesTable :incomes="incomes" />
    </PaginationTemplate>
  </FiltersTemplate>
</template>
