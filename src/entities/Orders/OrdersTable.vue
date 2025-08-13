<script setup lang="ts">
import type { TOrder } from "@/entities/Orders/Order.types";
import BaseTable from "@/shared/components/BaseTable.vue";
import { formatBool } from "@/shared/utils/formatBool";

defineProps<{
  orders: TOrder[];
}>();

const columns = [
  { prop: "g_number", label: "Номер" },
  { prop: "date", label: "Дата" },
  { prop: "last_change_date", label: "Дата изменения" },
  { prop: "supplier_article", label: "Артикул поставщика" },
  { prop: "tech_size", label: "Технический размер" },
  { prop: "barcode", label: "Штрихкод" },
  { prop: "total_price", label: "Общая цена" },
  { prop: "discount_percent", label: "Процент скидки" },
  { prop: "warehouse_name", label: "Склад" },
  { prop: "oblast", label: "Область" },
  { prop: "income_id", label: "ID дохода" },
  { prop: "odid", label: "ODID" },
  { prop: "nm_id", label: "NM ID" },
  { prop: "subject", label: "Subject" },
  { prop: "category", label: "Категория" },
  { prop: "brand", label: "Бренд" },
  { prop: "is_cancel", label: "Отменён", formatter: formatBool },
  { prop: "cancel_dt", label: "Дата отмены" },
];
</script>

<template>
  <BaseTable :data="orders" :columns="columns" table-class="orders-table" />
</template>

<style scoped lang="scss"></style>
