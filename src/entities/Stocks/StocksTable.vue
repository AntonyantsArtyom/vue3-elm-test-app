<script setup lang="ts">
import type { TStock } from "@/entities/Stocks/Stock.types";
import { formatBool } from "@/shared/utils/formatBool";

defineProps<{
  stocks: TStock[];
}>();
</script>

<template>
  <el-table class="stocks-table" :data="stocks" :table-layout="'auto'">
    <el-table-column prop="date" label="Дата" />
    <el-table-column prop="last_change_date" label="Дата&nbsp;изменения" />
    <el-table-column prop="supplier_article" label="Артикул&nbsp;поставщика" />
    <el-table-column prop="tech_size" label="Технический&nbsp;размер" />
    <el-table-column prop="barcode" label="Штрихкод" />
    <el-table-column prop="quantity" label="Количество" />
    <el-table-column prop="is_supply" label="Поставка" :formatter="formatBool" />
    <el-table-column prop="is_realization" label="Реализация" :formatter="formatBool" />
    <el-table-column prop="quantity_full" label="Полное&nbsp;количество" />
    <el-table-column prop="warehouse_name" label="Склад" />
    <el-table-column prop="in_way_to_client" label="В&nbsp;пути&nbsp;к&nbsp;клиенту" />
    <el-table-column prop="in_way_from_client" label="В&nbsp;пути&nbsp;от&nbsp;клиента" />
    <el-table-column prop="nm_id" label="NM&nbsp;ID" />
    <el-table-column prop="subject" label="Subject" />
    <el-table-column prop="category" label="Категория" />
    <el-table-column prop="brand" label="Бренд" />
    <el-table-column prop="sc_code" label="SC&nbsp;Code" />
    <el-table-column prop="price" label="Цена" />
    <el-table-column prop="discount" label="Скидка&nbsp;(%)" />

    <template #empty>
      <div>Данных нет</div>
    </template>
  </el-table>
</template>

<style scoped lang="scss">
.stocks-table {
  height: calc(100dvh - 168px);

  ::v-deep(.cell) {
    white-space: nowrap;
  }
}
</style>
