// Ordered stages as they appear on the product launch flowchart.
export const documentStages = [
  { key: "product_proposal", label: "Product Proposal", ext: "xlsx", available: true },
  { key: "market_feasibility", label: "Market Feasibility", available: true },
  { key: "internal_product_brief", label: "Internal Product Brief", available: true },
  { key: "forecast_6m", label: "6M Forecast" },
  { key: "product_brief_approval", label: "Product Brief Approval" },
  { key: "formulation_concurrence", label: "Formulation Concurrence" },
  { key: "stability_3m", label: "3M Stability" },
  { key: "recipe_approval", label: "Recipe Approval" },
  { key: "pm_spec", label: "PM Spec." },
  { key: "internal_brand_name", label: "Internal Brand Name" },
  { key: "packaging_concurrence", label: "Packaging Concurrence" },
  { key: "cogs_copy", label: "COGS Copy" },
  { key: "internal_price", label: "Internal Price" },
  { key: "stability_6m", label: "6M Stability" },
  { key: "pm_design_approval", label: "PM Design Approval" },
  { key: "annexure_approval", label: "Annexure Approval" },
  { key: "inclusion_approval", label: "Inclusion Approval" },
  { key: "afpc_doc", label: "AFPC Doc." },
  { key: "price_approval", label: "Price Approval" },
  { key: "final_packaging", label: "Final Packaging" },
  { key: "internal_price_circular", label: "Internal Price Circular" },
  { key: "ma_certificate", label: "MA Certificate" },
  { key: "product_launching_circular", label: "Product Launching Circular", highlight: true },
];

// Serpentine row layout matching the reference flowchart (each row alternates direction).
export const flowRows = [
  { reverse: false, keys: ["product_proposal", "market_feasibility", "internal_product_brief", "forecast_6m", "product_brief_approval"] },
  { reverse: true, keys: ["formulation_concurrence", "stability_3m", "recipe_approval", "pm_spec", "internal_brand_name"] },
  { reverse: false, keys: ["packaging_concurrence", "cogs_copy", "internal_price", "stability_6m", "pm_design_approval"] },
  { reverse: true, keys: ["annexure_approval", "inclusion_approval", "afpc_doc", "price_approval"] },
  { reverse: false, keys: ["final_packaging", "internal_price_circular", "ma_certificate", "product_launching_circular"] },
];

export const products = [
  {
    slug: "np06260001-a",
    slNo: 1,
    moleculeCode: "NP06260001",
    productCode: "NP06260001 (a)",
    molecule: "Ceftazidime + Avibactam",
    therapeuticClass: "Antibiotic",
    strength: "2.5g",
    dosageForm: "Injection",
    annexureIssueDate: "10.06.2026",
    annexureExpiryDate: "10.06.2029",
  },
];

export function findProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}

export function stageFileExt(stageKey) {
  return documentStages.find((s) => s.key === stageKey)?.ext ?? "pdf";
}

export function documentFileUrl(stageKey) {
  return `${import.meta.env.BASE_URL}documents/download_doc/${stageKey}.${stageFileExt(stageKey)}`;
}
