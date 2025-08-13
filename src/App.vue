<script setup lang="ts">
import AppTemplate from "@/shared/components/AppTemplate.vue";
</script>

<template>
  <AppTemplate>
    <router-view />
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
