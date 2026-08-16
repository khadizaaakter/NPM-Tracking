<script setup>
import MainLayout from "@/components/layouts/main_layout.vue";

const months = [
  "Nov-25", "Dec-25", "Jan-26", "Feb-26", "Mar-26",
  "Apr-26", "May-26", "Jun-26", "Jul-26", "Aug-26", "Sep-26",
];

const stats = {
  ng: [2, 6, 8, 2, 3, 3, 3, 3, 4, 5, 4],
  ahl: [1, 5, 3, 0, 6, 1, 0, 3, 5, 5, 1],
  total: [3, 11, 11, 2, 9, 4, 3, 6, 9, 10, 5],
};

const COLOR = {
  plain: "text-slate-800",
  pink: "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200",
  red: "bg-red-500 text-white font-semibold shadow-sm",
  green: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
};

// One entry per month column (Nov-25 -> Sep-26), top to bottom as they appear on the sheet
const columns = [
  {
    items: [
      { text: "Rivastigmine\n1.5mg, 3mg & 4.5mg Cap\n(Priority: A)\nSifted from Apr,25", color: COLOR.plain },
    ],
  },
  {
    items: [
      { text: "Sotagliflorin\n200mg tab\n(Shifted from May/25)", color: COLOR.plain },
      { text: "Bilastine\n20mg Tab\n12.5mg/5ml OS\n(Priority: A+)\nSifted from May/25", color: COLOR.plain },
      { text: "Gefapixant\n45mg Tab", color: COLOR.plain },
    ],
  },
  {
    items: [
      { text: "Vortioxetine\n5mg & 10mg Tab\n(Shifted from May, 25)", color: COLOR.plain },
      { text: "Bexagliflorin\n20mg Tab\n(DCC 254)\n(Sifted from Jul,25)", color: COLOR.pink },
      { text: "Lacosamide\n50mg & 100mg Tab\n(Shifted from Dec, 25)", color: COLOR.plain },
      { text: "Ranolazine\n500mg & 750mg ER Tab\n(Priority: B)\nSifted from Mar,25", color: COLOR.plain },
      { text: "Cefazidime + Avibactam\n2g+0.5g D.P Inj.\n(Shifted from Dec,25)", color: COLOR.plain },
    ],
  },
  {
    items: [
      { text: "Tolvaptan\n15mg Tab\n(Sifted from Aug,25)", color: COLOR.plain },
    ],
  },
  {
    items: [
      { text: "Clobetasol Propionate+Salicylic Acid\n0.05%+3% Oint.", color: COLOR.plain },
      { text: "Sitafloxacin\n50mg & 100mg Tab.\n(100mg DCC dependent)", color: COLOR.pink },
    ],
  },
  {
    items: [
      { text: "Lornoxicam\n4mg & 8mg Tab.", color: COLOR.plain },
      { text: "Ketoconazole\n2% Shampoo", color: COLOR.plain },
      { text: "Vibegron\n75mg Tab\n(Shifted from May/25)\nAdd due to high cost of API\n(DCC 202)", color: COLOR.red },
    ],
  },
  {
    items: [
      { text: "Luliconazole\n1% Cream", color: COLOR.plain },
      { text: "Ciprofibrate\n100mg Tab.", color: COLOR.plain },
    ],
  },
  {
    items: [
      { text: "Acotiamide\n100mg Tab.\nTSC 255 rejected", color: COLOR.pink },
      { text: "Itraconazole\n65mg & 100mg Cap.", color: COLOR.plain },
      { text: "Itraconazole + Terbinafine\n200mg+250mg Tab.", color: COLOR.plain },
    ],
  },
  {
    items: [
      { text: "Sizetrigine\n50mg Tab.\nDepends on DCC (Recipe TBS)", color: COLOR.pink },
      { text: "Azelastine + Fluticasone\n154+27.5mcg/Spray N.Spray\nDepends on DCC (TSC 2, N.count)", color: COLOR.green },
    ],
  },
  {
    items: [
      { text: "Erdosteine\n300mg Cap. & 175mg/5ml Sus.\n(Shifted from Jun,25)", color: COLOR.pink },
      { text: "Saroglitazar Magnesium\n2mg Tab.\n(Shifted from Jun,25)", color: COLOR.pink },
      { text: "Biapenem\n300mg D.P Inj.\nDepends on DCC (TSC 2)", color: COLOR.plain },
    ],
  },
  {
    items: [
      { text: "Acoramidis\n350mg Tab.\nDepends on DCC (Recipe TBS)", color: COLOR.pink },
      { text: "Ensifentrine\n3mg/2.5ml Inh.Sus.\nDepends on DCC-TSC 2 (Recipe TBS)", color: COLOR.pink },
    ],
  },
];

