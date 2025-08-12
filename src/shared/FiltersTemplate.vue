<script setup lang="ts">
import { ref, defineEmits, watch } from "vue";

const props = defineProps<{ date: string[] }>();

const emit = defineEmits<{
  (e: "update:date", value: string[]): void;
}>();

const date = ref(props.date);

watch(
  () => props.date,
  (propsTime) => (date.value = propsTime)
);

function onChange(value: string[]) {
  date.value = value;

  if (!value || value.length === 0) {
    date.value = ["", ""];
    emit("update:date", ["", ""]);
    return;
  }

  emit(
    "update:date",
    value.map((date) => new Date(date).toISOString().split("T")[0])
  );
}
</script>

<template>
  <div id="filters-template">
    <div id="filters-container">
      <span id="filters-template-title">вывести за период: </span>
      <el-date-picker v-model="date" type="daterange" start-placeholder="начало" end-placeholder="конец" @change="onChange" />
    </div>
    <slot v-if="date[0] && date[1]"></slot>
  </div>
</template>

<style scoped lang="scss">
#filters-template {
  #filters-container {
    margin-bottom: 20px;

    ::v-deep(.el-date-editor) {
      width: 240px;
    }
  }
  #filters-template-title {
    color: var(--el-text-color-primary);
  }
}
</style>
