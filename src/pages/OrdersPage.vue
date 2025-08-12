<script setup lang="ts">
import { getOrders } from "@/shared/api/requests/getOrders";
import { onMounted, ref } from "vue";

const orders = ref<any>(null);

onMounted(async () => {
  orders.value = await getOrders("2025-03-12", "2025-08-12", 1, 1);
});
</script>

<template>
  Orders
  {{ JSON.stringify(orders, null, 3) }}
</template>

<style scoped></style>
