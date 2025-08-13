<script setup lang="ts">
import { getOrders } from "@/entities/Orders/getOrders.api";
import OrdersTable from "@/entities/Orders/OrdersTable.vue";
import type { TOrder } from "@/entities/Orders/Order.types";
import { ref, watch } from "vue";
import FiltersTemplate from "@/shared/FiltersTemplate.vue";
import PaginationTemplate from "@/shared/PaginationTemplate.vue";
import OrdersDiagrams from "@/entities/Orders/OrdersDiagrams.vue";

const PAGE_SIZE = 35;

const orders = ref<TOrder[]>([]);
const total = ref<number>(0);
const page = ref<number>(1);
const date = ref(["", ""]);
const type = ref<"table" | "diagram">("table");

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
  <FiltersTemplate v-model:date="date" v-model:type="type">
    <PaginationTemplate :pageSize="PAGE_SIZE" :total="total" v-model:page="page">
      <OrdersTable v-if="type === 'table'" :orders="orders" />
      <OrdersDiagrams v-else :orders="orders" />
    </PaginationTemplate>
  </FiltersTemplate>
</template>

<style scoped></style>
