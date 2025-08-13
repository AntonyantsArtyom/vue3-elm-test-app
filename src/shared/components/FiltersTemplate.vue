<script setup lang="ts">
import { ref, defineEmits, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Calendar } from "@element-plus/icons-vue";

const props = defineProps<{
  date?: string[];
  type: string;
}>();

const emit = defineEmits<{
  (e: "update:date", value: string[]): void;
  (e: "update:type", value: string): void;
}>();

const route = useRoute();
const router = useRouter();

const date = ref(props.date ?? ["", ""]);
const type = ref(props.type);

onMounted(() => {
  const queryDate = route.query.date as string | undefined;
  const queryType = route.query.type as string | undefined;

  if (queryDate) {
    date.value = queryDate.split(",");
    emit("update:date", date.value);
  }

  if (queryType) {
    type.value = queryType;
    emit("update:type", type.value);
  }
});

watch(
  () => props.date,
  (propsTime) => (date.value = propsTime ?? ["", ""])
);

watch(
  () => props.type,
  (propsType) => (type.value = propsType)
);

function updateUrl() {
  router.replace({
    query: {
      ...route.query,
      date: date.value.map((d) => new Date(d).toISOString().split("T")[0]).join(","),
      type: type.value,
    },
  });
}

function onDateChange(value: string[]) {
  date.value = value.length ? value : ["", ""];
  emit("update:date", value.length ? value.map((d) => new Date(d).toISOString().split("T")[0]) : ["", ""]);
  updateUrl();
}

function onTypeChange(value: string) {
  type.value = value;
  emit("update:type", value);
  updateUrl();
}
</script>

<template>
  <div id="filters-template">
    <div id="filters-container">
      <div v-if="props.date" class="filters-element">
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
    <slot v-if="!props.date || (date[0] && date[1])"></slot>
    <div v-else class="filters-message">
      <Calendar class="filters-message-icon" />
      <h4 class="filters-message-title">установите временной период для отображения данных</h4>
    </div>
  </div>
</template>

<style scoped lang="scss">
#filters-template {
  .filters-message {
    width: 305px;
    color: var(--el-text-color-secondary);
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .filters-message-title {
      width: 225px;
      margin: 0px;
      margin-top: 10px;
      font-size: 16px;
    }

    .filters-message-icon {
      width: 100px;
      height: 100px;
    }
  }

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
