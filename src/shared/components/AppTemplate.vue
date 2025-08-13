<script setup lang="ts">
import type { TabsPaneContext } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import { ref, watch } from "vue";

const router = useRouter();
const route = useRoute();

const activeTab = ref(String(route.name || ""));

watch(
  () => route.name,
  (newName) => {
    activeTab.value = String(newName || "");
  }
);

const handleClick = (tab: TabsPaneContext) => {
  router.push({ name: String(tab.paneName || "") });
};
</script>

<template>
  <div id="app-template">
    <el-tabs v-model="activeTab" class="app-tabs" @tab-click="handleClick">
      <el-tab-pane label="Доходы" name="incomes" />
      <el-tab-pane label="Заказы" name="orders" />
      <el-tab-pane label="Продажи" name="sales" />
      <el-tab-pane label="Склады" name="stocks" />
    </el-tabs>
    <slot></slot>
  </div>
</template>

<style scoped>
#app-template {
  padding: 10px 15px;
}
</style>
