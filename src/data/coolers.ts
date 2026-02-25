import type { Cooler } from "./types";

export const coolerData: Cooler[] = [
  // === FLAGSHIP AIO 360mm ===
  { id: "corsair-h170i-elite", name: "Corsair iCUE H170i Elite LCD XT", brand: "Corsair", type: "AIO 360mm", tdp_rating_w: 300, height_mm: 56, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 37, price_inr: 22000, fan_rpm_max: 2400 },
  { id: "corsair-h150i-elite", name: "Corsair iCUE H150i Elite Capellix", brand: "Corsair", type: "AIO 360mm", tdp_rating_w: 280, height_mm: 56, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 36, price_inr: 18000, fan_rpm_max: 2400 },
  { id: "be-quiet-silent-loop-3-360", name: "be quiet! Silent Loop 3 360mm", brand: "be quiet!", type: "AIO 360mm", tdp_rating_w: 300, height_mm: 56, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 30, price_inr: 19000, fan_rpm_max: 2200 },
  { id: "nzxt-kraken-elite-360", name: "NZXT Kraken Elite 360 RGB", brand: "NZXT", type: "AIO 360mm", tdp_rating_w: 280, height_mm: 56, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 36, price_inr: 20000, fan_rpm_max: 2400 },
  { id: "nzxt-kraken-360", name: "NZXT Kraken 360", brand: "NZXT", type: "AIO 360mm", tdp_rating_w: 280, height_mm: 56, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 36, price_inr: 15000, fan_rpm_max: 2400 },
  { id: "ek-nucleus-360-d-rgb", name: "EK Nucleus 360 D-RGB", brand: "EK", type: "AIO 360mm", tdp_rating_w: 350, height_mm: 56, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 35, price_inr: 17000, fan_rpm_max: 2200 },
  { id: "arctic-liquid-freezer-iii-360", name: "Arctic Liquid Freezer III 360", brand: "Arctic", type: "AIO 360mm", tdp_rating_w: 350, height_mm: 56, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 33, price_inr: 13500, fan_rpm_max: 2000 },
  { id: "coolermaster-masterliquid-360-atmos", name: "Cooler Master MasterLiquid 360 Atmos", brand: "Cooler Master", type: "AIO 360mm", tdp_rating_w: 280, height_mm: 56, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 35, price_inr: 14000, fan_rpm_max: 2400 },
  { id: "thermaltake-floe-ultra-360-rgb", name: "Thermaltake Floe Ultra 360 RGB", brand: "Thermaltake", type: "AIO 360mm", tdp_rating_w: 280, height_mm: 56, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 36, price_inr: 15500, fan_rpm_max: 2400 },

  // === AIO 280mm ===
  { id: "corsair-h115i-elite", name: "Corsair iCUE H115i Elite Capellix", brand: "Corsair", type: "AIO 280mm", tdp_rating_w: 250, height_mm: 56, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 35, price_inr: 15000, fan_rpm_max: 2000 },
  { id: "nzxt-kraken-280", name: "NZXT Kraken 280", brand: "NZXT", type: "AIO 280mm", tdp_rating_w: 250, height_mm: 56, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 35, price_inr: 12500, fan_rpm_max: 2000 },
  { id: "arctic-liquid-freezer-iii-280", name: "Arctic Liquid Freezer III 280", brand: "Arctic", type: "AIO 280mm", tdp_rating_w: 300, height_mm: 56, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 32, price_inr: 11000, fan_rpm_max: 1900 },
  { id: "be-quiet-silent-loop-3-280", name: "be quiet! Silent Loop 3 280mm", brand: "be quiet!", type: "AIO 280mm", tdp_rating_w: 260, height_mm: 56, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 29, price_inr: 16000, fan_rpm_max: 1800 },

  // === AIO 240mm ===
  { id: "corsair-h100i-elite", name: "Corsair iCUE H100i Elite Capellix", brand: "Corsair", type: "AIO 240mm", tdp_rating_w: 220, height_mm: 56, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 35, price_inr: 12000, fan_rpm_max: 2400 },
  { id: "nzxt-kraken-240", name: "NZXT Kraken 240", brand: "NZXT", type: "AIO 240mm", tdp_rating_w: 220, height_mm: 56, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 35, price_inr: 9500, fan_rpm_max: 2000 },
  { id: "ek-nucleus-240-d-rgb", name: "EK Nucleus 240 D-RGB", brand: "EK", type: "AIO 240mm", tdp_rating_w: 250, height_mm: 56, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 34, price_inr: 11000, fan_rpm_max: 2200 },
  { id: "arctic-liquid-freezer-iii-240", name: "Arctic Liquid Freezer III 240", brand: "Arctic", type: "AIO 240mm", tdp_rating_w: 250, height_mm: 56, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 31, price_inr: 8500, fan_rpm_max: 1900 },
  { id: "coolermaster-masterliquid-240-atmos", name: "Cooler Master MasterLiquid 240 Atmos", brand: "Cooler Master", type: "AIO 240mm", tdp_rating_w: 220, height_mm: 56, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 34, price_inr: 8000, fan_rpm_max: 2400 },
  { id: "deepcool-gammaxx-l240-v2", name: "Deepcool GAMMAXX L240 V2", brand: "Deepcool", type: "AIO 240mm", tdp_rating_w: 200, height_mm: 56, socket_support: ["LGA1700", "AM4", "AM5"], noise_db: 37, price_inr: 6000, fan_rpm_max: 1800 },
  { id: "thermaltake-floe-ultra-240", name: "Thermaltake Floe Ultra 240 RGB", brand: "Thermaltake", type: "AIO 240mm", tdp_rating_w: 220, height_mm: 56, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 35, price_inr: 9000, fan_rpm_max: 2200 },
  { id: "id-cooling-zoomflow-240x", name: "ID-Cooling ZoomFlow 240X ARGB", brand: "ID-Cooling", type: "AIO 240mm", tdp_rating_w: 200, height_mm: 56, socket_support: ["LGA1700", "AM4", "AM5"], noise_db: 35, price_inr: 5500, fan_rpm_max: 1800 },
  { id: "antec-neptune-240-argb", name: "Antec Neptune 240 ARGB", brand: "Antec", type: "AIO 240mm", tdp_rating_w: 200, height_mm: 56, socket_support: ["LGA1700", "AM4", "AM5"], noise_db: 37, price_inr: 5000, fan_rpm_max: 1800 },

  // === AIO 120mm ===
  { id: "corsair-h60x", name: "Corsair iCUE H60x Elite RGB", brand: "Corsair", type: "AIO 120mm", tdp_rating_w: 150, height_mm: 27, socket_support: ["LGA1700", "AM4", "AM5"], noise_db: 37, price_inr: 6500, fan_rpm_max: 2400 },
  { id: "coolermaster-masterliquid-120l", name: "Cooler Master MasterLiquid 120L Core", brand: "Cooler Master", type: "AIO 120mm", tdp_rating_w: 150, height_mm: 27, socket_support: ["LGA1700", "AM4", "AM5"], noise_db: 36, price_inr: 4000, fan_rpm_max: 2000 },
  { id: "nzxt-kraken-120", name: "NZXT Kraken 120", brand: "NZXT", type: "AIO 120mm", tdp_rating_w: 150, height_mm: 27, socket_support: ["LGA1700", "AM4", "AM5"], noise_db: 35, price_inr: 6000, fan_rpm_max: 1800 },

  // === AIR COOLERS - High End ===
  { id: "noctua-nh-d15", name: "Noctua NH-D15", brand: "Noctua", type: "Air", tdp_rating_w: 250, height_mm: 165, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 24, price_inr: 10000, fan_rpm_max: 1500 },
  { id: "noctua-nh-d15s", name: "Noctua NH-D15S", brand: "Noctua", type: "Air", tdp_rating_w: 220, height_mm: 160, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 24, price_inr: 9000, fan_rpm_max: 1500 },
  { id: "noctua-nh-u12s", name: "Noctua NH-U12S Redux", brand: "Noctua", type: "Air", tdp_rating_w: 180, height_mm: 158, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 23, price_inr: 6500, fan_rpm_max: 1500 },
  { id: "be-quiet-dark-rock-pro-5", name: "be quiet! Dark Rock Pro 5", brand: "be quiet!", type: "Air", tdp_rating_w: 270, height_mm: 163, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 24, price_inr: 9500, fan_rpm_max: 1500 },
  { id: "be-quiet-dark-rock-4", name: "be quiet! Dark Rock 4", brand: "be quiet!", type: "Air", tdp_rating_w: 200, height_mm: 159, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 24, price_inr: 7000, fan_rpm_max: 1500 },
  { id: "be-quiet-pure-rock-2", name: "be quiet! Pure Rock 2", brand: "be quiet!", type: "Air", tdp_rating_w: 150, height_mm: 155, socket_support: ["LGA1700", "AM4", "AM5"], noise_db: 26, price_inr: 3000, fan_rpm_max: 1500 },
  { id: "thermalright-assassin-king-120-se", name: "Thermalright Assassin King 120 SE ARGB", brand: "Thermalright", type: "Air", tdp_rating_w: 200, height_mm: 157, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 28, price_inr: 3500, fan_rpm_max: 1550 },
  { id: "thermalright-phantom-spirit-120", name: "Thermalright Phantom Spirit 120 EVO", brand: "Thermalright", type: "Air", tdp_rating_w: 260, height_mm: 157, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 27, price_inr: 4500, fan_rpm_max: 1550 },
  { id: "deepcool-ak620", name: "Deepcool AK620", brand: "Deepcool", type: "Air", tdp_rating_w: 260, height_mm: 160, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 28, price_inr: 4500, fan_rpm_max: 1850 },
  { id: "deepcool-ag620", name: "Deepcool AG620 ARGB", brand: "Deepcool", type: "Air", tdp_rating_w: 220, height_mm: 161, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 28, price_inr: 3800, fan_rpm_max: 1850 },
  { id: "coolermaster-hyper-212-black", name: "Cooler Master Hyper 212 Black Edition", brand: "Cooler Master", type: "Air", tdp_rating_w: 180, height_mm: 159, socket_support: ["LGA1700", "AM4", "AM5"], noise_db: 26, price_inr: 3000, fan_rpm_max: 2000 },
  { id: "coolermaster-hyper-622-halo", name: "Cooler Master Hyper 622 Halo", brand: "Cooler Master", type: "Air", tdp_rating_w: 230, height_mm: 157, socket_support: ["LGA1700", "LGA1851", "AM4", "AM5"], noise_db: 30, price_inr: 5000, fan_rpm_max: 2000 },
  { id: "id-cooling-se-224-xt-basic", name: "ID-Cooling SE-224-XT Basic", brand: "ID-Cooling", type: "Air", tdp_rating_w: 180, height_mm: 154, socket_support: ["LGA1700", "AM4", "AM5"], noise_db: 30, price_inr: 1500, fan_rpm_max: 1800 },
  { id: "deepcool-gammaxx-400", name: "Deepcool GAMMAXX 400 V2", brand: "Deepcool", type: "Air", tdp_rating_w: 130, height_mm: 154, socket_support: ["LGA1700", "AM4"], noise_db: 30, price_inr: 1200, fan_rpm_max: 1500 },
  // AMD Wraith coolers
  { id: "amd-wraith-prism", name: "AMD Wraith Prism", brand: "AMD", type: "Air", tdp_rating_w: 105, height_mm: 73, socket_support: ["AM4", "AM5"], noise_db: 38, price_inr: 1800, fan_rpm_max: 2500 },
  { id: "amd-wraith-stealth", name: "AMD Wraith Stealth", brand: "AMD", type: "Air", tdp_rating_w: 65, height_mm: 55, socket_support: ["AM4", "AM5"], noise_db: 32, price_inr: 500, fan_rpm_max: 2200 },
  // Intel Stock
  { id: "intel-laminar-rm1", name: "Intel Laminar RM1", brand: "Intel", type: "Air", tdp_rating_w: 65, height_mm: 59, socket_support: ["LGA1700", "LGA1851"], noise_db: 35, price_inr: 600, fan_rpm_max: 2800 },
];
