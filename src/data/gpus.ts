import type { GPU } from "./types";

export const gpuData: GPU[] = [
  // === NVIDIA RTX 40 SERIES ===
  { id: "rtx4090", name: "NVIDIA GeForce RTX 4090", brand: "NVIDIA", vram_gb: 24, tdp_w: 450, performance_score: 100, pcie_gen: 4, length_mm: 336, price_inr: 155000, series: "RTX 40", memory_type: "GDDR6X" },
  { id: "rtx4080-super", name: "NVIDIA GeForce RTX 4080 Super", brand: "NVIDIA", vram_gb: 16, tdp_w: 320, performance_score: 87, pcie_gen: 4, length_mm: 310, price_inr: 105000, series: "RTX 40", memory_type: "GDDR6X" },
  { id: "rtx4080", name: "NVIDIA GeForce RTX 4080", brand: "NVIDIA", vram_gb: 16, tdp_w: 320, performance_score: 85, pcie_gen: 4, length_mm: 310, price_inr: 96000, series: "RTX 40", memory_type: "GDDR6X" },
  { id: "rtx4070-ti-super", name: "NVIDIA GeForce RTX 4070 Ti Super", brand: "NVIDIA", vram_gb: 16, tdp_w: 285, performance_score: 78, pcie_gen: 4, length_mm: 305, price_inr: 80000, series: "RTX 40", memory_type: "GDDR6X" },
  { id: "rtx4070-ti", name: "NVIDIA GeForce RTX 4070 Ti", brand: "NVIDIA", vram_gb: 12, tdp_w: 285, performance_score: 74, pcie_gen: 4, length_mm: 300, price_inr: 70000, series: "RTX 40", memory_type: "GDDR6X" },
  { id: "rtx4070-super", name: "NVIDIA GeForce RTX 4070 Super", brand: "NVIDIA", vram_gb: 12, tdp_w: 220, performance_score: 68, pcie_gen: 4, length_mm: 285, price_inr: 58000, series: "RTX 40", memory_type: "GDDR6X" },
  { id: "rtx4070", name: "NVIDIA GeForce RTX 4070", brand: "NVIDIA", vram_gb: 12, tdp_w: 200, performance_score: 63, pcie_gen: 4, length_mm: 285, price_inr: 50000, series: "RTX 40", memory_type: "GDDR6X" },
  { id: "rtx4060-ti-16gb", name: "NVIDIA GeForce RTX 4060 Ti 16GB", brand: "NVIDIA", vram_gb: 16, tdp_w: 165, performance_score: 55, pcie_gen: 4, length_mm: 240, price_inr: 42000, series: "RTX 40", memory_type: "GDDR6" },
  { id: "rtx4060-ti", name: "NVIDIA GeForce RTX 4060 Ti", brand: "NVIDIA", vram_gb: 8, tdp_w: 165, performance_score: 52, pcie_gen: 4, length_mm: 240, price_inr: 36000, series: "RTX 40", memory_type: "GDDR6" },
  { id: "rtx4060", name: "NVIDIA GeForce RTX 4060", brand: "NVIDIA", vram_gb: 8, tdp_w: 115, performance_score: 45, pcie_gen: 4, length_mm: 240, price_inr: 28000, series: "RTX 40", memory_type: "GDDR6" },
  { id: "rtx4050", name: "NVIDIA GeForce RTX 4050", brand: "NVIDIA", vram_gb: 6, tdp_w: 100, performance_score: 36, pcie_gen: 4, length_mm: 200, price_inr: 22000, series: "RTX 40", memory_type: "GDDR6" },

  // === NVIDIA RTX 50 SERIES ===
  { id: "rtx5090", name: "NVIDIA GeForce RTX 5090", brand: "NVIDIA", vram_gb: 32, tdp_w: 575, performance_score: 130, pcie_gen: 5, length_mm: 346, price_inr: 230000, series: "RTX 50", memory_type: "GDDR7" },
  { id: "rtx5080", name: "NVIDIA GeForce RTX 5080", brand: "NVIDIA", vram_gb: 16, tdp_w: 360, performance_score: 110, pcie_gen: 5, length_mm: 320, price_inr: 135000, series: "RTX 50", memory_type: "GDDR7" },
  { id: "rtx5070-ti", name: "NVIDIA GeForce RTX 5070 Ti", brand: "NVIDIA", vram_gb: 16, tdp_w: 300, performance_score: 96, pcie_gen: 5, length_mm: 300, price_inr: 92000, series: "RTX 50", memory_type: "GDDR7" },
  { id: "rtx5070", name: "NVIDIA GeForce RTX 5070", brand: "NVIDIA", vram_gb: 12, tdp_w: 250, performance_score: 85, pcie_gen: 5, length_mm: 285, price_inr: 66000, series: "RTX 50", memory_type: "GDDR7" },
  { id: "rtx5060-ti", name: "NVIDIA GeForce RTX 5060 Ti", brand: "NVIDIA", vram_gb: 16, tdp_w: 180, performance_score: 72, pcie_gen: 5, length_mm: 250, price_inr: 46000, series: "RTX 50", memory_type: "GDDR7" },
  { id: "rtx5060", name: "NVIDIA GeForce RTX 5060", brand: "NVIDIA", vram_gb: 8, tdp_w: 150, performance_score: 60, pcie_gen: 5, length_mm: 240, price_inr: 34000, series: "RTX 50", memory_type: "GDDR7" },

  // === NVIDIA RTX 30 SERIES ===
  { id: "rtx3090-ti", name: "NVIDIA GeForce RTX 3090 Ti", brand: "NVIDIA", vram_gb: 24, tdp_w: 450, performance_score: 82, pcie_gen: 4, length_mm: 336, price_inr: 75000, series: "RTX 30", memory_type: "GDDR6X" },
  { id: "rtx3090", name: "NVIDIA GeForce RTX 3090", brand: "NVIDIA", vram_gb: 24, tdp_w: 350, performance_score: 78, pcie_gen: 4, length_mm: 336, price_inr: 62000, series: "RTX 30", memory_type: "GDDR6X" },
  { id: "rtx3080-ti", name: "NVIDIA GeForce RTX 3080 Ti", brand: "NVIDIA", vram_gb: 12, tdp_w: 350, performance_score: 74, pcie_gen: 4, length_mm: 320, price_inr: 55000, series: "RTX 30", memory_type: "GDDR6X" },
  { id: "rtx3080-12gb", name: "NVIDIA GeForce RTX 3080 12GB", brand: "NVIDIA", vram_gb: 12, tdp_w: 350, performance_score: 70, pcie_gen: 4, length_mm: 285, price_inr: 48000, series: "RTX 30", memory_type: "GDDR6X" },
  { id: "rtx3080", name: "NVIDIA GeForce RTX 3080", brand: "NVIDIA", vram_gb: 10, tdp_w: 320, performance_score: 68, pcie_gen: 4, length_mm: 285, price_inr: 42000, series: "RTX 30", memory_type: "GDDR6X" },
  { id: "rtx3070-ti", name: "NVIDIA GeForce RTX 3070 Ti", brand: "NVIDIA", vram_gb: 8, tdp_w: 290, performance_score: 62, pcie_gen: 4, length_mm: 267, price_inr: 36000, series: "RTX 30", memory_type: "GDDR6X" },
  { id: "rtx3070", name: "NVIDIA GeForce RTX 3070", brand: "NVIDIA", vram_gb: 8, tdp_w: 220, performance_score: 58, pcie_gen: 4, length_mm: 242, price_inr: 30000, series: "RTX 30", memory_type: "GDDR6" },
  { id: "rtx3060-ti", name: "NVIDIA GeForce RTX 3060 Ti", brand: "NVIDIA", vram_gb: 8, tdp_w: 200, performance_score: 52, pcie_gen: 4, length_mm: 242, price_inr: 26000, series: "RTX 30", memory_type: "GDDR6" },
  { id: "rtx3060", name: "NVIDIA GeForce RTX 3060", brand: "NVIDIA", vram_gb: 12, tdp_w: 170, performance_score: 46, pcie_gen: 4, length_mm: 200, price_inr: 22000, series: "RTX 30", memory_type: "GDDR6" },
  { id: "rtx3050", name: "NVIDIA GeForce RTX 3050", brand: "NVIDIA", vram_gb: 8, tdp_w: 130, performance_score: 36, pcie_gen: 4, length_mm: 190, price_inr: 16500, series: "RTX 30", memory_type: "GDDR6" },

  // === AMD RX 7000 SERIES ===
  { id: "rx7900-xtx", name: "AMD Radeon RX 7900 XTX", brand: "AMD", vram_gb: 24, tdp_w: 355, performance_score: 88, pcie_gen: 4, length_mm: 287, price_inr: 80000, series: "RX 7000", memory_type: "GDDR6" },
  { id: "rx7900-xt", name: "AMD Radeon RX 7900 XT", brand: "AMD", vram_gb: 20, tdp_w: 315, performance_score: 82, pcie_gen: 4, length_mm: 287, price_inr: 70000, series: "RX 7000", memory_type: "GDDR6" },
  { id: "rx7900-gre", name: "AMD Radeon RX 7900 GRE", brand: "AMD", vram_gb: 16, tdp_w: 260, performance_score: 74, pcie_gen: 4, length_mm: 267, price_inr: 55000, series: "RX 7000", memory_type: "GDDR6" },
  { id: "rx7800-xt", name: "AMD Radeon RX 7800 XT", brand: "AMD", vram_gb: 16, tdp_w: 263, performance_score: 65, pcie_gen: 4, length_mm: 267, price_inr: 42000, series: "RX 7000", memory_type: "GDDR6" },
  { id: "rx7700-xt", name: "AMD Radeon RX 7700 XT", brand: "AMD", vram_gb: 12, tdp_w: 245, performance_score: 59, pcie_gen: 4, length_mm: 240, price_inr: 34000, series: "RX 7000", memory_type: "GDDR6" },
  { id: "rx7600", name: "AMD Radeon RX 7600", brand: "AMD", vram_gb: 8, tdp_w: 165, performance_score: 44, pcie_gen: 4, length_mm: 200, price_inr: 22000, series: "RX 7000", memory_type: "GDDR6" },
  { id: "rx7600-xt", name: "AMD Radeon RX 7600 XT", brand: "AMD", vram_gb: 16, tdp_w: 190, performance_score: 50, pcie_gen: 4, length_mm: 215, price_inr: 28000, series: "RX 7000", memory_type: "GDDR6" },
  { id: "rx7500-xt", name: "AMD Radeon RX 7500 XT", brand: "AMD", vram_gb: 8, tdp_w: 150, performance_score: 36, pcie_gen: 4, length_mm: 190, price_inr: 17500, series: "RX 7000", memory_type: "GDDR6" },

  // === AMD RX 6000 SERIES ===
  { id: "rx6950-xt", name: "AMD Radeon RX 6950 XT", brand: "AMD", vram_gb: 16, tdp_w: 335, performance_score: 70, pcie_gen: 4, length_mm: 267, price_inr: 52000, series: "RX 6000", memory_type: "GDDR6" },
  { id: "rx6900-xt", name: "AMD Radeon RX 6900 XT", brand: "AMD", vram_gb: 16, tdp_w: 300, performance_score: 67, pcie_gen: 4, length_mm: 267, price_inr: 44000, series: "RX 6000", memory_type: "GDDR6" },
  { id: "rx6800-xt", name: "AMD Radeon RX 6800 XT", brand: "AMD", vram_gb: 16, tdp_w: 300, performance_score: 62, pcie_gen: 4, length_mm: 267, price_inr: 38000, series: "RX 6000", memory_type: "GDDR6" },
  { id: "rx6800", name: "AMD Radeon RX 6800", brand: "AMD", vram_gb: 16, tdp_w: 250, performance_score: 57, pcie_gen: 4, length_mm: 267, price_inr: 32000, series: "RX 6000", memory_type: "GDDR6" },
  { id: "rx6750-xt", name: "AMD Radeon RX 6750 XT", brand: "AMD", vram_gb: 12, tdp_w: 250, performance_score: 53, pcie_gen: 4, length_mm: 267, price_inr: 27500, series: "RX 6000", memory_type: "GDDR6" },
  { id: "rx6700-xt", name: "AMD Radeon RX 6700 XT", brand: "AMD", vram_gb: 12, tdp_w: 230, performance_score: 50, pcie_gen: 4, length_mm: 267, price_inr: 24000, series: "RX 6000", memory_type: "GDDR6" },
  { id: "rx6700", name: "AMD Radeon RX 6700", brand: "AMD", vram_gb: 10, tdp_w: 175, performance_score: 46, pcie_gen: 4, length_mm: 240, price_inr: 20000, series: "RX 6000", memory_type: "GDDR6" },
  { id: "rx6650-xt", name: "AMD Radeon RX 6650 XT", brand: "AMD", vram_gb: 8, tdp_w: 180, performance_score: 43, pcie_gen: 4, length_mm: 196, price_inr: 18500, series: "RX 6000", memory_type: "GDDR6" },
  { id: "rx6600-xt", name: "AMD Radeon RX 6600 XT", brand: "AMD", vram_gb: 8, tdp_w: 160, performance_score: 40, pcie_gen: 4, length_mm: 196, price_inr: 16000, series: "RX 6000", memory_type: "GDDR6" },
  { id: "rx6600", name: "AMD Radeon RX 6600", brand: "AMD", vram_gb: 8, tdp_w: 132, performance_score: 37, pcie_gen: 4, length_mm: 196, price_inr: 14000, series: "RX 6000", memory_type: "GDDR6" },

  // === INTEL ARC ===
  { id: "arc-b580", name: "Intel Arc B580", brand: "Intel", vram_gb: 12, tdp_w: 190, performance_score: 45, pcie_gen: 4, length_mm: 268, price_inr: 25000, series: "Arc B", memory_type: "GDDR6" },
  { id: "arc-b770", name: "Intel Arc B770", brand: "Intel", vram_gb: 16, tdp_w: 225, performance_score: 55, pcie_gen: 4, length_mm: 275, price_inr: 32000, series: "Arc B", memory_type: "GDDR6" },
  { id: "arc-a770-16gb", name: "Intel Arc A770 16GB", brand: "Intel", vram_gb: 16, tdp_w: 225, performance_score: 42, pcie_gen: 4, length_mm: 272, price_inr: 22000, series: "Arc A", memory_type: "GDDR6" },
  { id: "arc-a770", name: "Intel Arc A770 8GB", brand: "Intel", vram_gb: 8, tdp_w: 225, performance_score: 40, pcie_gen: 4, length_mm: 272, price_inr: 19000, series: "Arc A", memory_type: "GDDR6" },
  { id: "arc-a750", name: "Intel Arc A750", brand: "Intel", vram_gb: 8, tdp_w: 225, performance_score: 36, pcie_gen: 4, length_mm: 272, price_inr: 16500, series: "Arc A", memory_type: "GDDR6" },
  { id: "arc-a580", name: "Intel Arc A580", brand: "Intel", vram_gb: 8, tdp_w: 185, performance_score: 30, pcie_gen: 4, length_mm: 260, price_inr: 13500, series: "Arc A", memory_type: "GDDR6" },

  // === NVIDIA GTX/GT (Budget) ===
  { id: "gtx1660-super", name: "NVIDIA GeForce GTX 1660 Super", brand: "NVIDIA", vram_gb: 6, tdp_w: 125, performance_score: 28, pcie_gen: 3, length_mm: 229, price_inr: 13000, series: "GTX 16", memory_type: "GDDR6" },
  { id: "gtx1660-ti", name: "NVIDIA GeForce GTX 1660 Ti", brand: "NVIDIA", vram_gb: 6, tdp_w: 120, performance_score: 27, pcie_gen: 3, length_mm: 229, price_inr: 12500, series: "GTX 16", memory_type: "GDDR6" },
  { id: "gtx1660", name: "NVIDIA GeForce GTX 1660", brand: "NVIDIA", vram_gb: 6, tdp_w: 120, performance_score: 24, pcie_gen: 3, length_mm: 229, price_inr: 10500, series: "GTX 16", memory_type: "GDDR5" as any },
  { id: "rtx2060", name: "NVIDIA GeForce RTX 2060", brand: "NVIDIA", vram_gb: 6, tdp_w: 160, performance_score: 30, pcie_gen: 3, length_mm: 229, price_inr: 14000, series: "RTX 20", memory_type: "GDDR6" },
  { id: "rtx2060-super", name: "NVIDIA GeForce RTX 2060 Super", brand: "NVIDIA", vram_gb: 8, tdp_w: 175, performance_score: 34, pcie_gen: 3, length_mm: 229, price_inr: 16000, series: "RTX 20", memory_type: "GDDR6" },
  { id: "rtx2070-super", name: "NVIDIA GeForce RTX 2070 Super", brand: "NVIDIA", vram_gb: 8, tdp_w: 215, performance_score: 39, pcie_gen: 3, length_mm: 229, price_inr: 20000, series: "RTX 20", memory_type: "GDDR6" },
  { id: "rtx2080-super", name: "NVIDIA GeForce RTX 2080 Super", brand: "NVIDIA", vram_gb: 8, tdp_w: 250, performance_score: 46, pcie_gen: 3, length_mm: 267, price_inr: 26000, series: "RTX 20", memory_type: "GDDR6" },
  { id: "rtx2080-ti", name: "NVIDIA GeForce RTX 2080 Ti", brand: "NVIDIA", vram_gb: 11, tdp_w: 250, performance_score: 55, pcie_gen: 3, length_mm: 267, price_inr: 32000, series: "RTX 20", memory_type: "GDDR6" },
];
