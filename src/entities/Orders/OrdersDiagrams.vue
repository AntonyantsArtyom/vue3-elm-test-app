<script setup lang="ts">
import type { TOrder } from "@/entities/Orders/Order.types";
import { computed } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from "echarts/components";
import VChart from "vue-echarts";

use([CanvasRenderer, LineChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent]);

const props = defineProps<{
  orders: TOrder[];
}>();

function generateHourRange(start: Date, end: Date) {
  const hours: string[] = [];
  const current = new Date(start);
  while (current <= end) {
    hours.push(
      `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}-${String(current.getDate()).padStart(2, "0")} ${String(
        current.getHours()
      ).padStart(2, "0")}:00`
    );
    current.setHours(current.getHours() + 1);
  }
  return hours;
}

const ordersByHour = computed(() => {
  if (!props.orders.length) return [];

  const counts = new Map<string, number>();
  let minDate = new Date(props.orders[0].date);
  let maxDate = new Date(props.orders[0].date);

  props.orders.forEach((o) => {
    if (!o.date) return;
    const d = new Date(o.date);
    const hourKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(
      2,
      "0"
    )}:00`;
    counts.set(hourKey, (counts.get(hourKey) ?? 0) + 1);

    if (d < minDate) minDate = d;
    if (d > maxDate) maxDate = d;
  });

  const fullRange = generateHourRange(minDate, maxDate);

  return fullRange.map((hourKey) => ({
    hour: hourKey,
    count: counts.get(hourKey) ?? 0,
  }));
});

const chartOptions = computed(() => ({
  tooltip: { trigger: "axis" },
  grid: { left: "3%", right: "3%", bottom: "3%", containLabel: true },
  xAxis: {
    type: "category",
    data: ordersByHour.value.map((item) => item.hour),
    axisLabel: { rotate: 45 },
  },
  yAxis: { type: "value", min: 0 },
  series: [
    {
      data: ordersByHour.value.map((item) => item.count),
      type: "line",
      smooth: true,
      itemStyle: { color: "#409EFF" },
    },
  ],
}));
</script>

<template>
  <div class="charts-grid">
    <span class="charts-title">Количество записей по складам</span>
    <el-scrollbar>
      <VChart v-if="ordersByHour.length" class="chart" :option="chartOptions" autoresize />
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

  .el-alert {
    margin-top: auto;
  }

  .chart {
    width: 100%;
    height: 100%;
    min-width: 900px;
    min-height: 400px;
  }
}
</style>
