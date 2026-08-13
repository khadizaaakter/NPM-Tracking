<script setup>
import MainLayout from "@/components/layouts/main_layout.vue";

// Each entry mirrors one column of the "Process Report Flow" Excel sheet.
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
  { label: "Product Brief (PB) Sharing to R&D", value: "12.03.2025", dept: "MKT" },
  { label: "6M Forecast Sharing to R&D", value: "14.03.2025", dept: "MKT", npd: "6M Forecast" },
  { label: "Product Brief Approval", value: "12.03.2025", dept: "RD", npd: "Internal Product Brief" },
  { label: "Dev RM specification to SCM by R&D", value: "Date", dept: "RD" },
  { label: "Dev RM Received", value: "09.03.2025", dept: "SCM" },
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

</script>

<template>
  <MainLayout>
    <div class="min-h-screen bg-slate-50 p-6 md:p-8">
      <div class="flex flex-col gap-1 mb-6">
        <h2 class="text-lg font-semibold text-slate-800">Process Report Flow</h2>
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
            class="sticky left-0 z-20 bg-slate-200 text-black font-semibold px-3 py-2 border border-slate-300 flex items-end"
          >
            Sub-activities
          </div>
          <div
            v-for="col in columns"
            :key="col.label + '-h'"
            class="bg-slate-100 text-black font-semibold px-3 py-2 border border-slate-200 break-words text-[11px] leading-tight flex items-end"
          >
            {{ col.label }}
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
  </MainLayout>
</template>
