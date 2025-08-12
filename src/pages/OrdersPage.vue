<script setup lang="ts">
import { getOrders } from "@/entities/Orders/getOrders.api";
import OrdersTable from "@/entities/Orders/OrdersTable.vue";
import type { TOrder } from "@/entities/Orders/Order.types";
import { ref, watch } from "vue";
import FiltersTemplate from "@/shared/FiltersTemplate.vue";
import PaginationTemplate from "@/shared/PaginationTemplate.vue";

const PAGE_SIZE = 40;

const orders = ref<TOrder[]>([]);
const total = ref<number>(0);
const page = ref<number>(1);
const date = ref(["", ""]);

watch(
  [date, page],
  async ([newDate, newPage]) => {
    if (!newDate[0] || !newDate[1]) return;
    const { data, lastPage } = await getOrders(newDate[0], newDate[1], newPage, PAGE_SIZE);
    orders.value = data;
    total.value = lastPage;
  },
  { immediate: true }
);
</script>

<template>
  <FiltersTemplate v-model:date="date">
    <PaginationTemplate :pageSize="PAGE_SIZE" :total="total" v-model:page="page">
      <OrdersTable :orders="orders" />
    </PaginationTemplate>
  </FiltersTemplate>
</template>

<style scoped></style>
