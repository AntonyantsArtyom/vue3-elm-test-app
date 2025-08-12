<script setup lang="ts">
defineProps<{ pageSize: number; total: number; page: number }>();

const emit = defineEmits<{
  (e: "update:page", value: number): void;
}>();

function handlePageChange(newPage: number) {
  emit("update:page", newPage);
}
</script>

<template>
  <div class="pagination-template">
    <slot></slot>
    <el-pagination :page-size="pageSize" :pager-count="9" layout="prev, pager, next" :total="total" :current-page="page" @current-change="handlePageChange" />
  </div>
</template>

<style scoped lang="scss">
.pagination-template {
  ::v-deep(.el-pagination) {
    margin-top: 10px;
  }
}
</style>
