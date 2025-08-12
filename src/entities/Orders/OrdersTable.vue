<script setup lang="ts">
import type { TOrder } from "@/entities/Orders/Order.types";
import { formatBool } from "@/shared/utils/formatBool";

defineProps<{
  orders: TOrder[];
}>();
</script>

<template>
  <el-table class="orders-table" :data="orders" :table-layout="'auto'">
    <el-table-column prop="g_number" label="Номер" />
    <el-table-column prop="date" label="Дата" />
    <el-table-column prop="last_change_date" label="Дата изменения" />
    <el-table-column prop="supplier_article" label="Артикул поставщика" />
    <el-table-column prop="tech_size" label="Технический размер" />
    <el-table-column prop="barcode" label="Штрихкод" />
    <el-table-column prop="total_price" label="Общая цена" />
    <el-table-column prop="discount_percent" label="Процент скидки" />
    <el-table-column prop="warehouse_name" label="Склад" />
    <el-table-column prop="oblast" label="Область" />
    <el-table-column prop="income_id" label="ID дохода" />
    <el-table-column prop="odid" label="ODID" />
    <el-table-column prop="nm_id" label="NM ID" />
    <el-table-column prop="subject" label="Subject" />
    <el-table-column prop="category" label="Категория" />
    <el-table-column prop="brand" label="Бренд" />
    <el-table-column prop="is_cancel" label="Отменён" :formatter="formatBool" />
    <el-table-column prop="cancel_dt" label="Дата отмены" />

    <template #empty>
      <div>Данных нет</div>
    </template>
  </el-table>
</template>

<style scoped lang="scss">
.orders-table {
  height: calc(100dvh - 170px);

  ::v-deep(.cell) {
    white-space: nowrap;
  }
}
</style>
