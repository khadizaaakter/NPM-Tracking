import { createRouter, createWebHistory } from "vue-router";

import Login from "@/views/Login.vue";
import Mkt_dashboard from "@/views/process report/mkt_dashboard.vue";
import Ra_dashboard from "@/views/process report/ra_dashboard.vue";
import Scm_dashboard from "@/views/process report/scm_dashboard.vue";
import Rd_dashboard from "@/views/process report/rd_dashboard.vue";
import Process_report_flow from "@/views/process report/process_report_flow.vue";
import Gantt_chart from "@/views/Gantt Report/gantt_chart.vue";
import New_product_calender from "@/views/New product calender/new_product_calender.vue";
import New_product_document from "@/views/New product calender/new_product_document.vue";
import New_product_document_files from "@/views/New product calender/new_product_document_files.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },

  {
    path: "/mkt_dashboard",
    name: "mkt_dashboard",
    component: Mkt_dashboard,
  },
  {
    path: "/ra_dashboard",
    name: "ra_dashboard",
    component: Ra_dashboard,
  },
  {
    path: "/rd_dashboard",
    name: "rd_dashboard",
    component: Rd_dashboard,
  },
  {
    path: "/scm_dashboard",
    name: "scm_dashboard",
    component: Scm_dashboard,
  },
  {
    path: "/process_report_flow",
    name: "process_report_flow",
    component: Process_report_flow,
  },
  {
    path: "/gantt_chart",
    name: "gantt_chart",
    component: Gantt_chart,
  },
  {
    path: "/new_product_calender",
    name: "new_product_calender",
    component: New_product_calender,
  },
  {
    path: "/new_product_document",
    name: "new_product_document",
    component: New_product_document,
  },
  {
    path: "/new_product_document/:slug",
    name: "new_product_document_files",
    component: New_product_document_files,
  },

  {
    path: "/:catchAll(.*)",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
