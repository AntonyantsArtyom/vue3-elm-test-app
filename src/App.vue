<script setup lang="ts">
import AppTemplate from "@/shared/components/AppTemplate.vue";
</script>

<template>
  <AppTemplate>
    <router-view />
  </AppTemplate>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap");

* {
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
body {
  margin: 0;
}
</style>
