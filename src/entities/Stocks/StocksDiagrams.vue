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

function getWarehouseDataInWay() {
  const map = new Map<string, number>();
  props.stocks.forEach((s) => {
    const value = (Number(s.in_way_to_client) || 0) + (Number(s.in_way_from_client) || 0);
    if (value > 0) {
      map.set(s.warehouse_name, (map.get(s.warehouse_name) ?? 0) + value);
    }
  });
  return Array.from(map, ([name, value]) => ({ name, value }));
}

const quantityData = computed(() => getWarehouseData("quantity"));
const inWayData = computed(() => getWarehouseDataInWay());
const quantityFullData = computed(() => getWarehouseData("quantity_full"));
</script>

<template>
  <div class="charts-grid">
    <div class="charts">
      <VChart v-if="quantityFullData.length" class="chart" :option="pieOptions('количество продукции', quantityFullData)" autoresize />
      <VChart v-if="quantityData.length" class="chart" :option="pieOptions('на складе', quantityData)" autoresize />
      <VChart v-if="inWayData.length" class="chart" :option="pieOptions('в пути', inWayData)" autoresize />
    </div>
    <el-alert title="Статистика формируется по конкретной странице таблицы, а не всему периоду" type="warning" show-icon :closable="false" />
  </div>
</template>

<style scoped lang="scss">
.charts-grid {
  height: calc(100dvh - 168px);
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
