<script setup>
import { ref } from "vue";
import MainLayout from "@/components/layouts/main_layout.vue";

// Each entry mirrors one column of the "Process Report Flow" Excel sheet.
// `comments` (optional) holds the remark history shown in the popup table
// when the notification icon on that activity's box is clicked.
const columns = [
  { label: "SBU", value: "Pharma Common", dept: "PP" },
  { label: "Generic", value: "Lacosamide", dept: "PP" },
  { label: "Specification", value: "INN", dept: "PP" },
  { label: "Therapeutic Class", value: "Antiepileptic", dept: "PP" },
  { label: "Strength", value: "50mg", dept: "PP" },
  { label: "Dosage Form", value: "Tablet", dept: "PP" },
  { label: "Product Category", value: "New Molecule", dept: "PP" },
  { label: "Unit Forecast (Y-1)", value: "", dept: "MKT" },
  { label: "Value Forecast (Y-1)", value: "", dept: "MKT" },
  { label: "Launching Date", value: "01.04.27", dept: "MKT" },
  { label: "Generic Code", value: "NP07260001", dept: "PP" },
  { label: "Product Code", value: "NP07260001 (a)", dept: "PP" },
  { label: "PP Raised", value: "07.01.2025", dept: "PP" },
  { label: "Plant", value: "NG", dept: "PP" },
  { label: "PP Approval", value: "01.01.26", dept: "PP" },
  { label: "Duration (PP to PP Approval)", value: "34", dept: "PP" },
  {
    label: "Product Brief (PB) Sharing to R&D",
    value: "12.03.2025",
    dept: "MKT",
    comments: [
      { upload: "Internal Product Brief", date: "12.02.2025", remark: "Waiting for originator product" },
    ],
  },
  { label: "6M Forecast Sharing to R&D", value: "14.03.2025", dept: "MKT", npd: "6M Forecast" },
  {
    label: "Product Brief Approval",
    value: "12.03.2025",
    dept: "RD",
    npd: "Internal Product Brief",
    comments: [
      { upload: "Approved Product Brief", date: "10.07.2025", remark: "Need spec correction" },
    ],
  },
  { label: "Dev RM specification to SCM by R&D", value: "Date", dept: "RD" },
  {
    label: "Dev RM Received",
    value: "09.03.2025",
    dept: "SCM",
    comments: [
      { upload: "Dev RM Receive", date: "10.05.2025", remark: "SCM Couldn't manage Dev RM yet" },
      { upload: "Dev RM Receive", date: "26.05.2025", remark: "Due to high cost SCM couldn't manage Dev RM yet" },
    ],
  },
  { label: "Method Dev. & Stability Initiation", value: "25.04.2025", dept: "RD" },
  { label: "3M Stability Completion", value: "", dept: "RD" },
  { label: "Recipe Submission to RA", value: "07.08.2025", dept: "RD" },
  { label: "Duration (PP Approval to Recipe Submission)", value: "175", dept: "RD" },
  { label: "Recipe Approval", value: "25.09.2025", dept: "RA" },
  { label: "DTL shared to RA by R&D", value: "Date/NA", dept: "RD" },
  { label: "PM Spec. Shared to SMD by R&D", value: "01.10.2025", dept: "RD" },
  { label: "Tooling/ Machine/ Change parts PR to SCM by R&D/Eng", value: "Date/NA", dept: "Eng" },
  { label: "RM/PM requisition to SCM by R&D", value: "Date", dept: "RD" },
  { label: "DTL Approval", value: "Date/NA", dept: "RA" },
  { label: "Brand Name & PM Design to RA", value: "20.09.2025", dept: "MKT" },
  { label: "Duration (PM Spec Sharing to PM Design to RA)", value: "05.10.2025", dept: "MKT" },
  { label: "Price Submission to RA", value: "10.10.2025", dept: "MKT" },
  { label: "6M Stability Completion", value: "", dept: "RD" },
  { label: "Annexure Documents to RA by R&D", value: "Date", dept: "RD" },
  { label: "Tooling/ Machine/ Change parts Availability at Plant", value: "Date/NA", dept: "Eng" },
  { label: "Brand Name & PM Design Approval", value: "15.10.2025", dept: "RA", npd: "Internal Brand Name" },
  { label: "Annexure Approval", value: "10.11.2025", dept: "RA", npd: "Packaging Concurrence" },
  { label: "Inclusion Approval", value: "", dept: "RA" },
  { label: "PM Design Delivery to Vendor by SCM", value: "30.11.2025", dept: "SCM" },
  { label: "AFPC Shared to QC", value: "30.11.2025", dept: "QC", npd: "AFPC Doc" },
  { label: "Commercial RM Receival", value: "20.12.2025", dept: "SCM" },
  { label: "Commercial PM Receival", value: "15.12.2025", dept: "SCM" },
  { label: "Technology Transfer", value: "", dept: "PP" },
  { label: "Duration (Annexure Approval to Commercial PM Received)", value: "34", dept: "SCM" },
  { label: "Price Approval", value: "25.11.2025", dept: "RA", npd: "Internal Price" },
  { label: "Finished Product Released", value: "", dept: "QC" },
  { label: "MA Certificate Receival", value: "10.01.2026", dept: "RA" },
  { label: "Product Launching", value: "01.02.2026", dept: "MKT", npd: "Launching Circular" },
  { label: "Duration (PP Approval to Product Launching)", value: "68", dept: "PP" },
  { label: "PP Creator", value: "Saif Ahmed", dept: "PP" },
  {
    label: "Remarks",
    value: "Due to high cost SCM couldn't manage Dev RM yet",
    dept: "PP",
  },
];

// Column whose comment popup is currently open; null when the modal is closed.
const activeColumn = ref(null);
</script>

