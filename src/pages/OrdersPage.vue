<script setup lang="ts">
import { getOrders } from "@/entities/Orders/getOrders.api";
import OrdersTable from "@/entities/Orders/OrdersTable.vue";
import type { TOrder } from "@/entities/Orders/Order.types";
import { ref, watch } from "vue";
import FiltersTemplate from "@/shared/FiltersTemplate.vue";

const orders = ref<TOrder[]>([]);
const date = ref(["", ""]);

watch(
  date,
  async () => {
    if (!date.value[0] || !date.value[1]) return;
    orders.value = await getOrders(date.value[0], date.value[1], 1, 40);
  },
  { immediate: true }
);
</script>

<template>
  <FiltersTemplate v-model:date="date">
    <OrdersTable :orders="orders" />
  </FiltersTemplate>
</template>

<style scoped></style>
