import type { Storage } from "./types";

export const storageData: Storage[] = [
  // === PCIe 5.0 NVMe ===
  { id: "samsung-990-pro-4tb", name: "Samsung 990 Pro 4TB NVMe", brand: "Samsung", capacity_gb: 4000, interface: "PCIe 4.0 x4", read_mbps: 7450, write_mbps: 6900, form_factor: "M.2 2280", price_inr: 28000, type: "NVMe SSD" },
  { id: "wd-black-sn850x-4tb", name: "WD Black SN850X 4TB NVMe", brand: "WD", capacity_gb: 4000, interface: "PCIe 4.0 x4", read_mbps: 7300, write_mbps: 6600, form_factor: "M.2 2280", price_inr: 26000, type: "NVMe SSD" },
  { id: "crucial-t705-4tb", name: "Crucial T705 4TB PCIe 5.0", brand: "Crucial", capacity_gb: 4000, interface: "PCIe 5.0 x4", read_mbps: 14500, write_mbps: 12700, form_factor: "M.2 2280", price_inr: 42000, type: "NVMe SSD" },
  { id: "corsair-mp700-pro-4tb", name: "Corsair MP700 Pro 4TB PCIe 5.0", brand: "Corsair", capacity_gb: 4000, interface: "PCIe 5.0 x4", read_mbps: 14000, write_mbps: 12000, form_factor: "M.2 2280", price_inr: 38000, type: "NVMe SSD" },

  // === PCIe 4.0 NVMe (2TB) ===
  { id: "samsung-990-pro-2tb", name: "Samsung 990 Pro 2TB NVMe", brand: "Samsung", capacity_gb: 2000, interface: "PCIe 4.0 x4", read_mbps: 7450, write_mbps: 6900, form_factor: "M.2 2280", price_inr: 15000, type: "NVMe SSD" },
  { id: "samsung-980-pro-2tb", name: "Samsung 980 Pro 2TB NVMe", brand: "Samsung", capacity_gb: 2000, interface: "PCIe 4.0 x4", read_mbps: 7000, write_mbps: 5100, form_factor: "M.2 2280", price_inr: 12500, type: "NVMe SSD" },
  { id: "wd-black-sn850x-2tb", name: "WD Black SN850X 2TB NVMe", brand: "WD", capacity_gb: 2000, interface: "PCIe 4.0 x4", read_mbps: 7300, write_mbps: 6600, form_factor: "M.2 2280", price_inr: 13500, type: "NVMe SSD" },
  { id: "seagate-firecuda-530-2tb", name: "Seagate FireCuda 530 2TB NVMe", brand: "Seagate", capacity_gb: 2000, interface: "PCIe 4.0 x4", read_mbps: 7300, write_mbps: 6900, form_factor: "M.2 2280", price_inr: 12000, type: "NVMe SSD" },
  { id: "crucial-p5-plus-2tb", name: "Crucial P5 Plus 2TB NVMe", brand: "Crucial", capacity_gb: 2000, interface: "PCIe 4.0 x4", read_mbps: 6600, write_mbps: 5000, form_factor: "M.2 2280", price_inr: 11000, type: "NVMe SSD" },
  { id: "corsair-mp600-pro-2tb", name: "Corsair MP600 Pro 2TB NVMe", brand: "Corsair", capacity_gb: 2000, interface: "PCIe 4.0 x4", read_mbps: 7000, write_mbps: 6800, form_factor: "M.2 2280", price_inr: 13000, type: "NVMe SSD" },
  { id: "adata-xpg-gammix-s70-blade-2tb", name: "ADATA XPG Gammix S70 Blade 2TB", brand: "ADATA", capacity_gb: 2000, interface: "PCIe 4.0 x4", read_mbps: 7400, write_mbps: 6400, form_factor: "M.2 2280", price_inr: 11500, type: "NVMe SSD" },
  { id: "gigabyte-aorus-gen4-2tb", name: "Gigabyte AORUS Gen4 2TB NVMe", brand: "Gigabyte", capacity_gb: 2000, interface: "PCIe 4.0 x4", read_mbps: 5000, write_mbps: 4400, form_factor: "M.2 2280", price_inr: 10000, type: "NVMe SSD" },

  // === PCIe 4.0 NVMe (1TB) ===
  { id: "samsung-990-pro-1tb", name: "Samsung 990 Pro 1TB NVMe", brand: "Samsung", capacity_gb: 1000, interface: "PCIe 4.0 x4", read_mbps: 7450, write_mbps: 6900, form_factor: "M.2 2280", price_inr: 8500, type: "NVMe SSD" },
  { id: "samsung-980-pro-1tb", name: "Samsung 980 Pro 1TB NVMe", brand: "Samsung", capacity_gb: 1000, interface: "PCIe 4.0 x4", read_mbps: 7000, write_mbps: 5100, form_factor: "M.2 2280", price_inr: 7000, type: "NVMe SSD" },
  { id: "wd-black-sn850x-1tb", name: "WD Black SN850X 1TB NVMe", brand: "WD", capacity_gb: 1000, interface: "PCIe 4.0 x4", read_mbps: 7300, write_mbps: 6300, form_factor: "M.2 2280", price_inr: 7500, type: "NVMe SSD" },
  { id: "seagate-firecuda-530-1tb", name: "Seagate FireCuda 530 1TB NVMe", brand: "Seagate", capacity_gb: 1000, interface: "PCIe 4.0 x4", read_mbps: 7300, write_mbps: 6000, form_factor: "M.2 2280", price_inr: 7200, type: "NVMe SSD" },
  { id: "crucial-t500-1tb", name: "Crucial T500 1TB NVMe", brand: "Crucial", capacity_gb: 1000, interface: "PCIe 4.0 x4", read_mbps: 7300, write_mbps: 6500, form_factor: "M.2 2280", price_inr: 6800, type: "NVMe SSD" },
  { id: "corsair-mp600-pro-1tb", name: "Corsair MP600 Pro 1TB NVMe", brand: "Corsair", capacity_gb: 1000, interface: "PCIe 4.0 x4", read_mbps: 7000, write_mbps: 5500, form_factor: "M.2 2280", price_inr: 7000, type: "NVMe SSD" },
  { id: "adata-xpg-gammix-s70-1tb", name: "ADATA XPG Gammix S70 Blade 1TB", brand: "ADATA", capacity_gb: 1000, interface: "PCIe 4.0 x4", read_mbps: 7400, write_mbps: 5500, form_factor: "M.2 2280", price_inr: 6500, type: "NVMe SSD" },
  { id: "kingston-fury-renegade-1tb", name: "Kingston Fury Renegade 1TB NVMe", brand: "Kingston", capacity_gb: 1000, interface: "PCIe 4.0 x4", read_mbps: 7300, write_mbps: 6000, form_factor: "M.2 2280", price_inr: 6200, type: "NVMe SSD" },

  // === PCIe 3.0 NVMe (Budget) ===
  { id: "samsung-970-evo-plus-2tb", name: "Samsung 970 Evo Plus 2TB NVMe", brand: "Samsung", capacity_gb: 2000, interface: "PCIe 3.0 x4", read_mbps: 3500, write_mbps: 3300, form_factor: "M.2 2280", price_inr: 8000, type: "NVMe SSD" },
  { id: "samsung-970-evo-plus-1tb", name: "Samsung 970 Evo Plus 1TB NVMe", brand: "Samsung", capacity_gb: 1000, interface: "PCIe 3.0 x4", read_mbps: 3500, write_mbps: 3300, form_factor: "M.2 2280", price_inr: 4500, type: "NVMe SSD" },
  { id: "samsung-970-evo-plus-500gb", name: "Samsung 970 Evo Plus 500GB NVMe", brand: "Samsung", capacity_gb: 500, interface: "PCIe 3.0 x4", read_mbps: 3500, write_mbps: 2300, form_factor: "M.2 2280", price_inr: 2800, type: "NVMe SSD" },
  { id: "wd-blue-sn570-1tb", name: "WD Blue SN570 1TB NVMe", brand: "WD", capacity_gb: 1000, interface: "PCIe 3.0 x4", read_mbps: 3500, write_mbps: 3000, form_factor: "M.2 2280", price_inr: 4000, type: "NVMe SSD" },
  { id: "wd-blue-sn570-500gb", name: "WD Blue SN570 500GB NVMe", brand: "WD", capacity_gb: 500, interface: "PCIe 3.0 x4", read_mbps: 3500, write_mbps: 2300, form_factor: "M.2 2280", price_inr: 2500, type: "NVMe SSD" },
  { id: "crucial-p3-plus-2tb", name: "Crucial P3 Plus 2TB NVMe", brand: "Crucial", capacity_gb: 2000, interface: "PCIe 3.0 x4", read_mbps: 5000, write_mbps: 4200, form_factor: "M.2 2280", price_inr: 7500, type: "NVMe SSD" },
  { id: "crucial-p3-1tb", name: "Crucial P3 1TB NVMe", brand: "Crucial", capacity_gb: 1000, interface: "PCIe 3.0 x4", read_mbps: 3500, write_mbps: 3000, form_factor: "M.2 2280", price_inr: 3800, type: "NVMe SSD" },
  { id: "kingston-nv2-1tb", name: "Kingston NV2 1TB NVMe", brand: "Kingston", capacity_gb: 1000, interface: "PCIe 3.0 x4", read_mbps: 3500, write_mbps: 2100, form_factor: "M.2 2280", price_inr: 3200, type: "NVMe SSD" },
  { id: "kingston-nv2-2tb", name: "Kingston NV2 2TB NVMe", brand: "Kingston", capacity_gb: 2000, interface: "PCIe 3.0 x4", read_mbps: 3500, write_mbps: 2800, form_factor: "M.2 2280", price_inr: 5500, type: "NVMe SSD" },
  { id: "adata-xpg-sx8200-pro-1tb", name: "ADATA XPG SX8200 Pro 1TB NVMe", brand: "ADATA", capacity_gb: 1000, interface: "PCIe 3.0 x4", read_mbps: 3500, write_mbps: 3000, form_factor: "M.2 2280", price_inr: 3500, type: "NVMe SSD" },

  // === SATA SSD ===
  { id: "samsung-870-evo-4tb", name: "Samsung 870 Evo 4TB SATA SSD", brand: "Samsung", capacity_gb: 4000, interface: "SATA", read_mbps: 560, write_mbps: 530, form_factor: "2.5\"", price_inr: 20000, type: "SATA SSD" },
  { id: "samsung-870-evo-2tb", name: "Samsung 870 Evo 2TB SATA SSD", brand: "Samsung", capacity_gb: 2000, interface: "SATA", read_mbps: 560, write_mbps: 530, form_factor: "2.5\"", price_inr: 11000, type: "SATA SSD" },
  { id: "samsung-870-evo-1tb", name: "Samsung 870 Evo 1TB SATA SSD", brand: "Samsung", capacity_gb: 1000, interface: "SATA", read_mbps: 560, write_mbps: 530, form_factor: "2.5\"", price_inr: 6000, type: "SATA SSD" },
  { id: "samsung-870-evo-500gb", name: "Samsung 870 Evo 500GB SATA SSD", brand: "Samsung", capacity_gb: 500, interface: "SATA", read_mbps: 560, write_mbps: 530, form_factor: "2.5\"", price_inr: 3500, type: "SATA SSD" },
  { id: "crucial-mx500-2tb", name: "Crucial MX500 2TB SATA SSD", brand: "Crucial", capacity_gb: 2000, interface: "SATA", read_mbps: 560, write_mbps: 510, form_factor: "2.5\"", price_inr: 9500, type: "SATA SSD" },
  { id: "crucial-mx500-1tb", name: "Crucial MX500 1TB SATA SSD", brand: "Crucial", capacity_gb: 1000, interface: "SATA", read_mbps: 560, write_mbps: 510, form_factor: "2.5\"", price_inr: 5000, type: "SATA SSD" },
  { id: "wd-blue-sata-2tb", name: "WD Blue 2TB SATA SSD", brand: "WD", capacity_gb: 2000, interface: "SATA", read_mbps: 560, write_mbps: 520, form_factor: "2.5\"", price_inr: 8500, type: "SATA SSD" },
  { id: "wd-blue-sata-1tb", name: "WD Blue 1TB SATA SSD", brand: "WD", capacity_gb: 1000, interface: "SATA", read_mbps: 560, write_mbps: 520, form_factor: "2.5\"", price_inr: 4500, type: "SATA SSD" },
  { id: "kingston-a400-480gb", name: "Kingston A400 480GB SATA SSD", brand: "Kingston", capacity_gb: 480, interface: "SATA", read_mbps: 500, write_mbps: 450, form_factor: "2.5\"", price_inr: 2200, type: "SATA SSD" },
  { id: "adata-su800-1tb", name: "ADATA SU800 1TB SATA SSD", brand: "ADATA", capacity_gb: 1000, interface: "SATA", read_mbps: 560, write_mbps: 520, form_factor: "2.5\"", price_inr: 4000, type: "SATA SSD" },

  // === HDD ===
  { id: "seagate-barracuda-8tb", name: "Seagate BarraCuda 8TB HDD", brand: "Seagate", capacity_gb: 8000, interface: "SATA", read_mbps: 220, write_mbps: 220, form_factor: "3.5\"", price_inr: 13000, type: "HDD" },
  { id: "seagate-barracuda-4tb", name: "Seagate BarraCuda 4TB HDD", brand: "Seagate", capacity_gb: 4000, interface: "SATA", read_mbps: 190, write_mbps: 190, form_factor: "3.5\"", price_inr: 6500, type: "HDD" },
  { id: "seagate-barracuda-2tb", name: "Seagate BarraCuda 2TB HDD", brand: "Seagate", capacity_gb: 2000, interface: "SATA", read_mbps: 180, write_mbps: 180, form_factor: "3.5\"", price_inr: 3500, type: "HDD" },
  { id: "seagate-barracuda-1tb", name: "Seagate BarraCuda 1TB HDD", brand: "Seagate", capacity_gb: 1000, interface: "SATA", read_mbps: 180, write_mbps: 180, form_factor: "3.5\"", price_inr: 2200, type: "HDD" },
  { id: "wd-red-plus-8tb", name: "WD Red Plus 8TB NAS HDD", brand: "WD", capacity_gb: 8000, interface: "SATA", read_mbps: 215, write_mbps: 215, form_factor: "3.5\"", price_inr: 17000, type: "HDD" },
  { id: "wd-blue-4tb", name: "WD Blue 4TB HDD", brand: "WD", capacity_gb: 4000, interface: "SATA", read_mbps: 180, write_mbps: 180, form_factor: "3.5\"", price_inr: 6200, type: "HDD" },
  { id: "wd-blue-2tb", name: "WD Blue 2TB HDD", brand: "WD", capacity_gb: 2000, interface: "SATA", read_mbps: 180, write_mbps: 180, form_factor: "3.5\"", price_inr: 3200, type: "HDD" },
  { id: "wd-blue-1tb", name: "WD Blue 1TB HDD", brand: "WD", capacity_gb: 1000, interface: "SATA", read_mbps: 150, write_mbps: 150, form_factor: "3.5\"", price_inr: 2000, type: "HDD" },
  { id: "toshiba-x300-8tb", name: "Toshiba X300 8TB HDD", brand: "Toshiba", capacity_gb: 8000, interface: "SATA", read_mbps: 250, write_mbps: 250, form_factor: "3.5\"", price_inr: 14000, type: "HDD" },
  { id: "toshiba-p300-2tb", name: "Toshiba P300 2TB HDD", brand: "Toshiba", capacity_gb: 2000, interface: "SATA", read_mbps: 150, write_mbps: 150, form_factor: "3.5\"", price_inr: 2800, type: "HDD" },
];
