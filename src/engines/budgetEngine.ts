// ============================================================
// BUDGET PLANNER ENGINE
// Finds the most balanced, compatible build within a INR budget
// Uses CPU/GPU ratio optimization + greedy fill for other parts
// ============================================================

import type { PCBuild, CPU, GPU, Motherboard, RAM, PSU, Case, Cooler, Storage } from "../data/types";
import { cpuData } from "../data/cpus";
import { gpuData } from "../data/gpus";
import { motherboardData } from "../data/motherboards";
import { ramData } from "../data/ram";
import { psuData } from "../data/psus";
import { caseData } from "../data/cases";
import { coolerData } from "../data/coolers";
import { storageData } from "../data/storage";
import { estimatePerformance } from "./performanceEngine";
import { validateBuild } from "./compatibilityEngine";
import { createEmptyBuild } from "./buildStore";

// Budget allocation ratios (must sum to 1.0)
const BUDGET_RATIOS = {
  cpu:         0.20,
  gpu:         0.38,
  motherboard: 0.12,
  ram:         0.08,
  psu:         0.06,
  case:        0.07,
  cooler:      0.05,
  storage:     0.04,
};

// Minimum viable prices (floor thresholds)
const MIN_PRICES = {
  cpu:         4000,
  gpu:         10000,
  motherboard: 5000,
  ram:         1800,
  psu:         2200,
  case:        2500,
  cooler:      500,
  storage:     2000,
};

export interface BudgetSuggestion {
  build: PCBuild;
  totalPrice: number;
  budgetUtilization: number; // 0–1
  overallScore: number;
  fps1080p: number;
  tier: string;
  validationPassed: boolean;
  notes: string[];
}

/** Pick best component at or under maxPrice using score/price ratio */
function bestByRatio<T extends { price_inr: number; performance_score?: number }>(
  items: T[],
  maxPrice: number,
  scoreKey: keyof T = "performance_score" as keyof T
): T | null {
  const candidates = items.filter((i) => i.price_inr <= maxPrice);
  if (candidates.length === 0) return null;
  // maximize score/price ratio
  return candidates.reduce((best, item) => {
    const bestVal = (Number(best[scoreKey] ?? 0) / best.price_inr);
    const itemVal = (Number(item[scoreKey] ?? 0) / item.price_inr);
    return itemVal > bestVal ? item : best;
  });
}

/** Pick cheapest component in budget (for fill items) */
function cheapestIn<T extends { price_inr: number }>(items: T[], maxPrice: number): T | null {
  const cands = items.filter((i) => i.price_inr <= maxPrice).sort((a, b) => b.price_inr - a.price_inr);
  return cands[0] ?? null;
}

/** Find a compatible motherboard for a given CPU */
function findCompatibleMotherboard(cpu: CPU, maxPrice: number): Motherboard | null {
  const cands = motherboardData.filter(
    (m) => m.socket === cpu.socket && m.price_inr <= maxPrice
  );
  if (cands.length === 0) return null;
  return cands.reduce((best, m) =>
    m.price_inr > best.price_inr ? m : best
  );
}

/** Find compatible RAM for CPU + motherboard */
function findCompatibleRAM(cpu: CPU, mobo: Motherboard, maxPrice: number): RAM | null {
  const cands = ramData.filter(
    (r) =>
      r.type === mobo.ram_type &&
      cpu.supported_ram_type.includes(r.type) &&
      r.price_inr <= maxPrice
  );
  if (cands.length === 0) return null;
  return cands.reduce((best, r) =>
    r.size_gb > best.size_gb || (r.size_gb === best.size_gb && r.speed_mhz > best.speed_mhz)
      ? r
      : best
  );
}

/** Find a PSU with enough headroom */
function findPSU(estimatedLoad: number, maxPrice: number): PSU | null {
  const needed = Math.ceil(estimatedLoad * 1.25);
  const cands = psuData.filter((p) => p.wattage >= needed && p.price_inr <= maxPrice);
  if (cands.length === 0) {
    // fallback: cheapest that covers load at 1.1x
    const fallback = psuData
      .filter((p) => p.wattage >= estimatedLoad * 1.1 && p.price_inr <= maxPrice)
      .sort((a, b) => a.price_inr - b.price_inr);
    return fallback[0] ?? null;
  }
  return cands.reduce((best, p) =>
    p.price_inr > best.price_inr ? p : best
  );
}

