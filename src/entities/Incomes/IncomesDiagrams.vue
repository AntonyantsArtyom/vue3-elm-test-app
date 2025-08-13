<script setup lang="ts">
import type { TIncome } from "@/entities/Incomes/Income.types";
import { computed } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from "echarts/components";
import VChart from "vue-echarts";

use([CanvasRenderer, BarChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent]);

const props = defineProps<{
  incomes: TIncome[];
}>();

const barOptions = (data: { name: string; value: number }[]) => ({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  xAxis: {
    type: "category",
    data: data.map((item) => item.name),
    axisLabel: {
      rotate: 0,
      interval: 0,
      align: "center",
      verticalAlign: "center",
      margin: 20,
    },
  },
  yAxis: {
    type: "value",
    name: "Количество записей",
  },
  series: [
    {
      name: "Количество",
      type: "bar",
      data: data.map((item) => item.value),
      itemStyle: {
        color: "#409EFF",
      },
      barWidth: "60%",
    },
  ],
  grid: {
    bottom: "20%",
  },
});

const incomesByWarehouse = computed(() => {
  const map = new Map<string, number>();
  props.incomes.forEach((income) => {
    const name = income.warehouse_name || "Не указано";
    map.set(name, (map.get(name) ?? 0) + 1);
  });
  return Array.from(map, ([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
});
</script>

<template>
  <div class="charts-grid">
    <span class="charts-title">Количество записей по складам</span>
    <el-scrollbar>
      <div class="charts">
        <VChart v-if="incomesByWarehouse.length" class="chart" :option="barOptions(incomesByWarehouse)" autoresize />
      </div>
    </el-scrollbar>
    <el-alert title="Статистика формируется по конкретной странице таблицы, а не всему периоду" type="warning" show-icon :closable="false" />
  </div>
</template>

<style scoped lang="scss">
.charts-grid {
  height: calc(100dvh - 210px);
  display: flex;
  flex-direction: column;

  .charts-title {
    margin: 0;
    margin-top: 10px;
    text-align: center;
    font-size: 18px;
    color: var(--el-text-color-primary);
  }

  .charts {
    .chart {
      width: 100%;
      height: 100%;
      min-width: 900px;
      min-height: 400px;
    }
  }

  .el-alert {
    margin-top: auto;
  }
}
</style>
