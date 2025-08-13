<script setup lang="ts">
import type { TStock } from "@/entities/Stocks/Stock.types";
import BaseTable from "@/shared/components/BaseTable.vue";
import { formatBool } from "@/shared/utils/formatBool";

defineProps<{
  stocks: TStock[];
}>();

const columns = [
  { prop: "date", label: "Дата" },
  { prop: "last_change_date", label: "Дата изменения" },
  { prop: "supplier_article", label: "Артикул поставщика" },
  { prop: "tech_size", label: "Технический размер" },
  { prop: "barcode", label: "Штрихкод" },
  { prop: "quantity", label: "Количество" },
  { prop: "is_supply", label: "Поставка", formatter: formatBool },
  { prop: "is_realization", label: "Реализация", formatter: formatBool },
  { prop: "quantity_full", label: "Полное количество" },
  { prop: "warehouse_name", label: "Склад" },
  { prop: "in_way_to_client", label: "В пути к клиенту" },
  { prop: "in_way_from_client", label: "В пути от клиента" },
  { prop: "nm_id", label: "NM ID" },
  { prop: "subject", label: "Subject" },
  { prop: "category", label: "Категория" },
  { prop: "brand", label: "Бренд" },
  { prop: "sc_code", label: "SC Code" },
  { prop: "price", label: "Цена" },
  { prop: "discount", label: "Скидка (%)" },
];
</script>

<template>
  <BaseTable :data="stocks" :columns="columns" table-class="stocks-table" />
</template>

<style scoped lang="scss">
.stocks-table {
  min-height: calc(100dvh - 168px);
}
</style>
