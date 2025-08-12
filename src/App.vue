<script setup lang="ts">
import AppTemplate from "@/shared/AppTemplate.vue";
</script>

<template>
  <AppTemplate>
    <router-view />
    <el-button>Default</el-button>
  </AppTemplate>
</template>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
</style>
