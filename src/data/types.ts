// ============================================================
// CORE TYPES FOR PC BUILD SIMULATOR
// ============================================================

export type SocketType =
  | "LGA1700" | "LGA1851" | "AM4" | "AM5" | "LGA1200" | "TR4" | "sTRX4";

export type RAMType = "DDR4" | "DDR5" | "DDR3";

export type FormFactor = "ATX" | "Micro-ATX" | "Mini-ITX" | "E-ATX";

export type StorageInterface = "SATA" | "PCIe 3.0 x4" | "PCIe 4.0 x4" | "PCIe 5.0 x4";

export type CoolerType = "Air" | "AIO 120mm" | "AIO 240mm" | "AIO 280mm" | "AIO 360mm";

export interface CPU {
  id: string;
  name: string;
  brand: "Intel" | "AMD";
  socket: SocketType;
  cores: number;
  threads: number;
  base_clock_ghz: number;
  boost_clock_ghz: number;
  tdp_w: number;
  performance_score: number; // 0–100 normalized heuristic
  supported_ram_type: RAMType[];
  max_ram_speed_mhz: number;
  pcie_gen: number;
  price_inr: number;
  series: string;
  integrated_graphics: boolean;
}

export interface GPU {
  id: string;
  name: string;
  brand: "NVIDIA" | "AMD" | "Intel";
  vram_gb: number;
  tdp_w: number;
  performance_score: number; // 0–100
  pcie_gen: number;
  length_mm: number;
  price_inr: number;
  series: string;
  memory_type: "GDDR6" | "GDDR6X" | "GDDR7" | "HBM2e";
}

export interface Motherboard {
  id: string;
  name: string;
  brand: string;
  socket: SocketType;
  chipset: string;
  form_factor: FormFactor;
  ram_type: RAMType;
  ram_slots: number;
  max_ram_gb: number;
  max_ram_speed_mhz: number;
  pcie_gen: number;
  m2_slots: number;
  sata_ports: number;
  usb_type_c: boolean;
  price_inr: number;
}

export interface RAM {
  id: string;
  name: string;
  brand: string;
  type: RAMType;
  size_gb: number;
  speed_mhz: number;
  cas_latency: number;
  kit_sticks: number;
  price_inr: number;
}

export interface PSU {
  id: string;
  name: string;
  brand: string;
  wattage: number;
  efficiency_rating: "80+ White" | "80+ Bronze" | "80+ Silver" | "80+ Gold" | "80+ Platinum" | "80+ Titanium";
  modular: "Full" | "Semi" | "Non-modular";
  price_inr: number;
}

export interface Case {
  id: string;
  name: string;
  brand: string;
  form_factor_support: FormFactor[];
  max_gpu_length_mm: number;
  max_cooler_height_mm: number;
  drive_bays_35: number;
  drive_bays_25: number;
  price_inr: number;
  has_side_panel_window: boolean;
  front_io_usb_c: boolean;
}

export interface Cooler {
  id: string;
  name: string;
  brand: string;
  type: CoolerType;
  tdp_rating_w: number;
  height_mm: number;
  socket_support: SocketType[];
  noise_db: number;
  price_inr: number;
  fan_rpm_max: number;
}

export interface Storage {
  id: string;
  name: string;
  brand: string;
  capacity_gb: number;
  interface: StorageInterface;
  read_mbps: number;
  write_mbps: number;
  form_factor: "2.5\"" | "3.5\"" | "M.2 2280" | "M.2 2242";
  price_inr: number;
  type: "HDD" | "SATA SSD" | "NVMe SSD";
}

// ============================================================
// BUILD STATE
// ============================================================

export interface PCBuild {
  id: string;
  name: string;
  created_at: number;
  cpu: CPU | null;
  gpu: GPU | null;
  motherboard: Motherboard | null;
  ram: RAM | null;
  psu: PSU | null;
  case: Case | null;
  cooler: Cooler | null;
  storage: Storage[];
}

// ============================================================
// ENGINE OUTPUTS
// ============================================================

export interface ValidationError {
  code: string;
  severity: "error" | "warning";
  component: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
}

export interface PerformanceResult {
  fps_1080p: number;
  fps_1440p: number;
  fps_4k: number;
  productivity_score: number;
  content_creation_score: number;
  gaming_tier: "Entry" | "Mid-Range" | "High-End" | "Enthusiast" | "Extreme";
  bottleneck: {
    detected: boolean;
    type: "CPU-bound" | "GPU-bound" | "RAM-bound" | "None";
    severity_pct: number;
  };
  estimated_total_watt: number;
  recommended_psu_w: number;
  thermal_score: number; // 0-100 (100 = best cooling)
  overall_score: number; // weighted composite 0–100
}

export type ComponentCategory =
  | "cpu"
  | "gpu"
  | "motherboard"
  | "ram"
  | "psu"
  | "case"
  | "cooler"
  | "storage";