/** Find compatible cooler for CPU */
function findCooler(cpu: CPU, maxPrice: number): Cooler | null {
  const cands = coolerData.filter(
    (c) => c.socket_support.includes(cpu.socket) && c.tdp_rating_w >= cpu.tdp_w && c.price_inr <= maxPrice
  );
  if (cands.length === 0) {
    // fallback: any socket-compatible cooler
    const fallback = coolerData
      .filter((c) => c.socket_support.includes(cpu.socket) && c.price_inr <= maxPrice)
      .sort((a, b) => b.tdp_rating_w - a.tdp_rating_w);
    return fallback[0] ?? null;
  }
  return cands.reduce((best, c) =>
    c.price_inr > best.price_inr ? c : best
  );
}

/** Find a case that fits the motherboard */
function findCase(mobo: Motherboard, maxPrice: number): Case | null {
  const cands = caseData.filter(
    (c) => c.form_factor_support.includes(mobo.form_factor) && c.price_inr <= maxPrice
  );
  if (cands.length === 0) return null;
  return cands.reduce((best, c) =>
    c.price_inr > best.price_inr ? c : best
  );
}

// ============================================================
// MAIN ENGINE
// ============================================================
export function generateBudgetBuild(budgetInr: number): BudgetSuggestion | null {
  const notes: string[] = [];

  // Minimum viable system
  const minTotal =
    MIN_PRICES.cpu + MIN_PRICES.gpu + MIN_PRICES.motherboard +
    MIN_PRICES.ram + MIN_PRICES.psu + MIN_PRICES.case +
    MIN_PRICES.cooler + MIN_PRICES.storage;

  if (budgetInr < minTotal) {
    return null; // Not enough for a basic build
  }

  // ── Step 1: Allocate budgets per category
  let alloc = {
    cpu:         Math.floor(budgetInr * BUDGET_RATIOS.cpu),
    gpu:         Math.floor(budgetInr * BUDGET_RATIOS.gpu),
    motherboard: Math.floor(budgetInr * BUDGET_RATIOS.motherboard),
    ram:         Math.floor(budgetInr * BUDGET_RATIOS.ram),
    psu:         Math.floor(budgetInr * BUDGET_RATIOS.psu),
    case:        Math.floor(budgetInr * BUDGET_RATIOS.case),
    cooler:      Math.floor(budgetInr * BUDGET_RATIOS.cooler),
    storage:     Math.floor(budgetInr * BUDGET_RATIOS.storage),
  };

  // Ensure minimums
  (Object.keys(MIN_PRICES) as (keyof typeof MIN_PRICES)[]).forEach((k) => {
    if (alloc[k] < MIN_PRICES[k]) {
      alloc[k] = MIN_PRICES[k];
    }
  });

  // ── Step 2: Select CPU (best score/price ratio)
  const cpu = bestByRatio(cpuData, alloc.cpu);
  if (!cpu) return null;

  // ── Step 3: Select GPU — maximize performance within GPU budget
  const gpu = bestByRatio(gpuData, alloc.gpu);

  // ── Step 4: Compatible Motherboard
  let mobo = findCompatibleMotherboard(cpu, alloc.motherboard);
  if (!mobo) {
    // Try with higher budget (borrow from GPU)
    const extraBudget = Math.floor(alloc.gpu * 0.1);
    mobo = findCompatibleMotherboard(cpu, alloc.motherboard + extraBudget);
    if (mobo) {
      alloc.gpu -= extraBudget;
      notes.push("Slightly adjusted budget to fit a compatible motherboard.");
    } else {
      return null; // Cannot build without a motherboard
    }
  }

  // ── Step 5: Compatible RAM
  const ram = findCompatibleRAM(cpu, mobo, alloc.ram) ??
    cheapestIn(ramData.filter((r) => r.type === mobo.ram_type), alloc.ram * 2);

  // ── Step 6: PSU with headroom
  const estimatedLoad = (cpu?.tdp_w ?? 65) + (gpu?.tdp_w ?? 150) + 50;
  const psu = findPSU(estimatedLoad, alloc.psu) ??
    psuData.sort((a, b) => a.price_inr - b.price_inr).find((p) => p.wattage >= estimatedLoad * 1.1) ??
    null;

  // ── Step 7: Case that fits mobo
  const pcCase = findCase(mobo, alloc.case) ??
    cheapestIn(caseData.filter((c) => c.form_factor_support.includes(mobo.form_factor)), alloc.case * 2);

  // ── Step 8: Cooler
  const cooler = findCooler(cpu, alloc.cooler) ??
    cheapestIn(coolerData.filter((c) => c.socket_support.includes(cpu.socket)), alloc.cooler * 2);

  // ── Step 9: Storage
  const storage = cheapestIn(
    storageData.filter((s) => s.type === "NVMe SSD"),
    alloc.storage * 2
  ) ?? cheapestIn(storageData, alloc.storage * 2);

  // ── Step 10: Assemble build
  const build: PCBuild = {
    ...createEmptyBuild("Budget Build"),
    cpu,
    gpu: gpu ?? null,
    motherboard: mobo,
    ram: ram ?? null,
    psu: psu ?? null,
    case: pcCase ?? null,
    cooler: cooler ?? null,
    storage: storage ? [storage] : [],
  };

  // ── Step 11: Score
  const perf = estimatePerformance(build);
  const validation = validateBuild(build);
  const totalPrice =
    (cpu?.price_inr ?? 0) +
    (gpu?.price_inr ?? 0) +
    (mobo?.price_inr ?? 0) +
    (ram?.price_inr ?? 0) +
    (psu?.price_inr ?? 0) +
    (pcCase?.price_inr ?? 0) +
    (cooler?.price_inr ?? 0) +
    (storage?.price_inr ?? 0);

  if (!validation.isValid) {
    notes.push(...validation.errors.map((e) => `⚠ ${e.message}`));
  }

  if (perf.bottleneck.detected) {
    notes.push(`Bottleneck: ${perf.bottleneck.type} (${perf.bottleneck.severity_pct}% severity)`);
  }

  notes.push(`CPU/GPU score ratio: ${(cpu.performance_score / (gpu?.performance_score ?? 1)).toFixed(2)}`);

  return {
    build,
    totalPrice,
    budgetUtilization: totalPrice / budgetInr,
    overallScore: perf.overall_score,
    fps1080p: perf.fps_1080p,
    tier: perf.gaming_tier,
    validationPassed: validation.isValid,
    notes,
  };
}

