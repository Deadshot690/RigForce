import type { PSU } from "./types";

export const psuData: PSU[] = [
  // === 1600W+ (HEDT / Extreme) ===
  { id: "seasonic-prime-tx-1600", name: "Seasonic Prime TX-1600", brand: "Seasonic", wattage: 1600, efficiency_rating: "80+ Titanium", modular: "Full", price_inr: 42000 },
  { id: "corsair-ax1600i", name: "Corsair AX1600i", brand: "Corsair", wattage: 1600, efficiency_rating: "80+ Titanium", modular: "Full", price_inr: 48000 },
  { id: "be-quiet-dark-power-13-1600", name: "be quiet! Dark Power 13 1600W", brand: "be quiet!", wattage: 1600, efficiency_rating: "80+ Titanium", modular: "Full", price_inr: 45000 },

  // === 1200W–1400W ===
  { id: "seasonic-prime-px-1300", name: "Seasonic Prime PX-1300", brand: "Seasonic", wattage: 1300, efficiency_rating: "80+ Platinum", modular: "Full", price_inr: 32000 },
  { id: "corsair-ax1200i", name: "Corsair AX1200i", brand: "Corsair", wattage: 1200, efficiency_rating: "80+ Titanium", modular: "Full", price_inr: 36000 },
  { id: "be-quiet-dark-power-13-1200", name: "be quiet! Dark Power 13 1200W", brand: "be quiet!", wattage: 1200, efficiency_rating: "80+ Titanium", modular: "Full", price_inr: 30000 },
  { id: "asus-rog-thor-1200", name: "ASUS ROG Thor 1200W Platinum II", brand: "ASUS", wattage: 1200, efficiency_rating: "80+ Platinum", modular: "Full", price_inr: 26000 },

  // === 1000W ===
  { id: "seasonic-prime-px-1000", name: "Seasonic Prime PX-1000", brand: "Seasonic", wattage: 1000, efficiency_rating: "80+ Platinum", modular: "Full", price_inr: 22000 },
  { id: "seasonic-prime-gx-1000", name: "Seasonic Focus GX-1000", brand: "Seasonic", wattage: 1000, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 18000 },
  { id: "corsair-hx1000i", name: "Corsair HX1000i", brand: "Corsair", wattage: 1000, efficiency_rating: "80+ Platinum", modular: "Full", price_inr: 20000 },
  { id: "corsair-rm1000x", name: "Corsair RM1000x", brand: "Corsair", wattage: 1000, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 16500 },
  { id: "evga-supernova-1000-g7", name: "EVGA SuperNOVA 1000 G7", brand: "EVGA", wattage: 1000, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 17000 },
  { id: "be-quiet-dark-power-pro-12-1000", name: "be quiet! Dark Power Pro 12 1000W", brand: "be quiet!", wattage: 1000, efficiency_rating: "80+ Platinum", modular: "Full", price_inr: 23000 },
  { id: "asus-rog-strix-1000g", name: "ASUS ROG Strix 1000G", brand: "ASUS", wattage: 1000, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 18500 },
  { id: "msi-mpg-a1000g-pcie5", name: "MSI MPG A1000G PCIE5", brand: "MSI", wattage: 1000, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 17500 },
  { id: "gigabyte-p1000gm", name: "Gigabyte P1000GM", brand: "Gigabyte", wattage: 1000, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 15000 },

  // === 850W ===
  { id: "seasonic-focus-gx-850", name: "Seasonic Focus GX-850", brand: "Seasonic", wattage: 850, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 13500 },
  { id: "seasonic-focus-px-850", name: "Seasonic Focus PX-850", brand: "Seasonic", wattage: 850, efficiency_rating: "80+ Platinum", modular: "Full", price_inr: 16000 },
  { id: "corsair-hx850i", name: "Corsair HX850i", brand: "Corsair", wattage: 850, efficiency_rating: "80+ Platinum", modular: "Full", price_inr: 18000 },
  { id: "corsair-rm850x", name: "Corsair RM850x", brand: "Corsair", wattage: 850, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 13000 },
  { id: "be-quiet-pure-power-12-850", name: "be quiet! Pure Power 12 M 850W", brand: "be quiet!", wattage: 850, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 12000 },
  { id: "evga-supernova-850-g6", name: "EVGA SuperNOVA 850 G6", brand: "EVGA", wattage: 850, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 12500 },
  { id: "msi-mpg-a850gf", name: "MSI MPG A850GF", brand: "MSI", wattage: 850, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 11500 },

  // === 750W ===
  { id: "seasonic-focus-gx-750", name: "Seasonic Focus GX-750", brand: "Seasonic", wattage: 750, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 11000 },
  { id: "corsair-rm750x", name: "Corsair RM750x", brand: "Corsair", wattage: 750, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 10500 },
  { id: "corsair-cx750", name: "Corsair CX750", brand: "Corsair", wattage: 750, efficiency_rating: "80+ Bronze", modular: "Semi", price_inr: 7500 },
  { id: "be-quiet-straight-power-11-750", name: "be quiet! Straight Power 11 750W", brand: "be quiet!", wattage: 750, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 12000 },
  { id: "evga-supernova-750-g7", name: "EVGA SuperNOVA 750 G7", brand: "EVGA", wattage: 750, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 11000 },
  { id: "msi-mpg-a750gf", name: "MSI MPG A750GF", brand: "MSI", wattage: 750, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 9500 },
  { id: "asus-tuf-750b", name: "ASUS TUF Gaming 750B", brand: "ASUS", wattage: 750, efficiency_rating: "80+ Bronze", modular: "Full", price_inr: 8000 },
  { id: "gigabyte-p750gm", name: "Gigabyte P750GM", brand: "Gigabyte", wattage: 750, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 8500 },
  { id: "antec-hcg-750", name: "Antec HCG 750 Gold", brand: "Antec", wattage: 750, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 8000 },
  { id: "deepcool-pq750m", name: "Deepcool PQ750M", brand: "Deepcool", wattage: 750, efficiency_rating: "80+ Gold", modular: "Semi", price_inr: 7000 },

  // === 650W ===
  { id: "seasonic-focus-gx-650", name: "Seasonic Focus GX-650", brand: "Seasonic", wattage: 650, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 9500 },
  { id: "corsair-rm650x", name: "Corsair RM650x", brand: "Corsair", wattage: 650, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 9000 },
  { id: "corsair-cx650", name: "Corsair CX650", brand: "Corsair", wattage: 650, efficiency_rating: "80+ Bronze", modular: "Semi", price_inr: 6500 },
  { id: "be-quiet-pure-power-12-650", name: "be quiet! Pure Power 12 M 650W", brand: "be quiet!", wattage: 650, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 9000 },
  { id: "evga-650-bq", name: "EVGA 650 BQ", brand: "EVGA", wattage: 650, efficiency_rating: "80+ Bronze", modular: "Semi", price_inr: 5500 },
  { id: "msi-mpg-a650gf", name: "MSI MPG A650GF", brand: "MSI", wattage: 650, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 8500 },
  { id: "asus-tuf-650b", name: "ASUS TUF Gaming 650B", brand: "ASUS", wattage: 650, efficiency_rating: "80+ Bronze", modular: "Full", price_inr: 7000 },
  { id: "coolermaster-mwe-650-gold", name: "Cooler Master MWE 650 Gold", brand: "Cooler Master", wattage: 650, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 7500 },
  { id: "deepcool-pq650m", name: "Deepcool PQ650M", brand: "Deepcool", wattage: 650, efficiency_rating: "80+ Gold", modular: "Semi", price_inr: 6000 },

  // === 550W ===
  { id: "seasonic-focus-gx-550", name: "Seasonic Focus GX-550", brand: "Seasonic", wattage: 550, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 8000 },
  { id: "corsair-rm550x", name: "Corsair RM550x", brand: "Corsair", wattage: 550, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 7500 },
  { id: "corsair-cx550", name: "Corsair CX550", brand: "Corsair", wattage: 550, efficiency_rating: "80+ Bronze", modular: "Semi", price_inr: 5000 },
  { id: "coolermaster-mwe-550-gold", name: "Cooler Master MWE 550 Gold", brand: "Cooler Master", wattage: 550, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 6000 },
  { id: "be-quiet-pure-power-12-550", name: "be quiet! Pure Power 12 M 550W", brand: "be quiet!", wattage: 550, efficiency_rating: "80+ Gold", modular: "Full", price_inr: 7500 },
  { id: "msi-mag-a550bn", name: "MSI MAG A550BN", brand: "MSI", wattage: 550, efficiency_rating: "80+ Bronze", modular: "Non-modular", price_inr: 4500 },
  { id: "gigabyte-p550b", name: "Gigabyte P550B", brand: "Gigabyte", wattage: 550, efficiency_rating: "80+ Bronze", modular: "Non-modular", price_inr: 4000 },
  { id: "deepcool-pq550m", name: "Deepcool PQ550M", brand: "Deepcool", wattage: 550, efficiency_rating: "80+ Gold", modular: "Semi", price_inr: 5200 },

  // === 450W & Below (Budget) ===
  { id: "corsair-cv450", name: "Corsair CV450", brand: "Corsair", wattage: 450, efficiency_rating: "80+ Bronze", modular: "Non-modular", price_inr: 3500 },
  { id: "coolermaster-mwe-450-bronze", name: "Cooler Master MWE 450 Bronze", brand: "Cooler Master", wattage: 450, efficiency_rating: "80+ Bronze", modular: "Non-modular", price_inr: 3000 },
  { id: "antec-vp450p", name: "Antec VP450P", brand: "Antec", wattage: 450, efficiency_rating: "80+ White", modular: "Non-modular", price_inr: 2800 },
  { id: "deepcool-pe400", name: "Deepcool PE400", brand: "Deepcool", wattage: 400, efficiency_rating: "80+ White", modular: "Non-modular", price_inr: 2500 },
  { id: "coolermaster-elite-400", name: "Cooler Master Elite 400W", brand: "Cooler Master", wattage: 400, efficiency_rating: "80+ White", modular: "Non-modular", price_inr: 2200 },
];
