<script setup>
import MainLayout from "@/components/layouts/main_layout.vue";

const productTitle = "Manufacturing Plan of Ceftazidime+ Avibactam";
const launchingDate = "24.04.2027";

// Months shown along the timeline: Jan'26 -> Apr'27
const monthDefs = [
  "January'26", "February'26", "March'26", "April'26",
  "May'26", "June'26", "July'26", "August'26",
  "September'26", "October'26", "November'26", "December'26",
  "January'27", "February'27", "March'27", "April'27",
];
const WEEKS_PER_MONTH = 4;
const months = monthDefs.map((label, index) => ({ label, index }));
const totalWeeks = months.length * WEEKS_PER_MONTH;
const weekCols = Array.from({ length: totalWeeks }, (_, i) => i);

// Helper: convert a (monthIndex, weekNumber 1-4) pair into a flat week index
function w(monthIndex, weekNumber) {
  return monthIndex * WEEKS_PER_MONTH + (weekNumber - 1);
}

const COLOR = {
  standard: "bg-emerald-400",
  deviated: "bg-orange-300",
};

const rows = [
  {
    item: "Product Proposal Approval",
    responsibility: "COO sir",
    status: "Done",
    daysRequired: "01.01.2026",
    segments: [],
  },
  {
    item: "Approved Dev RM Received",
    responsibility: "R&D",
    status: "Mid March",
    daysRequired: "80",
    segments: [{ start: w(0, 1), end: w(2, 2), color: COLOR.standard }],
  },
  {
    item: "Stability Initiation",
    responsibility: "R&D",
    status: "Mid June",
    daysRequired: "90",
    segments: [{ start: w(3, 1), end: w(5, 2), color: COLOR.standard }],
  },
  {
    item: "03M Stability Completion",
    responsibility: "R&D",
    status: "Mid Sep'26",
    daysRequired: "90",
    segments: [
      { start: w(5, 4), end: w(5, 4), color: COLOR.standard },
      { start: w(6, 1), end: w(8, 3), color: COLOR.deviated },
    ],
  },
  {
    item: "06M Stability Completion",
    responsibility: "R&D",
    status: "Mid Decr'26",
    daysRequired: "90",
    segments: [
      { start: w(6, 1), end: w(6, 1), color: COLOR.standard },
      { start: w(6, 2), end: w(11, 2), color: COLOR.deviated },
    ],
  },
  {
    item: "Annexure & Price Approval",
    responsibility: "RA",
    status: "Mid Mar'27",
    daysRequired: "90",
    segments: [{ start: w(12, 1), end: w(14, 2), color: COLOR.deviated }],
  },
  {
    item: "Finished Product release",
    responsibility: "QA",
    status: "Mid Apr'27",
    daysRequired: "22",
    segments: [{ start: w(14, 4), end: w(15, 1), color: COLOR.deviated }],
  },
  {
    item: "Product Launching",
    responsibility: "SMD",
    status: "End Apr'27",
    daysRequired: "15",
    segments: [{ start: w(15, 4), end: w(15, 4), color: COLOR.deviated }],
  },
];

function cellColor(row, weekIndex) {
  const segment = row.segments.find(
    (s) => weekIndex >= s.start && weekIndex <= s.end
  );
  return segment ? segment.color : "";
}
</script>

<template>
  <MainLayout>
    <div class="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8">
      <!-- Header: subtitle, title banner, legend -->
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
        <!-- <div class="text-sm font-bold text-slate-800">
          {{ productTitle }}
        </div> -->

        <div
          class="self-start bg-blue-400 text-white font-bold text-lg px-6 sm:px-10 py-1 rounded-md shadow-sm"
        >
          Timeline
        </div>

        <table class="text-xs border-collapse shrink-0 self-start sm:self-auto">
          <thead>
            <tr>
              <th
                colspan="2"
                class="border border-slate-400 bg-slate-100 px-2 py-1 font-semibold"
              >
                Launching Timeline
              </th>
            </tr>
            <tr>
              <th class="border border-slate-400 bg-sky-200 px-3 py-1 font-medium">
                Standard Timeline
              </th>
              <th class="border border-slate-400 bg-orange-300 px-3 py-1 font-medium">
                Deviated Timeline
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="1" class="border border-slate-400 text-center py-1">
                {{ launchingDate }}
              </td>
              <td colspan="1" class="border border-slate-400 text-center py-1">
                {{ launchingDate }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Gantt grid -->
      <div class="overflow-x-auto rounded-lg border border-slate-300 bg-white shadow-sm">
        <table class="border-collapse text-[10px] min-w-max">
          <thead>
            <tr>
              <th rowspan="2" class="sticky left-0 z-10 bg-slate-100 border border-slate-300 px-3 py-2 text-xs font-semibold min-w-[190px] text-left">
                Item
              </th>
              <th rowspan="2" class="border border-slate-300 bg-slate-100 px-2 py-2 text-xs font-semibold min-w-[90px]">
                Responsibility
              </th>
              <th rowspan="2" class="border border-slate-300 bg-slate-100 px-2 py-2 text-xs font-semibold min-w-[80px]">
                Status
              </th>
              <th rowspan="2" class="border border-slate-300 bg-slate-100 px-2 py-2 text-xs font-semibold min-w-[80px]">
                Days Required
              </th>
              <th
                v-for="month in months"
                :key="month.label"
                :colspan="WEEKS_PER_MONTH"
                class="border border-slate-300 bg-slate-100 px-2 py-1 text-xs font-semibold whitespace-nowrap"
              >
                {{ month.label }}
              </th>
            </tr>
            <tr>
              <template v-for="month in months" :key="'weeks-' + month.label">
                <th
                  v-for="n in WEEKS_PER_MONTH"
                  :key="month.label + '-w' + n"
                  class="border border-slate-200 bg-slate-50 px-1 py-1 font-medium text-black w-[16px]"
                >
                  W-{{ n }}
                </th>
              </template>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in rows" :key="row.item" class="odd:bg-white even:bg-slate-50/60">
              <td class="sticky left-0 z-10 bg-inherit border border-slate-300 px-3 py-2 text-left text-xs text-black whitespace-nowrap">
                {{ row.item }}
              </td>
              <td class="border border-slate-300 px-2 py-2 text-center text-xs text-black">
                {{ row.responsibility }}
              </td>
              <td class="border border-slate-300 px-2 py-2 text-center text-xs text-black">
                {{ row.status }}
              </td>
              <td class="border border-slate-300 px-2 py-2 text-center text-xs text-black">
                {{ row.daysRequired }}
              </td>
              <td
                v-for="weekIndex in weekCols"
                :key="weekIndex"
                :class="['border border-slate-200 w-[16px] h-[26px] p-0', cellColor(row, weekIndex)]"
              ></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </MainLayout>
</template>
