<template>
  <div class="min-h-screen bg-slate-50">
    <Header @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    <Sidebar v-model="sidebarOpen" />

    <main class="pt-16 lg:pl-64">
      <slot></slot>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Header from "./header.vue";
import Sidebar from "./sidebar.vue";

const sidebarOpen = ref(false);
</script>
