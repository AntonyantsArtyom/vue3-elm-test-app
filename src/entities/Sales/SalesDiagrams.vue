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
</script>

<template>
  <div class="charts-grid">
    <span class="charts-title">Сумма продаж по складам</span>
    <el-scrollbar>
      <div class="charts">
        <VChart v-if="salesSumByWarehouse.length" class="chart" :option="pieOptions(salesSumByWarehouse)" autoresize />
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
    display: flex;
    justify-content: center;
    padding-bottom: 20px;

    .chart {
      width: 500px;
      height: 300px;
    }
  }

  .el-alert {
    margin-top: auto;
  }
}
</style>
