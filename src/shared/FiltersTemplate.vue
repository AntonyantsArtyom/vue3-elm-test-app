<script setup lang="ts">
import { ref, defineEmits, watch } from "vue";

const props = defineProps<{ date: string[]; type: string }>();

const emit = defineEmits<{
  (e: "update:date", value: string[]): void;
  (e: "update:type", value: string): void;
}>();

const date = ref(props.date);
const type = ref(props.type);

watch(
  () => props.date,
  (propsTime) => (date.value = propsTime)
);

watch(
  () => props.type,
  (propsType) => (type.value = propsType)
);

function onDateChange(value: string[]) {
  date.value = value;

  if (!value || value.length === 0) {
    date.value = ["", ""];
    emit("update:date", ["", ""]);
    return;
  }

  emit(
    "update:date",
    value.map((d) => new Date(d).toISOString().split("T")[0])
  );
}

function onTypeChange(value: string) {
  type.value = value;
  emit("update:type", value);
}
</script>

<template>
  <div id="filters-template">
    <div id="filters-container">
      <div class="filters-element">
        <span id="filters-template-title">период: </span>
        <el-date-picker v-model="date" type="daterange" start-placeholder="начало" end-placeholder="конец" @change="onDateChange" />
      </div>
      <div class="filters-element">
        <span id="filters-template-title">отображение: </span>
        <el-radio-group v-model="type" @change="onTypeChange">
          <el-radio-button label="таблица" value="table" />
          <el-radio-button label="диаграмма" value="diagram" />
        </el-radio-group>
      </div>
    </div>
    <slot v-if="date[0] && date[1]"></slot>
  </div>
</template>

<style scoped lang="scss">
#filters-template {
  #filters-container {
    margin-bottom: 10px;
    display: grid;
    gap: 10px;

    ::v-deep(.el-date-editor) {
      max-width: 240px;
    }

    .filters-element {
      width: 305px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  #filters-template-title {
    color: var(--el-text-color-primary);
  }
}
</style>
