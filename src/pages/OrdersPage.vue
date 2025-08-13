<script setup lang="ts">
import { getOrders } from "@/entities/Orders/getOrders.api";
import OrdersTable from "@/entities/Orders/OrdersTable.vue";
import type { TOrder } from "@/entities/Orders/Order.types";
import { ref, watch } from "vue";
import FiltersTemplate from "@/shared/components/FiltersTemplate.vue";
import PaginationTemplate from "@/shared/components/PaginationTemplate.vue";
import OrdersDiagrams from "@/entities/Orders/OrdersDiagrams.vue";
import { ElLoading } from "element-plus";
import dayjs from "dayjs";

const PAGE_SIZE = 40;

const orders = ref<TOrder[]>([]);
const total = ref<number>(0);
const page = ref<number>(1);

const filtersRef = ref<InstanceType<typeof FiltersTemplate>>();

watch(
  [page, () => filtersRef.value?.date],
  async ([newPage, newDate], [oldPage, oldDate]) => {
    const isEmptyDate = !newDate || !newDate[0] || !newDate[1];
    if (isEmptyDate) return;

    const oldDateEmpty = !oldDate || !oldDate[0] || !oldDate[1];
    const isSamePage = newPage === oldPage;

    const isSameDates =
      !oldDateEmpty &&
      dayjs(newDate[0]).format("YYYY-MM-DD") === dayjs(oldDate[0]).format("YYYY-MM-DD") &&
      dayjs(newDate[1]).format("YYYY-MM-DD") === dayjs(oldDate[1]).format("YYYY-MM-DD");

    if (isSamePage && isSameDates) return;

    const loading = ElLoading.service({ lock: true });
    try {
      const { data, lastPage } = await getOrders(dayjs(newDate[0]).format("YYYY-MM-DD"), dayjs(newDate[1]).format("YYYY-MM-DD"), newPage, PAGE_SIZE);
      orders.value = data;
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
      <OrdersTable v-if="filtersRef?.type === 'table'" :orders="orders" />
      <OrdersDiagrams v-else :orders="orders" />
    </PaginationTemplate>
  </FiltersTemplate>
</template>
