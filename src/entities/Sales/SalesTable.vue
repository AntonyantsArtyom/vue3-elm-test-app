<script setup lang="ts">
import type { TSale } from "@/entities/Sales/Sale.types";
import BaseTable from "@/shared/components/BaseTable.vue";
import { formatBool } from "@/shared/utils/formatBool";

defineProps<{
  sales: TSale[];
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
  { prop: "is_supply", label: "Поставка", formatter: formatBool },
  { prop: "is_realization", label: "Реализация", formatter: formatBool },
  { prop: "promo_code_discount", label: "Скидка по промокоду" },
  { prop: "warehouse_name", label: "Склад" },
  { prop: "country_name", label: "Страна" },
  { prop: "oblast_okrug_name", label: "Округ" },
  { prop: "region_name", label: "Регион" },
  { prop: "income_id", label: "ID дохода" },
  { prop: "sale_id", label: "ID продажи" },
  { prop: "odid", label: "ODID" },
  { prop: "spp", label: "SPP" },
  { prop: "for_pay", label: "К оплате" },
  { prop: "finished_price", label: "Итоговая цена" },
  { prop: "price_with_disc", label: "Цена со скидкой" },
  { prop: "nm_id", label: "NM ID" },
  { prop: "subject", label: "Subject" },
  { prop: "category", label: "Категория" },
  { prop: "brand", label: "Бренд" },
  { prop: "is_storno", label: "Сторно", formatter: formatBool },
];
</script>

<template>
  <BaseTable :data="sales" :columns="columns" />
</template>

<style scoped lang="scss"></style>
