// Ordered stages as they appear on the product launch flowchart.
export const documentStages = [
  { key: "product_proposal", label: "Product Proposal", ext: "xlsx" },
  { key: "market_feasibility", label: "Market Feasibility" },
  { key: "internal_product_brief", label: "Internal Product Brief" },
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

// Serpentine row layout matching the reference flowchart (each row alternates direction),
// grouped into named phases so the flow reads as a story rather than a flat grid.
export const flowRows = [
  {
    phase: "Concept & Proposal",
    reverse: false,
    keys: ["product_proposal", "market_feasibility", "internal_product_brief", "forecast_6m", "product_brief_approval"],
  },
  {
    phase: "Formulation & Development",
    reverse: true,
    keys: ["formulation_concurrence", "stability_3m", "recipe_approval", "pm_spec", "internal_brand_name"],
  },
  {
    phase: "Packaging & Pricing",
    reverse: false,
    keys: ["packaging_concurrence", "cogs_copy", "internal_price", "stability_6m", "pm_design_approval"],
  },
  {
    phase: "Regulatory Approvals",
    reverse: true,
    keys: ["annexure_approval", "inclusion_approval", "afpc_doc", "price_approval"],
  },
  {
    phase: "Launch Readiness",
    reverse: false,
    keys: ["final_packaging", "internal_price_circular", "ma_certificate", "product_launching_circular"],
  },
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

// Stages with a real, stage-specific file in public/documents/download_doc/.
// Everything else falls back to placeholder.pdf until its real file is added.
const STAGES_WITH_FILES = new Set(["product_proposal", "market_feasibility", "internal_product_brief"]);

export function stageFileExt(stageKey) {
  return documentStages.find((s) => s.key === stageKey)?.ext ?? "pdf";
}

export function documentFileUrl(stageKey) {
  if (!STAGES_WITH_FILES.has(stageKey)) {
    return `${import.meta.env.BASE_URL}documents/download_doc/placeholder.pdf`;
  }
  return `${import.meta.env.BASE_URL}documents/download_doc/${stageKey}.${stageFileExt(stageKey)}`;
}
