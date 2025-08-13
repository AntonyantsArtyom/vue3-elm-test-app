<script setup lang="ts">
import type { TIncome } from "@/entities/Incomes/Income.types";
import BaseTable from "@/shared/components/BaseTable.vue";

defineProps<{ incomes: TIncome[] }>();

const columns = [
  { prop: "income_id", label: "ID дохода" },
  { prop: "number", label: "Номер" },
  { prop: "date", label: "Дата" },
  { prop: "last_change_date", label: "Дата изменения" },
  { prop: "supplier_article", label: "Артикул поставщика" },
  { prop: "tech_size", label: "Технический размер" },
  { prop: "barcode", label: "Штрихкод" },
  { prop: "quantity", label: "Количество" },
  { prop: "total_price", label: "Общая цена" },
  { prop: "date_close", label: "Дата закрытия" },
  { prop: "warehouse_name", label: "Склад" },
  { prop: "nm_id", label: "NM ID" },
];
</script>

<template>
  <BaseTable :data="incomes" :columns="columns" table-class="incomes-table" />
</template>

<style scoped></style>