/** Generate 3 build tiers within budget: balanced, gaming-focused, productivity-focused */
export function generateBuildPresets(budgetInr: number): {
  balanced: BudgetSuggestion | null;
  gamingFocused: BudgetSuggestion | null;
  productivityFocused: BudgetSuggestion | null;
} {
  const balanced = generateBudgetBuild(budgetInr);

  // Gaming-focused: more GPU budget
  const gamingRatioOverride = { ...BUDGET_RATIOS, gpu: 0.46, cpu: 0.15, ram: 0.07 };
  const gamingBudget = Math.floor(budgetInr * gamingRatioOverride.gpu);
  const bestGamingGPU = bestByRatio(gpuData, gamingBudget);
  let gamingFocused: BudgetSuggestion | null = null;
  if (bestGamingGPU) {
    const remainingAfterGPU = budgetInr - bestGamingGPU.price_inr;
    const modifiedBudget: typeof BUDGET_RATIOS = {
      ...BUDGET_RATIOS,
      gpu: bestGamingGPU.price_inr / budgetInr,
    };
    gamingFocused = generateBudgetBuildWithRatios(budgetInr, modifiedBudget, "Gaming Build");
  }

  // Productivity: more CPU budget
  const productivityFocused = generateBudgetBuildWithRatios(
    budgetInr,
    { ...BUDGET_RATIOS, cpu: 0.28, gpu: 0.30, ram: 0.10 },
    "Productivity Build"
  );

  return { balanced, gamingFocused, productivityFocused };
}

function generateBudgetBuildWithRatios(
  budgetInr: number,
  ratios: typeof BUDGET_RATIOS,
  name: string
): BudgetSuggestion | null {
  const saved = { ...BUDGET_RATIOS };
  Object.assign(BUDGET_RATIOS, ratios);
  const result = generateBudgetBuild(budgetInr);
  Object.assign(BUDGET_RATIOS, saved);
  if (result) result.build.name = name;
  return result;
}
