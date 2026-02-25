// ============================================================
// PERFORMANCE ESTIMATION ENGINE
// Formula-based heuristic model — no hardcoded FPS tables
// ============================================================

import type { PCBuild, PerformanceResult } from "../data/types";
import { estimatePowerLoad } from "./compatibilityEngine";

// ---- Constants -----------------------------------------------

const RESOLUTION_FACTORS = {
  "1080p": 1.0,
  "1440p": 0.75,
  "4K": 0.55,
} as const;

// Maximum theoretical score-normalized FPS baseline
// All scores are 0–100; 100 represents flagship (RTX 4090 / TR 3990X equivalent)
const BASE_FPS_SCALE = 165; // FPS at score=100, 1080p, no penalties

// ---- Helper Calculations -------------------------------------

function calcGamingFPS(
  gpuScore: number,
  cpuScore: number,
  ramGb: number,
  resolutionFactor: number
): number {
  // Weighted contribution: GPU = 70%, CPU = 30%
  const rawScore = gpuScore * 0.7 + cpuScore * 0.3;
  let fps = (rawScore / 100) * BASE_FPS_SCALE * resolutionFactor;

  // Bottleneck penalty: CPU score < 50% of GPU score
  if (cpuScore < gpuScore * 0.5) {
    const severityRatio = 1 - cpuScore / (gpuScore * 0.5);
    fps *= 1 - severityRatio * 0.15; // up to -15%
  }

  // RAM penalty: < 16GB
  if (ramGb < 16) {
    fps *= 0.9; // -10%
  }
  // RAM bonus: >= 32GB (minimal, diminishing)
  if (ramGb >= 32) {
    fps *= 1.02;
  }

  return Math.max(1, Math.round(fps));
}

function detectBottleneck(
  gpuScore: number,
  cpuScore: number,
  ramGb: number
): PerformanceResult["bottleneck"] {
  const ratio = gpuScore > 0 ? cpuScore / gpuScore : 1;

  if (gpuScore === 0 && cpuScore === 0) {
    return { detected: false, type: "None", severity_pct: 0 };
  }

  if (ratio < 0.5) {
    const severity = Math.round((1 - ratio / 0.5) * 100);
    return { detected: true, type: "CPU-bound", severity_pct: Math.min(severity, 100) };
  }
  if (ratio > 2.0) {
    const severity = Math.round(Math.min((ratio - 2.0) / 2.0, 1) * 100);
    return { detected: true, type: "GPU-bound", severity_pct: severity };
  }
  if (ramGb < 16) {
    return { detected: true, type: "RAM-bound", severity_pct: 30 };
  }

  return { detected: false, type: "None", severity_pct: 0 };
}

function classifyGamingTier(score1080p: number): PerformanceResult["gaming_tier"] {
  if (score1080p >= 140) return "Extreme";
  if (score1080p >= 100) return "Enthusiast";
  if (score1080p >= 65) return "High-End";
  if (score1080p >= 35) return "Mid-Range";
  return "Entry";
}

function calcProductivityScore(cpuScore: number, ramGb: number): number {
  // Productivity: CPU-heavy, RAM matters for multitasking
  const raw = cpuScore * 0.8 + Math.min(ramGb, 128) * 0.2;
  return Math.round(Math.min(raw, 100));
}

function calcContentCreationScore(cpuScore: number, gpuScore: number, ramGb: number): number {
  // Content creation: balanced CPU/GPU, RAM matters for large projects
  const raw = cpuScore * 0.5 + gpuScore * 0.35 + Math.min(ramGb / 64, 1) * 100 * 0.15;
  return Math.round(Math.min(raw, 100));
}

function calcThermalScore(build: PCBuild): number {
  if (!build.cooler || !build.cpu) return 50;
  const cpuTdp = build.cpu.tdp_w;
  const coolerRating = build.cooler.tdp_rating_w;
  const headroom = coolerRating / cpuTdp;
  // Scale: headroom 1.0 = 50%, 1.5 = 75%, 2.0+ = 100%
  const rawScore = Math.min((headroom - 1) / 1.0, 1) * 50 + 50;
  return Math.round(Math.min(rawScore, 100));
}

function calcOverallScore(
  fps1080p: number,
  productivityScore: number,
  contentScore: number,
  thermalScore: number,
  isValid: boolean
): number {
  if (!isValid) return 0;
  // Normalize FPS relative to 165 baseline
  const fpsNorm = Math.min((fps1080p / 165) * 100, 100);
  const composite = fpsNorm * 0.4 + productivityScore * 0.3 + contentScore * 0.2 + thermalScore * 0.1;
  return Math.round(Math.min(composite, 100));
}

// ---- Main Engine ---------------------------------------------------

export function estimatePerformance(build: PCBuild): PerformanceResult {
  const cpuScore = build.cpu?.performance_score ?? 0;
  const gpuScore = build.gpu?.performance_score ?? 0;
  const ramGb = build.ram?.size_gb ?? 0;
  const cpuTdp = build.cpu?.tdp_w ?? 0;
  const gpuTdp = build.gpu?.tdp_w ?? 0;

  const fps1080p = calcGamingFPS(gpuScore, cpuScore, ramGb, RESOLUTION_FACTORS["1080p"]);
  const fps1440p = calcGamingFPS(gpuScore, cpuScore, ramGb, RESOLUTION_FACTORS["1440p"]);
  const fps4k = calcGamingFPS(gpuScore, cpuScore, ramGb, RESOLUTION_FACTORS["4K"]);

  const bottleneck = detectBottleneck(gpuScore, cpuScore, ramGb);
  const gaming_tier = classifyGamingTier(fps1080p);
  const productivity_score = calcProductivityScore(cpuScore, ramGb);
  const content_creation_score = calcContentCreationScore(cpuScore, gpuScore, ramGb);
  const thermal_score = calcThermalScore(build);

  const estimatedLoad = estimatePowerLoad(build);
  const recommended_psu_w = Math.ceil(estimatedLoad * 1.25 / 50) * 50; // round to nearest 50W

  const hasComponents = !!(build.cpu && build.gpu && build.ram);
  const overall_score = calcOverallScore(
    fps1080p,
    productivity_score,
    content_creation_score,
    thermal_score,
    hasComponents
  );

  return {
    fps_1080p: fps1080p,
    fps_1440p: fps1440p,
    fps_4k: fps4k,
    productivity_score,
    content_creation_score,
    gaming_tier,
    bottleneck,
    estimated_total_watt: estimatedLoad,
    recommended_psu_w,
    thermal_score,
    overall_score,
  };
}
