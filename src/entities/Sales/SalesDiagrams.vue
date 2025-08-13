<script setup lang="ts">
import type { TSale } from "@/entities/Sales/Sale.types";
import { computed } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import { TitleComponent, TooltipComponent, LegendComponent } from "echarts/components";
import { pieOptions } from "@/shared/utils/pieOptions";
import VChart from "vue-echarts";

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent]);

const props = defineProps<{
  sales: TSale[];
}>();

const salesCountByWarehouse = computed(() => {
  const map = new Map<string, number>();
  props.sales.forEach((s) => {
    const name = s.warehouse_name || "Не указано";
    map.set(name, (map.get(name) ?? 0) + 1);
  });
  return Array.from(map, ([name, value]) => ({ name, value }));
});

const salesSumByWarehouse = computed(() => {
  const map = new Map<string, number>();
  props.sales.forEach((s) => {
    const name = s.warehouse_name || "Не указано";
    const price = Number(s.finished_price) || 0;
    if (price > 0) {
      map.set(name, (map.get(name) ?? 0) + price);
    }
  });
  return Array.from(map, ([name, value]) => ({ name, value }));
});

const salesSumByCountry = computed(() => {
  const map = new Map<string, number>();
  props.sales.forEach((s) => {
    const name = s.country_name || "Не указано";
    const price = Number(s.finished_price) || 0;
    if (price > 0) {
      map.set(name, (map.get(name) ?? 0) + price);
    }
  });
  return Array.from(map, ([name, value]) => ({ name, value }));
});
</script>

<template>
  <div class="charts-grid">
    <div class="charts">
      <VChart v-if="salesCountByWarehouse.length" class="chart" :option="pieOptions('кол-во продаж по складам', salesCountByWarehouse)" autoresize />
      <VChart v-if="salesSumByWarehouse.length" class="chart" :option="pieOptions('сумма продаж по складам', salesSumByWarehouse)" autoresize />
      <VChart v-if="salesSumByCountry.length" class="chart" :option="pieOptions('сумма продаж по странам', salesSumByCountry)" autoresize />
    </div>
    <el-alert title="Статистика формируется по конкретной странице таблицы, а не всему периоду" type="warning" show-icon :closable="false" />
  </div>
</template>

<style scoped lang="scss">
.charts-grid {
  height: calc(100dvh - 210px);
  display: flex;
  flex-direction: column;

  .charts {
    flex: 1;
    display: flex;
    gap: 10px;

    .chart {
      flex-shrink: 0;
      width: 300px;
      height: 350px;
    }
  }

  .el-alert {
    margin-top: auto;
  }
}
</style>
