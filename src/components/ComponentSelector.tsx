import { useState, useMemo } from "react";
import type { ComponentCategory } from "../data/types";
import type { CPU, GPU, Motherboard, RAM, PSU, Case, Cooler, Storage } from "../data/types";
import { cpuData } from "../data/cpus";
import { gpuData } from "../data/gpus";
import { motherboardData } from "../data/motherboards";
import { ramData } from "../data/ram";
import { psuData } from "../data/psus";
import { caseData } from "../data/cases";
import { coolerData } from "../data/coolers";
import { storageData } from "../data/storage";
import { formatINR } from "../engines/buildStore";

type AnyComponent = CPU | GPU | Motherboard | RAM | PSU | Case | Cooler | Storage;

interface ComponentSelectorProps {
  category: ComponentCategory;
  selectedId: string | null;
  onSelect: (item: AnyComponent) => void;
}

const CATEGORY_META: Record<ComponentCategory, { label: string; color: string }> = {
  cpu: { label: "CPU", color: "hsl(var(--cpu-color))" },
  gpu: { label: "GPU", color: "hsl(var(--gpu-color))" },
  motherboard: { label: "Motherboard", color: "hsl(var(--mobo-color))" },
  ram: { label: "RAM", color: "hsl(var(--ram-color))" },
  psu: { label: "PSU", color: "hsl(var(--psu-color))" },
  case: { label: "Case", color: "hsl(var(--case-color))" },
  cooler: { label: "Cooler", color: "hsl(var(--cooler-color))" },
  storage: { label: "Storage", color: "hsl(var(--storage-color))" },
};

function getDataForCategory(cat: ComponentCategory): AnyComponent[] {
  switch (cat) {
    case "cpu": return cpuData;
    case "gpu": return gpuData;
    case "motherboard": return motherboardData;
    case "ram": return ramData;
    case "psu": return psuData;
    case "case": return caseData;
    case "cooler": return coolerData;
    case "storage": return storageData;
  }
}

function getSecondaryInfo(cat: ComponentCategory, item: AnyComponent): string {
  switch (cat) {
    case "cpu": {
      const c = item as CPU;
      return `${c.cores}C/${c.threads}T · ${c.socket} · ${c.tdp_w}W TDP`;
    }
    case "gpu": {
      const g = item as GPU;
      return `${g.vram_gb}GB ${g.memory_type} · ${g.tdp_w}W · ${g.length_mm}mm`;
    }
    case "motherboard": {
      const m = item as Motherboard;
      return `${m.socket} · ${m.chipset} · ${m.form_factor} · ${m.ram_type}`;
    }
    case "ram": {
      const r = item as RAM;
      return `${r.size_gb}GB ${r.type}-${r.speed_mhz} · CL${r.cas_latency}`;
    }
    case "psu": {
      const p = item as PSU;
      return `${p.wattage}W · ${p.efficiency_rating} · ${p.modular}`;
    }
    case "case": {
      const c = item as Case;
      return `Max GPU ${c.max_gpu_length_mm}mm · ${c.form_factor_support.join("/")}`;
    }
    case "cooler": {
      const c = item as Cooler;
      return `${c.type} · ${c.tdp_rating_w}W · ${c.noise_db}dB`;
    }
    case "storage": {
      const s = item as Storage;
      return `${s.capacity_gb >= 1000 ? (s.capacity_gb / 1000).toFixed(s.capacity_gb % 1000 === 0 ? 0 : 1) + "TB" : s.capacity_gb + "GB"} · ${s.type} · R:${s.read_mbps}MB/s`;
    }
  }
}

export default function ComponentSelector({ category, selectedId, onSelect }: ComponentSelectorProps) {
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");

  const data = useMemo(() => getDataForCategory(category), [category]);
  const meta = CATEGORY_META[category];

  const brands = useMemo(() => {
    const bs = new Set<string>();
    data.forEach((d: any) => d.brand && bs.add(d.brand));
    return ["All", ...Array.from(bs).sort()];
  }, [data]);

  const filtered = useMemo(() => {
    return data.filter((item: any) => {
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchBrand = brandFilter === "All" || item.brand === brandFilter;
      return matchSearch && matchBrand;
    });
  }, [data, search, brandFilter]);

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="p-3 border-b border-border">
        <input
          type="text"
          placeholder={`Search ${meta.label}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-muted text-foreground text-sm px-3 py-2 rounded-md border border-border focus:outline-none focus:border-primary placeholder:text-muted-foreground font-mono"
        />
        {/* Brand filter chips */}
        <div className="flex flex-wrap gap-1 mt-2">
          {brands.slice(0, 8).map((b) => (
            <button
              key={b}
              onClick={() => setBrandFilter(b)}
              className={`text-xs px-2 py-0.5 rounded font-mono border transition-colors ${
                brandFilter === b
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Count */}
      <div className="px-3 py-1.5 section-label">
        {filtered.length} / {data.length} components
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {filtered.map((item: any) => {
          const isSelected = item.id === selectedId;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className={`w-full text-left px-3 py-2.5 border-b border-border/50 transition-all ${
                isSelected
                  ? "bg-primary/10 border-l-2"
                  : "hover:bg-muted/50"
              }`}
              style={isSelected ? { borderLeftColor: meta.color } : {}}
            >
              <div className="flex justify-between items-start gap-2">
                <span className="text-sm text-foreground font-medium leading-tight">{item.name}</span>
                <span className="text-sm font-mono shrink-0" style={{ color: meta.color }}>
                  {formatINR(item.price_inr)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 font-mono">
                {getSecondaryInfo(category, item)}
              </p>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="p-6 text-center text-muted-foreground text-sm">
            No components match your filters
          </div>
        )}
      </div>
    </div>
  );
}
