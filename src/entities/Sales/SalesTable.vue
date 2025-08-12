<script setup lang="ts">
import type { TSale } from "@/entities/Sales/Sale.types";
import { formatBool } from "@/shared/utils/formatBool";

defineProps<{
  sales: TSale[];
}>();
</script>

<template>
  <el-table class="sales-table" :data="sales" :table-layout="'auto'">
    <el-table-column prop="g_number" label="Номер" />
    <el-table-column prop="date" label="Дата" />
    <el-table-column prop="last_change_date" label="Дата изменения" />
    <el-table-column prop="supplier_article" label="Артикул поставщика" />
    <el-table-column prop="tech_size" label="Технический размер" />
    <el-table-column prop="barcode" label="Штрихкод" />
    <el-table-column prop="total_price" label="Общая цена" />
    <el-table-column prop="discount_percent" label="Процент скидки" />
    <el-table-column prop="is_supply" label="Поставка" :formatter="formatBool" />
    <el-table-column prop="is_realization" label="Реализация" :formatter="formatBool" />
    <el-table-column prop="promo_code_discount" label="Скидка по промокоду" />
    <el-table-column prop="warehouse_name" label="Склад" />
    <el-table-column prop="country_name" label="Страна" />
    <el-table-column prop="oblast_okrug_name" label="Округ" />
    <el-table-column prop="region_name" label="Регион" />
    <el-table-column prop="income_id" label="ID дохода" />
    <el-table-column prop="sale_id" label="ID продажи" />
    <el-table-column prop="odid" label="ODID" />
    <el-table-column prop="spp" label="SPP" />
    <el-table-column prop="for_pay" label="К оплате" />
    <el-table-column prop="finished_price" label="Итоговая цена" />
    <el-table-column prop="price_with_disc" label="Цена со скидкой" />
    <el-table-column prop="nm_id" label="NM ID" />
    <el-table-column prop="subject" label="Subject" />
    <el-table-column prop="category" label="Категория" />
    <el-table-column prop="brand" label="Бренд" />
    <el-table-column prop="is_storno" label="Сторно" :formatter="formatBool" />

    <template #empty>
      <div>Данных нет</div>
    </template>
  </el-table>
</template>

<style scoped lang="scss">
.sales-table {
  height: calc(100dvh - 210px);

  ::v-deep(.cell) {
    white-space: nowrap;
  }
}
</style>