<template>
  <MainLayout>
    <div class="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8">
      <div class="flex flex-col gap-1 mb-6">
        <h2 class="text-base sm:text-lg font-semibold text-slate-800">Process Report Flow</h2>
        <p class="text-sm text-black">
          End-to-end sub-activity tracker from PP raise through commercial launch.
        </p>
      </div>

      <div
        class="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white"
      >
        <div
          class="grid text-xs w-max"
          :style="{ gridTemplateColumns: `12rem repeat(${columns.length}, 9rem)` }"
        >
          <!-- Header row -->
          <div
            class="sticky left-0 z-10 bg-slate-200 text-black font-semibold px-3 py-2 border border-slate-300 flex items-end"
          >
            Sub-activities
          </div>
          <div
            v-for="col in columns"
            :key="col.label + '-h'"
            class="relative bg-slate-100 text-black font-semibold px-3 py-2 border border-slate-200 break-words text-[11px] leading-tight flex items-end"
          >
            {{ col.label }}
            <button
              v-if="col.comments && col.comments.length"
              type="button"
              class="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-white shadow ring-2 ring-white hover:bg-amber-500"
              :title="`${col.comments.length} comment(s) on ${col.label}`"
              @click="activeColumn = col"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-3.5 w-3.5">
                <path
                  fill-rule="evenodd"
                  d="M2 4.5A2.5 2.5 0 0 1 4.5 2h11A2.5 2.5 0 0 1 18 4.5v7A2.5 2.5 0 0 1 15.5 14H9.06l-3.4 3.03a.75.75 0 0 1-1.25-.56V14h-.4A2.5 2.5 0 0 1 2 11.5v-7Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <!-- Responsible department row -->
          <div
            class="sticky left-0 z-10 bg-slate-50 text-black font-medium px-3 py-2 border border-slate-200 whitespace-nowrap"
          >
            Responsible Department
          </div>
          <div
            v-for="col in columns"
            :key="col.label + '-dept'"
            class="px-3 py-2 border border-slate-200 text-black text-center whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {{ col.dept }}
          </div>

          <!-- Demo data row -->
          <div
            class="sticky left-0 z-10 bg-white text-black font-semibold px-3 py-2 border border-slate-200 whitespace-nowrap"
          >
            Demo Information
          </div>
          <div
            v-for="col in columns"
            :key="col.label + '-val'"
            class="px-3 py-2 border border-slate-200 text-black text-center whitespace-nowrap overflow-hidden text-ellipsis"
            :title="col.value || undefined"
          >
            {{ col.value || "—" }}
          </div>

          <!-- NPD folder name row -->
          <div
            class="sticky left-0 z-10 bg-slate-50 text-black font-medium px-3 py-2 border border-slate-200 whitespace-nowrap"
          >
            NPD Folder Name
          </div>
          <div
            v-for="col in columns"
            :key="col.label + '-bpr'"
            class="px-3 py-2 border border-slate-200 text-black text-center whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {{ col.npd || "—" }}
          </div>
          <!-- NPD folder name row -->
          <div
            class="sticky left-0 z-10 bg-slate-50 text-black font-medium px-3 py-2 border border-slate-200 whitespace-nowrap"
          >
            Current Documentation Status
          </div>
          <div
            v-for="col in columns"
            :key="col.label + '-bpr'"
            class="px-3 py-2 border border-slate-200 text-black text-center whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {{ col.npd || "—" }}
          </div>
          <!-- NPD folder name row -->
          <div
            class="sticky left-0 z-10 bg-slate-50 text-black font-medium px-3 py-2 border border-slate-200 whitespace-nowrap"
          >
            Gantt Chart Timeline
          </div>
          <div
            v-for="col in columns"
            :key="col.label + '-bpr'"
            class="px-3 py-2 border border-slate-200 text-black text-center whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {{ col.npd || "—" }}
          </div>
        </div>
      </div>
    </div>

    <!-- Comment history modal -->
    <div
      v-if="activeColumn"
      class="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 p-4"
      @click.self="activeColumn = null"
    >
      <div class="w-full max-w-2xl rounded-xl bg-white shadow-lg border border-slate-200">
        <div class="flex items-start justify-between gap-4 px-5 py-4 border-b border-slate-200">
          <div>
            <h3 class="text-sm font-semibold text-slate-800">{{ activeColumn.label }}</h3>
          </div>
          <button
            type="button"
            class="text-slate-400 hover:text-slate-600"
            title="Close"
            @click="activeColumn = null"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
              <path
                d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z"
              />
            </svg>
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-xs">
            <thead>
              <tr class="bg-slate-100 text-slate-700">
                <th class="px-3 py-2 text-left font-semibold border border-slate-200">Department</th>
                <th class="px-3 py-2 text-left font-semibold border border-slate-200">Items</th>
                <th class="px-3 py-2 text-left font-semibold border border-slate-200">Upload</th>
                <th class="px-3 py-2 text-left font-semibold border border-slate-200">Date</th>
                <th class="px-3 py-2 text-left font-semibold border border-slate-200">Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(comment, idx) in activeColumn.comments" :key="idx">
                <td class="px-3 py-2 border border-slate-200 text-slate-800">
                  {{ idx === 0 ? activeColumn.dept : "" }}
                </td>
                <td class="px-3 py-2 border border-slate-200 text-slate-800">
                  {{ idx === 0 ? activeColumn.label : "" }}
                </td>
                <td class="px-3 py-2 border border-slate-200 text-slate-800">{{ comment.upload || "—" }}</td>
                <td class="px-3 py-2 border border-slate-200 text-slate-800">{{ comment.date || "—" }}</td>
                <td class="px-3 py-2 border border-slate-200 text-slate-800">{{ comment.remark || "—" }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </MainLayout>
</template>
