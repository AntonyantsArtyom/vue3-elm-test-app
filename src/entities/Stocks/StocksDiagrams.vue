<script setup lang="ts">
import type { TStock } from "@/entities/Stocks/Stock.types";
import { computed } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import { TitleComponent, TooltipComponent, LegendComponent } from "echarts/components";
import { pieOptions } from "@/shared/utils/pieOptions";
import VChart from "vue-echarts";

use([CanvasRenderer, PieChart, TitleComponent, TooltipComponent, LegendComponent]);

const props = defineProps<{
  stocks: TStock[];
}>();

function getWarehouseData(field: keyof TStock) {
  const map = new Map<string, number>();
  props.stocks.forEach((s) => {
    const value = Number(s[field]) || 0;
    if (value > 0) {
      map.set(s.warehouse_name, (map.get(s.warehouse_name) ?? 0) + value);
    }
  });
  return Array.from(map, ([name, value]) => ({ name, value }));
}

const quantityFullData = computed(() => getWarehouseData("quantity_full"));
</script>

<template>
  <div class="charts-grid">
    <span class="charts-title">Полное количество продукции на складах</span>
    <el-scrollbar>
      <div class="charts">
        <VChart v-if="quantityFullData.length" class="chart" :option="pieOptions(quantityFullData)" autoresize />
      </div>
    </el-scrollbar>
    <el-alert title="Статистика формируется по конкретной странице таблицы, а не всему периоду" type="warning" show-icon :closable="false" />
  </div>
</template>

<style scoped lang="scss">
.charts-grid {
  height: calc(100dvh - 168px);
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
