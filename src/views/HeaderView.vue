<script setup>
import { useRouter } from 'vue-router'
</script>

<template>
  <nav>
    <div class="left-nav">
      <RouterLink class="nav-link home" to="/">Angi-Lynn Storm</RouterLink>
    </div>
    <div class="right-nav">
      <RouterLink class="nav-link" to="/about">About</RouterLink>
      <RouterLink class="nav-link" to="/upcoming">Upcoming</RouterLink>
      <RouterLink class="nav-link" to="beta">Beta Reader Program</RouterLink>
    </div>
  </nav>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

nav {
  display: flex;
  align-items: center;
  position: relative;
  height: 60px;
  padding: 10px 20px;
  background-color: #b366ff;
}

.home {
  font-size: 2rem;
  text-decoration: none;
}

.left-nav {
  display: flex;
  position: absolute;
}

.right-nav {
  display: flex;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  gap: 20px;
}
</style>
