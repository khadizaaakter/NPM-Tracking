<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import MainLayout from "@/components/layouts/main_layout.vue";
import { documentStages, flowRows, findProductBySlug, documentFileUrl, stageFileExt } from "./new_product_document_data.js";

const route = useRoute();
const router = useRouter();

const product = computed(() => findProductBySlug(route.params.slug));

function stageInfo(key) {
  return documentStages.find((s) => s.key === key);
}

function download(stageKey) {
  const stage = stageInfo(stageKey);
  if (!stage.available) return;
  const link = document.createElement("a");
  link.href = documentFileUrl(stageKey);
  link.download = `${product.value.slug}-${stage.key}.${stageFileExt(stageKey)}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<template>
  <MainLayout>
    <div class="min-h-screen bg-slate-50 p-4 sm:p-6 md:p-8">
      <button
        type="button"
        class="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
        @click="router.push({ name: 'new_product_document' })"
      >
        <Icon icon="heroicons:chevron-left-20-solid" class="h-4 w-4 text-black" />
        Back to New Product Document
      </button>

      <div v-if="!product" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
        Product not found.
      </div>

      <template v-else>
        <!-- Product summary card -->
        <div class="max-w-5xl mx-auto mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm px-6 py-5">
          <p class="text-xs font-semibold uppercase tracking-wider text-indigo-500 mb-1">Product Launch Document Flow</p>
          <h1 class="text-xl sm:text-2xl font-bold text-slate-900 mb-3">{{ product.molecule }}</h1>
          <div class="flex flex-wrap gap-2">
          </div>
        </div>

        <!-- Flow card -->
        <div class="max-w-5xl mx-auto rounded-2xl border border-slate-200 bg-white shadow-sm px-4 sm:px-8 py-8 overflow-x-auto">
          <div class="flex flex-col items-stretch gap-3 min-w-[640px]">
            <template v-for="(row, ri) in flowRows" :key="ri">
              <!-- Stage row -->
              <div class="flex items-stretch gap-2" :class="row.reverse ? 'flex-row-reverse' : 'flex-row'">
                <template v-for="(key, ki) in row.keys" :key="key">
                  <button
                    type="button"
                    :disabled="!stageInfo(key).available"
                    class="group relative flex-1 inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs sm:text-sm font-semibold text-center shadow-sm transition-all duration-150"
                    :class="!stageInfo(key).available
                      ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                      : (stageInfo(key).highlight
                        ? 'border-transparent bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-indigo-200 ring-1 ring-indigo-300 hover:-translate-y-0.5 hover:shadow-md'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/60 hover:-translate-y-0.5 hover:shadow-md')"
                    :title="stageInfo(key).available ? `Download ${stageInfo(key).label}` : `${stageInfo(key).label} (not available yet)`"
                    @click="download(key)"
                  >
                    <svg v-if="stageInfo(key).highlight" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4 shrink-0">
                      <path d="M3.25 2.5a.75.75 0 0 1 .75.75v.401a19.35 19.35 0 0 1 5.283-1.02.75.75 0 0 1 .618.271l.53.653a1.5 1.5 0 0 0 1.16.545h4.909a.75.75 0 0 1 .75.75v7.25a.75.75 0 0 1-.75.75h-4.91a1.5 1.5 0 0 1-1.16-.546l-.529-.653a.75.75 0 0 0-.618-.27 17.85 17.85 0 0 0-5.283 1.02V17.5a.75.75 0 0 1-1.5 0V3.25a.75.75 0 0 1 .75-.75Z" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4 shrink-0 text-indigo-400">
                      <path fill-rule="evenodd" d="M4 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.914a2 2 0 0 0-.586-1.414l-3.914-3.914A2 2 0 0 0 12.086 2H4Zm2 9a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 6 11Zm.75 2.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5h-6.5Z" clip-rule="evenodd" />
                    </svg>
                    <span>{{ stageInfo(key).label }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-3.5 w-3.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" :class="stageInfo(key).highlight ? 'text-white' : 'text-indigo-500'">
                      <path fill-rule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v8.638l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3.75A.75.75 0 0 1 10 3Z" clip-rule="evenodd" />
                    </svg>
                  </button>
                  <span
                    v-if="ki < row.keys.length - 1"
                    class="flex items-center text-slate-300"
                    :class="row.reverse ? 'rotate-180' : ''"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5">
                      <path fill-rule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06L12.94 10 8.22 5.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </template>
              </div>

              <!-- Connector down to next row -->
              <div v-if="ri < flowRows.length - 1" class="flex justify-center py-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 text-indigo-300">
                  <path fill-rule="evenodd" d="M4.22 8.22a.75.75 0 0 1 1.06 0L10 12.94l4.72-4.72a.75.75 0 1 1 1.06 1.06l-5.25 5.25a.75.75 0 0 1-1.06 0L4.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </MainLayout>
</template>
