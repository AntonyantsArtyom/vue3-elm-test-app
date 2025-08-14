<script setup lang="ts">
import { getStocks } from "@/entities/Stocks/getStocks.api";
import StocksTable from "@/entities/Stocks/StocksTable.vue";
import type { TStock } from "@/entities/Stocks/Stock.types";
import { ref, watch } from "vue";
import FiltersTemplate from "@/shared/components/FiltersTemplate.vue";
import PaginationTemplate from "@/shared/components/PaginationTemplate.vue";
import StocksDiagrams from "@/entities/Stocks/StocksDiagrams.vue";
import { ElLoading } from "element-plus";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const PAGE_SIZE = 40;

const stocks = ref<TStock[]>([]);
const total = ref<number>(0);
const page = ref<number>(1);

const filtersRef = ref<InstanceType<typeof FiltersTemplate>>();

//бэкенд блокирует запросы не за сегодняшний день
//при этом работает на часовом поясе UTC+1, для
//того чтобы синхронизировать дату с бэкендом
//локальный часовой пояс приводится к UTC+1
const today = dayjs().utc().add(1, "hour").format("YYYY-MM-DD");

watch(
  [page],
  async () => {
    const loading = ElLoading.service({ lock: true });
    try {
      const { data, lastPage } = await getStocks(today, page.value, PAGE_SIZE);
      stocks.value = data;
      total.value = lastPage;
    } finally {
      loading.close();
    }
  },
  { immediate: true }
);
</script>

<template>
  <FiltersTemplate ref="filtersRef" :no-date="true">
    <PaginationTemplate :pageSize="PAGE_SIZE" :total="total" v-model:page="page">
      <StocksTable v-if="filtersRef?.type === 'table'" :stocks="stocks" />
      <StocksDiagrams v-else :stocks="stocks" />
    </PaginationTemplate>
  </FiltersTemplate>
</template>
