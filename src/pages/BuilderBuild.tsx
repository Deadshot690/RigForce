import { useState, useMemo } from "react";
import { useBuildStore, calcBuildPrice, formatINR } from "../engines/buildStore";
import { validateBuild } from "../engines/compatibilityEngine";
import { estimatePerformance } from "../engines/performanceEngine";
import ComponentSelector from "../components/ComponentSelector";
import PerformanceDashboard from "../components/PerformanceDashboard";
import PCPreview3D from "../components/PCPreview3D";
import type { ComponentCategory } from "../data/types";
import type { CPU, GPU, Motherboard, RAM, PSU, Case, Cooler, Storage } from "../data/types";

const CATEGORIES: { id: ComponentCategory; label: string; icon: string; colorVar: string }[] = [
  { id: "cpu", label: "CPU", icon: "⚡", colorVar: "--cpu-color" },
  { id: "gpu", label: "GPU", icon: "🎮", colorVar: "--gpu-color" },
  { id: "motherboard", label: "Motherboard", icon: "🔌", colorVar: "--mobo-color" },
  { id: "ram", label: "RAM", icon: "💾", colorVar: "--ram-color" },
  { id: "psu", label: "PSU", icon: "🔋", colorVar: "--psu-color" },
  { id: "case", label: "Case", icon: "🖥", colorVar: "--case-color" },
  { id: "cooler", label: "Cooler", icon: "❄", colorVar: "--cooler-color" },
  { id: "storage", label: "Storage", icon: "💿", colorVar: "--storage-color" },
];

export default function BuilderBuild() {
  const store = useBuildStore();
  const [activeCategory, setActiveCategory] = useState<ComponentCategory>("cpu");
  const validation = useMemo(() => validateBuild(store.currentBuild), [store.currentBuild]);
  const performance = useMemo(() => estimatePerformance(store.currentBuild), [store.currentBuild]);
  const totalPrice = useMemo(() => calcBuildPrice(store.currentBuild), [store.currentBuild]);

  function handleSelect(category: ComponentCategory, item: any) {
    switch (category) {
      case "cpu": store.setCPU(item as CPU); break;
      case "gpu": store.setGPU(item as GPU); break;
      case "motherboard": store.setMotherboard(item as Motherboard); break;
      case "ram": store.setRAM(item as RAM); break;
      case "psu": store.setPSU(item as PSU); break;
      case "case": store.setCase(item as Case); break;
      case "cooler": store.setCooler(item as Cooler); break;
      case "storage": store.addStorage(item as Storage); break;
    }
  }

  function getSelectedId(cat: ComponentCategory): string | null {
    switch (cat) {
      case "cpu": return store.currentBuild.cpu?.id ?? null;
      case "gpu": return store.currentBuild.gpu?.id ?? null;
      case "motherboard": return store.currentBuild.motherboard?.id ?? null;
      case "ram": return store.currentBuild.ram?.id ?? null;
      case "psu": return store.currentBuild.psu?.id ?? null;
      case "case": return store.currentBuild.case?.id ?? null;
      case "cooler": return store.currentBuild.cooler?.id ?? null;
      case "storage": return null;
    }
  }

  const totalIssues = validation.errors.length + validation.warnings.length;

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* ...Top Bar and Save/Reset buttons can be added here if needed... */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT: Category Nav + Selector */}
        <div className="w-72 border-r border-border flex flex-col shrink-0 overflow-hidden">
          {/* Category tabs */}
          <div className="grid grid-cols-4 border-b border-border shrink-0">
            {CATEGORIES.map((cat) => {
              const selected = getSelectedId(cat.id) !== null || (cat.id === "storage" && store.currentBuild.storage.length > 0);
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`py-2 text-center transition-colors border-b-2 ${activeCategory === cat.id
                      ? "border-primary"
                      : "border-transparent"
                    }`}
                >
                  <div className="text-lg">{cat.icon}</div>
                  <div className={`text-xs font-mono ${selected ? "text-foreground" : "text-muted-foreground"}`}>
                    {cat.label}
                  </div>
                  {selected && (
                    <div className="w-1.5 h-1.5 rounded-full mx-auto mt-0.5" style={{ background: `hsl(var(${cat.colorVar}))` }} />
                  )}
                </button>
              );
            })}
          </div>
          {/* Component list */}
          <div className="flex-1 overflow-hidden">
            <ComponentSelector
              category={activeCategory}
              selectedId={getSelectedId(activeCategory)}
              onSelect={(item) => handleSelect(activeCategory, item)}
            />
          </div>
        </div>

        {/* CENTER: 3D Preview + Build Summary */}
        <div className="flex-1 flex flex-col overflow-hidden border-r border-border">
          {/* 3D Preview */}
          <div className="flex-1 min-h-0">
            <PCPreview3D build={store.currentBuild} tier={performance.gaming_tier} />
          </div>

          {/* Build Summary strip */}
          <div className="shrink-0 border-t border-border bg-card p-3">
            <div className="grid grid-cols-4 gap-2">
              {CATEGORIES.slice(0, 8).map((cat) => {
                const isStorage = cat.id === "storage";
                const comp = isStorage
                  ? store.currentBuild.storage[0]
                  : (store.currentBuild as any)[cat.id];
                return (
                  <div
                    key={cat.id}
                    className={`rounded p-2 border cursor-pointer transition-colors ${comp ? "border-border/70 bg-muted/30" : "border-dashed border-border/40"
                      }`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    <p className="section-label text-xs">{cat.icon} {cat.label}</p>
                    {comp ? (
                      <p className="text-xs text-foreground truncate mt-0.5 font-medium">{(comp as any).name?.split(" ").slice(0, 4).join(" ")}</p>
                    ) : (
                      <p className="text-xs text-muted-foreground/50 mt-0.5">Not selected</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT: Validation + Performance */}
        <div className="w-80 shrink-0 flex flex-col overflow-hidden">
          {/* Validation */}
          {totalIssues > 0 && (
            <div className="shrink-0 p-3 border-b border-border max-h-40 overflow-y-auto">
              <p className="section-label mb-2">
                Compatibility — {validation.errors.length} errors, {validation.warnings.length} warnings
              </p>
              {[...validation.errors, ...validation.warnings].map((e, i) => (
                <div
                  key={i}
                  className="flex gap-2 text-xs mb-1.5 p-2 rounded"
                  style={{
                    background: e.severity === "error" ? "hsl(var(--destructive)/0.1)" : "hsl(var(--warning)/0.08)",
                    borderLeft: `2px solid ${e.severity === "error" ? "hsl(var(--destructive))" : "hsl(var(--warning))"}`,
                  }}
                >
                  <span>{e.severity === "error" ? "✖" : "⚠"}</span>
                  <span className="text-foreground/80">{e.message}</span>
                </div>
              ))}
            </div>
          )}
          {validation.isValid && totalIssues === 0 && store.currentBuild.cpu && (
            <div className="shrink-0 p-3 border-b border-border">
              <div className="flex items-center gap-2 text-xs font-mono" style={{ color: "hsl(var(--success))" }}>
                <span>✔</span> All compatibility checks passed
              </div>
            </div>
          )}
          {/* Performance Dashboard */}
          <div className="flex-1 overflow-y-auto p-3">
            <PerformanceDashboard result={performance} />
          </div>
        </div>
      </div>
    </div>
  );
}