// +1 keeps a trailing blank row, matching the sheet's spare row at the bottom
const maxRows = Math.max(...columns.map((c) => c.items.length)) + 1;
const rowIndexes = Array.from({ length: maxRows }, (_, i) => i);

function cellLines(colIndex, rowIndex) {
  const item = columns[colIndex].items[rowIndex];
  return item ? item.text.split("\n") : null;
}

function cellColor(colIndex, rowIndex) {
  const item = columns[colIndex].items[rowIndex];
  return item ? item.color : "";
}
</script>

<template>
  <MainLayout>
    <div class="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8 font-sans">
      <h1 class="text-lg sm:text-xl font-bold text-slate-800 mb-4 tracking-tight">
        New Product (New Molecule+Line Extension) Calendar
      </h1>

      <div class="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-md">
        <table class="border-separate border-spacing-0 text-[12.5px] leading-snug w-full table-fixed">
          <colgroup>
            <col class="w-[70px]" />
            <col v-for="m in months" :key="'col-' + m" class="w-[100px]" />
          </colgroup>

          <tbody>
            <!-- Summary rows -->
            <tr class="bg-slate-50">
              <td class="border-b border-r border-slate-200 px-2 py-1.5 font-semibold text-slate-600">NCI</td>
              <td
                v-for="(v, i) in stats.ng"
                :key="'ng-' + i"
                class="border-b border-r border-slate-200 px-2 py-1.5 text-center text-slate-700 last:border-r-0"
              >
                {{ v }}
              </td>
            </tr>
            <tr class="bg-slate-50">
              <td class="border-b border-r border-slate-200 px-2 py-1.5 font-semibold text-slate-600">AHL</td>
              <td
                v-for="(v, i) in stats.ahl"
                :key="'ahl-' + i"
                class="border-b border-r border-slate-200 px-2 py-1.5 text-center text-slate-700 last:border-r-0"
              >
                {{ v }}
              </td>
            </tr>
            <tr class="bg-slate-100">
              <td class="border-b border-r border-slate-200 px-2 py-1.5 font-semibold text-slate-700">Total</td>
              <td
                v-for="(v, i) in stats.total"
                :key="'total-' + i"
                class="border-b border-r border-slate-200 px-2 py-1.5 text-center font-semibold text-slate-800 last:border-r-0"
              >
                {{ v }}
              </td>
            </tr>

            <!-- Month header -->
            <tr class="bg-gradient-to-r from-[#1f3864] to-[#2d4a7a]">
              <td class="border-b border-r border-white/10 px-2 py-2 text-center font-bold text-amber-300 tracking-wide">
                Plant
              </td>
              <td
                v-for="m in months"
                :key="'hdr-' + m"
                class="border-b border-r border-white/10 px-2 py-2 text-center font-bold text-white tracking-wide last:border-r-0"
              >
                {{ m }}
              </td>
            </tr>

            <!-- Data rows -->
            <tr
              v-for="r in rowIndexes"
              :key="'row-' + r"
              class="odd:bg-white even:bg-slate-50/60 hover:bg-sky-50 transition-colors"
            >
              <td
                v-if="r === 0"
                :rowspan="maxRows"
                class="border-b border-r border-slate-200 text-center align-middle font-semibold bg-slate-100"
              >
                <span
                  class="inline-block rounded-full bg-slate-200/70 px-1 py-3 text-slate-700 tracking-wide"
                  style="writing-mode: vertical-rl; transform: rotate(180deg)"
                >
                  NG (New)
                </span>
              </td>
              <td
                v-for="(_, c) in columns"
                :key="'cell-' + c + '-' + r"
                class="border-b border-r border-slate-200 p-1 align-top last:border-r-0"
              >
                <div
                  v-if="cellLines(c, r)"
                  :class="['rounded-md px-1.5 py-1.5 text-center font-medium', cellColor(c, r)]"
                >
                  <div v-for="(line, li) in cellLines(c, r)" :key="li">{{ line }}</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </MainLayout>
</template>
