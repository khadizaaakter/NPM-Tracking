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
  plain: "",
  pink: "bg-red-200",
  red: "bg-red-600 text-white font-semibold",
  green: "bg-green-300",
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
    <div class="min-h-screen bg-slate-50 p-6 md:p-8 font-serif">
      <h1 class="text-lg font-bold text-black mb-2">
        New Product (New Molecule+Line Extension) Calendar
      </h1>

      <div class="overflow-x-auto border border-black bg-white shadow-sm">
        <table class="border-collapse text-[11px] leading-tight w-full table-fixed">
          <colgroup>
            <col class="w-[70px]" />
            <col v-for="m in months" :key="'col-' + m" class="w-[100px]" />
          </colgroup>

          <tbody>
            <!-- Summary rows -->
            <tr>
              <td class="border border-black px-2 py-1 font-semibold">NG</td>
              <td
                v-for="(v, i) in stats.ng"
                :key="'ng-' + i"
                class="border border-black px-2 py-1 text-center"
              >
                {{ v }}
              </td>
            </tr>
            <tr>
              <td class="border border-black px-2 py-1 font-semibold">AHL</td>
              <td
                v-for="(v, i) in stats.ahl"
                :key="'ahl-' + i"
                class="border border-black px-2 py-1 text-center"
              >
                {{ v }}
              </td>
            </tr>
            <tr>
              <td class="border border-black px-2 py-1 font-semibold">Total</td>
              <td
                v-for="(v, i) in stats.total"
                :key="'total-' + i"
                class="border border-black px-2 py-1 text-center font-semibold"
              >
                {{ v }}
              </td>
            </tr>

            <!-- Month header -->
            <tr class="bg-[#1f3864]">
              <td class="border border-black px-2 py-1 text-center font-bold text-amber-300">
                Plant
              </td>
              <td
                v-for="m in months"
                :key="'hdr-' + m"
                class="border border-black px-2 py-1 text-center font-bold text-white"
              >
                {{ m }}
              </td>
            </tr>

            <!-- Data rows -->
            <tr v-for="r in rowIndexes" :key="'row-' + r">
              <td
                v-if="r === 0"
                :rowspan="maxRows"
                class="border border-black text-center align-middle font-semibold"
              >
                <span
                  class="inline-block"
                  style="writing-mode: vertical-rl; transform: rotate(180deg)"
                >
                  NG (New)
                </span>
              </td>
              <td
                v-for="(_, c) in columns"
                :key="'cell-' + c + '-' + r"
                :class="['border border-black px-1.5 py-1 text-center align-top', cellColor(c, r)]"
              >
                <template v-if="cellLines(c, r)">
                  <div v-for="(line, li) in cellLines(c, r)" :key="li">{{ line }}</div>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </MainLayout>
</template>
