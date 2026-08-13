<template>
  <header
    class="fixed top-0 inset-x-0 z-30 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6"
  >
    <div class="flex items-center gap-3">
      <button
        type="button"
        class="lg:hidden h-9 w-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
        @click="$emit('toggle-sidebar')"
      >
        <MenuOutlined class="text-lg" />
      </button>

      <RouterLink to="/" class="flex items-center gap-2">
        <div
          class="h-9 w-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold"
        >
          N
        </div>
        <span class="hidden sm:block text-lg font-semibold text-slate-800"
          >NPM Module</span
        >
      </RouterLink>
    </div>

    <div class="flex items-center gap-3 sm:gap-4">
      <button
        type="button"
        class="h-9 w-9 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
      >
        <BellOutlined class="text-lg" />
      </button>
      <div class="flex items-center gap-2">
        <div
          class="h-8 w-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-semibold"
        >
          <UserOutlined />
        </div>
        <span class="hidden sm:block text-sm font-medium text-slate-700"
          >User</span
        >
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { MenuOutlined, BellOutlined, UserOutlined } from "@ant-design/icons-vue";
import { menuList } from "./menu.js";

defineEmits(["toggle-sidebar"]);

const route = useRoute();

const pageTitle = computed(() => {
  const current = menuList.find((item) => item.name === route.name);
  return current ? current.label : "Process Report";
});
</script>
