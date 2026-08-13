<script setup>
import { ref, computed } from "vue";
import MainLayout from "@/components/layouts/main_layout.vue";

const cards = [{ label: "PM Design Delivery to Vendor", count: 4 }];

const selectedIndex = ref(0);
const selectedCard = computed(() => cards[selectedIndex.value] ?? cards[0]);

function cardClasses(card, index) {
  const isPending = card.count > 0;
  const isSelected = index === selectedIndex.value;
  return [
    "group flex flex-col items-center justify-center rounded-lg border px-2 py-2.5 text-center shadow-sm transition-all duration-150 cursor-pointer select-none hover:-translate-y-0.5 hover:shadow-md",
    isPending
      ? "bg-gradient-to-br from-orange-100 to-orange-200/70 border-orange-200/80 text-orange-900"
      : "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200/80 text-emerald-800",
    isSelected
      ? isPending
        ? "ring-2 ring-orange-400 ring-offset-2 ring-offset-slate-50"
        : "ring-2 ring-emerald-400 ring-offset-2 ring-offset-slate-50"
      : "",
  ];
}

const sampleRows = [
  {
    slNo: 1,
    genericCode: "NP06260018",
    productCode: "NP06260018 (a)",
    genericName: "Sitagliflozin",
    strength: "150mg",
    dosageForm: "Tab",
    launching: "01.04.2027",
  },
  {
    slNo: 2,
    genericCode: "NP06260015",
    productCode: "NP06260015 (a)",
    genericName: "Aceclofenac",
    strength: "200mg",
    dosageForm: "Tab",
    launching: "01.12.2026",
  },
  {
    slNo: 3,
    genericCode: "NP06260014",
    productCode: "NP06260014 (a)",
    genericName: "Ceftazidime+Avibactam",
    strength: "1.25g",
    dosageForm: "Inj",
    launching: "01.04.2027",
  },
  {
    slNo: 4,
    genericCode: "NP06260014",
    productCode: "NP06260014 (b)",
    genericName: "Ceftazidime+Avibactam",
    strength: "2.5g",
    dosageForm: "Inj",
    launching: "01.02.2027",
  },
];
</script>

<template>
  <MainLayout>
    <div class="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8">
      <div class="flex flex-col lg:flex-row lg:items-start gap-8">
        <!-- Department badge -->


        <!-- Workflow status cards -->
        <div
          class="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2"
        >
          <div
            v-for="(card, index) in cards"
            :key="card.label"
            :class="cardClasses(card, index)"
            @click="selectedIndex = index"
          >
            <span class="text-lg sm:text-xl font-extrabold leading-none">{{
              card.count
            }}</span>
            <span class="mt-1 text-[10px] sm:text-xs font-semibold leading-snug">{{
              card.label
            }}</span>
          </div>
        </div>
      </div>

      <!-- Detail table for the selected workflow -->
      <div
        class="mt-8 overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white"
      >
        <table class="min-w-full text-sm border-collapse">
          <thead>
            <tr>
              <th
                colspan="7"
                class="bg-orange-100 text-orange-900 font-semibold text-sm px-4 py-3 text-center border border-orange-200"
              >
                {{ selectedCard?.label }}
              </th>
              <th
                colspan="2"
                class="bg-orange-100 border border-orange-200"
              ></th>
            </tr>
            <tr class="bg-emerald-50 text-slate-700">
              <th class="px-3 py-2 font-semibold border border-slate-200">
                Sl. No.
              </th>
              <th class="px-3 py-2 font-semibold border border-slate-200">
                Generic Code
              </th>
              <th class="px-3 py-2 font-semibold border border-slate-200">
                Product Code
              </th>
              <th class="px-3 py-2 font-semibold border border-slate-200">
                Generic Name
              </th>
              <th class="px-3 py-2 font-semibold border border-slate-200">
                Strength
              </th>
              <th class="px-3 py-2 font-semibold border border-slate-200">
                Dosage Form
              </th>
              <th class="px-3 py-2 font-semibold border border-slate-200">
                Launching
              </th>
              <th class="px-3 py-2 font-semibold border border-slate-200">
                Action
              </th>
              <th class="px-3 py-2 font-semibold border border-slate-200">
                Comment
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in sampleRows"
              :key="row.slNo"
              class="odd:bg-white even:bg-slate-50/60 hover:bg-orange-50/50 transition-colors"
            >
              <td class="px-3 py-3 border border-slate-200 text-slate-600">
                {{ row.slNo }}
              </td>
              <td class="px-3 py-3 border border-slate-200 text-slate-700">
                {{ row.genericCode }}
              </td>
              <td class="px-3 py-3 border border-slate-200 text-slate-700">
                {{ row.productCode }}
              </td>
              <td class="px-3 py-3 border border-slate-200 text-slate-700">
                {{ row.genericName }}
              </td>
              <td class="px-3 py-3 border border-slate-200 text-slate-700">
                {{ row.strength }}
              </td>
              <td class="px-3 py-3 border border-slate-200 text-slate-700">
                {{ row.dosageForm }}
              </td>
              <td class="px-3 py-3 border border-slate-200 text-slate-700">
                {{ row.launching }}
              </td>
              <td class="px-3 py-3 border border-slate-200">
                <div class="flex items-center gap-3">
                  <label
                    class="flex items-center gap-1 text-xs font-medium text-slate-600 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      class="h-3.5 w-3.5 rounded-sm border-2 border-rose-400 text-rose-500 focus:ring-rose-400"
                    />
                    Yes
                  </label>
                  <label
                    class="flex items-center gap-1 text-xs font-medium text-slate-600 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      class="h-3.5 w-3.5 rounded-sm border-2 border-rose-400 text-rose-500 focus:ring-rose-400"
                    />
                    Pending
                  </label>
                </div>
                <button
                  type="button"
                  class="mt-2 text-xs font-medium text-rose-600 border border-rose-300 rounded-md px-3 py-1 hover:bg-rose-50 transition-colors"
                >
                  Upload
                </button>
              </td>
              <td class="px-3 py-3 border border-slate-200 text-slate-400">
                <input
                  type="text"
                  placeholder="Add comment"
                  class="w-full text-xs text-slate-600 placeholder:text-slate-300 border-0 focus:outline-none focus:ring-0 bg-transparent"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </MainLayout>
</template>
