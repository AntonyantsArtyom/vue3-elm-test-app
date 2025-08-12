<script setup lang="ts">
import { getOrders } from "@/entities/Orders/getOrders";
import OrdersTable from "@/entities/Orders/OrdersTable.vue";
import type { TOrder } from "@/entities/Orders/Order.types";
import { onMounted, ref } from "vue";

const orders = ref<TOrder[]>([]);

onMounted(async () => {
  orders.value = await getOrders("2025-03-12", "2025-08-12", 1, 1);
});
</script>

<template>
  Orders
  <OrdersTable :orders="orders" />
</template>

<style scoped></style>
