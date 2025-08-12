<script setup lang="ts">
import type { TIncome } from "@/shared/types/Income";

defineProps<{ incomes: TIncome[] }>();
</script>

<template>
  <el-table class="incomes-table" :data="incomes" :table-layout="'auto'">
    <el-table-column prop="income_id" label="ID дохода" />
    <el-table-column prop="number" label="Номер" />
    <el-table-column prop="date" label="Дата" />
    <el-table-column prop="last_change_date" label="Дата изменения" />
    <el-table-column prop="supplier_article" label="Артикул поставщика" />
    <el-table-column prop="tech_size" label="Технический размер" />
    <el-table-column prop="barcode" label="Штрихкод" />
    <el-table-column prop="quantity" label="Количество" />
    <el-table-column prop="total_price" label="Общая цена" />
    <el-table-column prop="date_close" label="Дата закрытия" />
    <el-table-column prop="warehouse_name" label="Склад" />
    <el-table-column prop="nm_id" label="NM ID" />

    <template #empty>
      <div>Данных нет</div>
    </template>
  </el-table>
</template>

<style scoped lang="scss">
.incomes-table ::v-deep(.cell) {
  white-space: nowrap;
}
</style>
