<script setup lang="ts">
import { Warning } from "@element-plus/icons-vue";

interface Column {
  prop: string;
  label: string;
  formatter?: (row: any, column: any, cellValue: any) => string;
}

defineProps<{
  data: any[];
  columns: Column[];
  tableClass?: string;
}>();
</script>

<template>
  <el-table :class="'base-table' + (tableClass ? ' ' + tableClass : '')" :data="data" :table-layout="'auto'">
    <el-table-column v-for="col in columns" :key="col.prop" :prop="col.prop" :label="col.label" :formatter="col.formatter" />

    <template #empty>
      <div class="empty-message">
        <Warning class="empty-message-icon" />
        <h4 class="empty-message-title">Данные отсутствуют</h4>
      </div>
    </template>
  </el-table>
</template>

<style scoped lang="scss">
.base-table {
  height: calc(100dvh - 210px);

  ::v-deep(.cell) {
    white-space: nowrap;
  }
}

.empty-message {
  color: var(--el-text-color-secondary);
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: start;

  .empty-message-title {
    width: 225px;
    margin: 0px;
    margin-top: 10px;
    font-size: 16px;
    line-height: unset;
  }

  .empty-message-icon {
    width: 100px;
    height: 100px;
  }
}

.empty-icon {
  font-size: 32px;
  margin-bottom: 6px;
}
</style>
