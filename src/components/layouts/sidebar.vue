<template>
  <!-- Mobile overlay -->
  <div
    v-if="modelValue"
    class="fixed inset-0 z-20 bg-slate-900/40 lg:hidden"
    @click="$emit('update:modelValue', false)"
  ></div>

  <aside
    :class="[
      'fixed top-16 bottom-0 left-0 z-20 w-64 bg-white border-r border-slate-200 transition-transform duration-200 ease-in-out lg:translate-x-0',
      modelValue ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <a-menu
      mode="inline"
      :selected-keys="[route.name]"
      class="!border-0 h-[calc(100%-1rem)] overflow-y-auto"
      @click="$emit('update:modelValue', false)"
    >

          <a-menu-item-group key="new_product_calender" title="New Product">
        <a-menu-item key="new_product_document" title="New Product Document">
          <router-link :to="{ name: 'new_product_document' }">
            <file-text-outlined />
            <span>Document Management</span>
          </router-link>
        </a-menu-item>

        <a-menu-item key="new_product_calender" title="New Product Calendar">
          <router-link :to="{ name: 'new_product_calender' }">
            <calendar-outlined />
            <span>Product Calendar</span>
          </router-link>
        </a-menu-item>
      </a-menu-item-group>
      <a-menu-item-group key="process_report" title="Process Report">
        <a-menu-item key="mkt_dashboard" title="MKT Dashboard">
          <router-link :to="{ name: 'mkt_dashboard' }">
            <shop-outlined />
            <span>MKT Dashboard</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="ra_dashboard" title="RA Dashboard">
          <router-link :to="{ name: 'ra_dashboard' }">
            <safety-certificate-outlined />
            <span>RA Dashboard</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="rd_dashboard" title="R&D Dashboard">
          <router-link :to="{ name: 'rd_dashboard' }">
            <experiment-outlined />
            <span>R&D Dashboard</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="scm_dashboard" title="SCM Dashboard">
          <router-link :to="{ name: 'scm_dashboard' }">
            <car-outlined />
            <span>SCM Dashboard</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="process_report_flow" title="Process Report Flow">
          <router-link :to="{ name: 'process_report_flow' }">
            <file-text-outlined />
            <span>Process Report Flow</span>
          </router-link>
        </a-menu-item>
      </a-menu-item-group>

      <a-menu-item-group key="gantt_report" title="Gantt Report">
        <a-menu-item key="gantt_chart" title="Gantt Chart">
          <router-link :to="{ name: 'gantt_chart' }">
            <schedule-outlined />
            <span>Gantt Chart</span>
          </router-link>
        </a-menu-item>
      </a-menu-item-group>


    </a-menu>
  </aside>
</template>

<script setup>
import { useRoute } from "vue-router";
import {
  ShopOutlined,
  SafetyCertificateOutlined,
  ExperimentOutlined,
  CarOutlined,
  FileTextOutlined,
  ScheduleOutlined,
  CalendarOutlined,
} from "@ant-design/icons-vue";

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
defineEmits(["update:modelValue"]);

const route = useRoute();
</script>
