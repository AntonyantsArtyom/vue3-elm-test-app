<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Calendar } from "@element-plus/icons-vue";
import dayjs from "dayjs";

const route = useRoute();
const router = useRouter();

const date = ref<string[] | null | undefined>(null);
const type = ref<string>("table");
defineExpose({ date, type });

defineProps<{
  noDate?: boolean;
}>();

onMounted(() => {
  const queryDate = route.query.date as string | undefined;
  const queryType = route.query.type as string | undefined;

  if (queryDate) {
    date.value = queryDate.split(",");
  }

  if (queryType) {
    type.value = queryType;
  }
});

function updateUrl() {
  router.replace({
    query: {
      ...route.query,
      date: date.value && date.value?.length ? date.value.map((d) => dayjs(new Date(d)).format("YYYY-MM-DD")).join(",") : undefined,
      type: type.value,
    },
  });
}

function onDateChange(value: string[] | null) {
  date.value = value;
  updateUrl();
}

function onTypeChange(value: string) {
  type.value = value;
  updateUrl();
}
</script>

<template>
  <div id="filters-template">
    <div id="filters-container">
      <div v-if="!noDate" class="filters-element">
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
    <slot v-if="date && date[0] && date[1]"></slot>
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
