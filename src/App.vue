<script setup>
import { RouterView } from 'vue-router'
import HeaderView from './views/HeaderView.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <HeaderView />
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
</style>
