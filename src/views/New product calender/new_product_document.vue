<script setup>
import { useRouter } from "vue-router";
import MainLayout from "@/components/layouts/main_layout.vue";
import { products } from "./new_product_document_data.js";

const router = useRouter();

function unlock(product) {
  router.push({ name: "new_product_document_files", params: { slug: product.slug } });
}
</script>

<template>
  <MainLayout>
    <div class="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8">
      <div class="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
        <table class="min-w-full border-collapse text-sm">
          <thead>
            <tr>
              <th
                colspan="10"
                class="border border-slate-200 bg-blue-100 px-4 py-3 text-center text-sm font-semibold text-blue-900"
              >
                New Product Document
              </th>
            </tr>
            <tr class="bg-emerald-50 text-slate-700">
              <th class="border border-slate-200 px-3 py-2 font-semibold whitespace-nowrap">Sl. No.</th>
              <th class="border border-slate-200 px-3 py-2 font-semibold whitespace-nowrap">Molecule Code</th>
              <th class="border border-slate-200 px-3 py-2 font-semibold whitespace-nowrap">Product Code</th>
              <th class="border border-slate-200 px-3 py-2 font-semibold">Molecule</th>
              <th class="border border-slate-200 px-3 py-2 font-semibold whitespace-nowrap">Therapeutic Class</th>
              <th class="border border-slate-200 px-3 py-2 font-semibold whitespace-nowrap">Strength</th>
              <th class="border border-slate-200 px-3 py-2 font-semibold whitespace-nowrap">Dosage Form</th>
              <th class="border border-slate-200 px-3 py-2 font-semibold whitespace-nowrap">Annexure Issue Date</th>
              <th class="border border-slate-200 px-3 py-2 font-semibold whitespace-nowrap">Annexure Expiry Date</th>
              <th class="border border-slate-200 px-3 py-2 font-semibold whitespace-nowrap">Document</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="p in products"
              :key="p.slug"
              class="odd:bg-white even:bg-slate-50/60 hover:bg-orange-50/50 transition-colors"
            >
              <td class="border border-slate-200 px-3 py-3 text-center text-slate-600">{{ p.slNo }}</td>
              <td class="border border-slate-200 px-3 py-3 text-slate-700">{{ p.moleculeCode }}</td>
              <td class="border border-slate-200 px-3 py-3 text-slate-700">{{ p.productCode }}</td>
              <td class="border border-slate-200 px-3 py-3 text-slate-700">{{ p.molecule }}</td>
              <td class="border border-slate-200 px-3 py-3 text-slate-700">{{ p.therapeuticClass }}</td>
              <td class="border border-slate-200 px-3 py-3 text-center text-slate-700">{{ p.strength }}</td>
              <td class="border border-slate-200 px-3 py-3 text-slate-700">{{ p.dosageForm }}</td>
              <td class="border border-slate-200 px-3 py-3 text-center text-slate-700">{{ p.annexureIssueDate }}</td>
              <td class="border border-slate-200 px-3 py-3 text-center text-slate-700">{{ p.annexureExpiryDate }}</td>
              <td class="border border-slate-200 px-3 py-3 text-center">
                <button
                  type="button"
                  class="text-xs font-semibold text-rose-600 border border-rose-300 rounded-md px-3 py-1 hover:bg-rose-50 transition-colors"
                  @click="unlock(p)"
                >
                  Unlock
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </MainLayout>
</template>
