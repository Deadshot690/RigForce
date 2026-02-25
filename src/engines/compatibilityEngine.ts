// ============================================================
// COMPATIBILITY VALIDATION ENGINE
// Modular rule-based system — returns structured ValidationResult
// ============================================================

import type { PCBuild, ValidationResult, ValidationError } from "../data/types";

// ---- Rule Definitions -----------------------------------------------

type ValidationRule = (build: PCBuild) => ValidationError[];

const RULES: ValidationRule[] = [

  // Rule 1: CPU–Motherboard Socket Match
  (build) => {
    const errors: ValidationError[] = [];
    if (!build.cpu || !build.motherboard) return errors;
    if (build.cpu.socket !== build.motherboard.socket) {
      errors.push({
        code: "CPU_SOCKET_MISMATCH",
        severity: "error",
        component: "CPU / Motherboard",
        message: `CPU socket ${build.cpu.socket} is incompatible with motherboard socket ${build.motherboard.socket}.`,
      });
    }
    return errors;
  },

  // Rule 2: RAM Type–Motherboard Compatibility
  (build) => {
    const errors: ValidationError[] = [];
    if (!build.ram || !build.motherboard) return errors;
    if (build.ram.type !== build.motherboard.ram_type) {
      errors.push({
        code: "RAM_TYPE_MISMATCH",
        severity: "error",
        component: "RAM / Motherboard",
        message: `Motherboard supports ${build.motherboard.ram_type} only, but selected RAM is ${build.ram.type}.`,
      });
    }
    return errors;
  },

  // Rule 3: RAM Type–CPU Compatibility
  (build) => {
    const errors: ValidationError[] = [];
    if (!build.ram || !build.cpu) return errors;
    const supported = build.cpu.supported_ram_type;
    if (!supported.includes(build.ram.type)) {
      errors.push({
        code: "CPU_RAM_TYPE_MISMATCH",
        severity: "error",
        component: "CPU / RAM",
        message: `CPU supports ${supported.join(" / ")}, but selected RAM is ${build.ram.type}.`,
      });
    }
    return errors;
  },

  // Rule 4: RAM Speed Exceeds Motherboard Max
  (build) => {
    const errors: ValidationError[] = [];
    if (!build.ram || !build.motherboard) return errors;
    if (build.ram.speed_mhz > build.motherboard.max_ram_speed_mhz) {
      errors.push({
        code: "RAM_SPEED_OVER_MOBO_MAX",
        severity: "warning",
        component: "RAM / Motherboard",
        message: `RAM speed ${build.ram.speed_mhz}MHz exceeds motherboard max of ${build.motherboard.max_ram_speed_mhz}MHz. It will run at the lower speed.`,
      });
    }
    return errors;
  },

  // Rule 5: RAM Capacity Exceeds Motherboard Max
  (build) => {
    const errors: ValidationError[] = [];
    if (!build.ram || !build.motherboard) return errors;
    if (build.ram.size_gb > build.motherboard.max_ram_gb) {
      errors.push({
        code: "RAM_CAPACITY_EXCEEDS_MOBO_MAX",
        severity: "error",
        component: "RAM / Motherboard",
        message: `RAM kit is ${build.ram.size_gb}GB but motherboard supports a maximum of ${build.motherboard.max_ram_gb}GB.`,
      });
    }
    return errors;
  },

  // Rule 6: Motherboard Form Factor fits Case
  (build) => {
    const errors: ValidationError[] = [];
    if (!build.motherboard || !build.case) return errors;
    const supported = build.case.form_factor_support;
    if (!supported.includes(build.motherboard.form_factor)) {
      errors.push({
        code: "MOBO_FORM_FACTOR_CASE_MISMATCH",
        severity: "error",
        component: "Motherboard / Case",
        message: `Case only supports ${supported.join(", ")} motherboards, but selected board is ${build.motherboard.form_factor}.`,
      });
    }
    return errors;
  },

  // Rule 7: GPU Length fits Case
  (build) => {
    const errors: ValidationError[] = [];
    if (!build.gpu || !build.case) return errors;
    if (build.gpu.length_mm > build.case.max_gpu_length_mm) {
      errors.push({
        code: "GPU_CLEARANCE_EXCEEDED",
        severity: "error",
        component: "GPU / Case",
        message: `GPU length ${build.gpu.length_mm}mm exceeds case max clearance of ${build.case.max_gpu_length_mm}mm.`,
      });
    }
    return errors;
  },

  // Rule 8: PSU Wattage headroom (PSU >= Required * 1.25)
  (build) => {
    const errors: ValidationError[] = [];
    if (!build.psu) return errors;
    const estimatedLoad = estimatePowerLoad(build);
    const required = Math.ceil(estimatedLoad * 1.25);
    if (build.psu.wattage < required) {
      errors.push({
        code: "PSU_INSUFFICIENT_WATTAGE",
        severity: "error",
        component: "PSU",
        message: `Estimated system load ~${estimatedLoad}W. Recommended PSU is ≥${required}W, but selected is ${build.psu.wattage}W.`,
      });
    } else if (build.psu.wattage < estimatedLoad * 1.1) {
      errors.push({
        code: "PSU_LOW_HEADROOM",
        severity: "warning",
        component: "PSU",
        message: `PSU headroom is very low (~${Math.round((build.psu.wattage / estimatedLoad - 1) * 100)}%). Consider a higher wattage PSU.`,
      });
    }
    return errors;
  },

  // Rule 9: CPU Cooler TDP adequacy
  (build) => {
    const errors: ValidationError[] = [];
    if (!build.cpu || !build.cooler) return errors;
    if (build.cooler.tdp_rating_w < build.cpu.tdp_w) {
      errors.push({
        code: "COOLER_TDP_INSUFFICIENT",
        severity: "error",
        component: "Cooler",
        message: `Cooler is rated for ${build.cooler.tdp_rating_w}W but CPU TDP is ${build.cpu.tdp_w}W. Thermal throttling is likely.`,
      });
    } else if (build.cooler.tdp_rating_w < build.cpu.tdp_w * 1.2) {
      errors.push({
        code: "COOLER_TDP_TIGHT",
        severity: "warning",
        component: "Cooler",
        message: `Cooler TDP margin is tight for CPU TDP ${build.cpu.tdp_w}W. Consider a cooler with higher thermal headroom.`,
      });
    }
    return errors;
  },

  // Rule 10: Cooler socket support
  (build) => {
    const errors: ValidationError[] = [];
    if (!build.cpu || !build.cooler) return errors;
    if (!build.cooler.socket_support.includes(build.cpu.socket)) {
      errors.push({
        code: "COOLER_SOCKET_INCOMPATIBLE",
        severity: "error",
        component: "Cooler / CPU",
        message: `Cooler does not support CPU socket ${build.cpu.socket}. Compatible sockets: ${build.cooler.socket_support.join(", ")}.`,
      });
    }
    return errors;
  },

  // Rule 11: Cooler height fits case
  (build) => {
    const errors: ValidationError[] = [];
    if (!build.cooler || !build.case) return errors;
    if (build.cooler.height_mm > build.case.max_cooler_height_mm) {
      errors.push({
        code: "COOLER_HEIGHT_EXCEEDED",
        severity: "error",
        component: "Cooler / Case",
        message: `Cooler height ${build.cooler.height_mm}mm exceeds case max of ${build.case.max_cooler_height_mm}mm.`,
      });
    }
    return errors;
  },

  // Rule 12: PCIe Generation compatibility (warning if CPU/MOBO PCIe < GPU PCIe)
  (build) => {
    const errors: ValidationError[] = [];
    if (!build.gpu || !build.motherboard) return errors;
    if (build.gpu.pcie_gen > build.motherboard.pcie_gen) {
      errors.push({
        code: "PCIE_GEN_DOWNGRADE",
        severity: "warning",
        component: "GPU / Motherboard",
        message: `GPU uses PCIe ${build.gpu.pcie_gen}.0 but motherboard only supports PCIe ${build.motherboard.pcie_gen}.0. GPU will run at reduced bandwidth.`,
      });
    }
    return errors;
  },

  // Rule 13: Storage slot limits (M.2 slots)
  (build) => {
    const errors: ValidationError[] = [];
    if (!build.motherboard || build.storage.length === 0) return errors;
    const m2Drives = build.storage.filter(
      (s) => s.form_factor === "M.2 2280" || s.form_factor === "M.2 2242"
    );
    const sataDrives = build.storage.filter(
      (s) => s.form_factor === "2.5\"" || s.form_factor === "3.5\""
    );
    if (m2Drives.length > build.motherboard.m2_slots) {
      errors.push({
        code: "M2_SLOT_LIMIT_EXCEEDED",
        severity: "error",
        component: "Storage / Motherboard",
        message: `Build has ${m2Drives.length} M.2 drives but motherboard only has ${build.motherboard.m2_slots} M.2 slots.`,
      });
    }
    if (sataDrives.length > build.motherboard.sata_ports) {
      errors.push({
        code: "SATA_PORT_LIMIT_EXCEEDED",
        severity: "error",
        component: "Storage / Motherboard",
        message: `Build has ${sataDrives.length} SATA drives but motherboard only has ${build.motherboard.sata_ports} SATA ports.`,
      });
    }
    return errors;
  },

  // Rule 14: No GPU + no integrated graphics warning
  (build) => {
    const errors: ValidationError[] = [];
    const hasIgpu = build.cpu?.integrated_graphics ?? false;
    if (!build.gpu && !hasIgpu && build.cpu) {
      errors.push({
        code: "NO_DISPLAY_OUTPUT",
        severity: "error",
        component: "GPU",
        message: "No dedicated GPU and CPU has no integrated graphics. System will have no display output.",
      });
    }
    return errors;
  },
];

// ---- Helper: Estimate Power Load -----------------------------------

export function estimatePowerLoad(build: PCBuild): number {
  let total = 50; // Base system board + drives + fans
  if (build.cpu) total += build.cpu.tdp_w;
  if (build.gpu) total += build.gpu.tdp_w;
  if (build.ram) total += Math.min(20, build.ram.kit_sticks * 5);
  if (build.storage.length > 0) total += build.storage.length * 10;
  return total;
}

// ---- Main Engine ---------------------------------------------------

export function validateBuild(build: PCBuild): ValidationResult {
  const allIssues: ValidationError[] = [];

  for (const rule of RULES) {
    const issues = rule(build);
    allIssues.push(...issues);
  }

  const errors = allIssues.filter((e) => e.severity === "error");
  const warnings = allIssues.filter((e) => e.severity === "warning");

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
