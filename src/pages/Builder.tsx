import { useState, useMemo } from "react";
import { useBuildStore, calcBuildPrice, formatINR } from "../engines/buildStore";
import BudgetPlanner from "../components/BudgetPlanner";
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

type ActiveView = "build" | "compare" | "saved" | "budget";

export default function Index() {
  const store = useBuildStore();
  const [activeCategory, setActiveCategory] = useState<ComponentCategory>("cpu");
  const [activeView, setActiveView] = useState<ActiveView>("build");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveName, setSaveName] = useState("");

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
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* ── Top Bar ── */}
      <header className="flex items-center justify-between px-4 py-2 border-b border-border bg-card shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded bg-primary/20 border border-primary/40 flex items-center justify-center">
            <span className="text-primary text-xs font-mono font-bold">PC</span>
          </div>
          <h1 className="text-sm font-mono font-bold text-foreground">
            Smart PC Build Simulator
          </h1>
          <span className="chip-badge text-muted-foreground border-border/50">v1.0</span>
        </div>

        <div className="flex items-center gap-2">
          {(["build", "budget", "compare", "saved"] as ActiveView[]).map((v) => (
            <button
              key={v}
              onClick={() => setActiveView(v)}
              className={`text-xs font-mono px-3 py-1.5 rounded border transition-colors capitalize ${
                activeView === v
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              {v}
              {v === "saved" && store.savedBuilds.length > 0 && (
                <span className="ml-1 bg-primary text-primary-foreground rounded-full px-1 text-xs">
                  {store.savedBuilds.length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="section-label">Total Cost</p>
            <p className="text-sm font-mono font-bold text-primary">{formatINR(totalPrice)}</p>
          </div>
          <button
            onClick={() => { setSaveName(store.currentBuild.name); setShowSaveDialog(true); }}
            className="text-xs font-mono px-3 py-1.5 rounded border border-primary text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
          >
            Save Build
          </button>
          <button
            onClick={store.resetBuild}
            className="text-xs font-mono px-3 py-1.5 rounded border border-border text-muted-foreground hover:border-destructive hover:text-destructive transition-colors"
          >
            Reset
          </button>
        </div>
      </header>

      {/* ── Main Content ── */}
      {activeView === "build" && (
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
                    className={`py-2 text-center transition-colors border-b-2 ${
                      activeCategory === cat.id
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
                      className={`rounded p-2 border cursor-pointer transition-colors ${
                        comp ? "border-border/70 bg-muted/30" : "border-dashed border-border/40"
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
      )}

      {/* ── Saved Builds View ── */}
      {activeView === "saved" && (
        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="text-lg font-mono font-bold mb-4">Saved Builds</h2>
          {store.savedBuilds.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">
              <p className="text-4xl mb-4">💾</p>
              <p>No saved builds yet. Build something and save it!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {store.savedBuilds.map((b) => {
                const perf = estimatePerformance(b);
                return (
                  <div key={b.id} className="glass-card rounded-xl p-4 tech-border">
                    <h3 className="font-mono font-bold text-foreground">{b.name}</h3>
                    <p className="section-label mt-1">{new Date(b.created_at).toLocaleDateString()}</p>
                    <div className="mt-3 space-y-1 text-xs text-muted-foreground font-mono">
                      {b.cpu && <p>CPU: {b.cpu.name}</p>}
                      {b.gpu && <p>GPU: {b.gpu.name}</p>}
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <div>
                        <p className="section-label">Score</p>
                        <p className="font-mono text-primary text-lg font-bold">{perf.overall_score}</p>
                      </div>
                      <p className="font-mono text-primary font-bold">{formatINR(calcBuildPrice(b))}</p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => { store.loadBuild(b); setActiveView("build"); }}
                        className="flex-1 text-xs font-mono py-1.5 rounded border border-primary text-primary hover:bg-primary/10 transition-colors"
                      >
                        Load
                      </button>
                      <button
                        onClick={() => store.deleteSavedBuild(b.id)}
                        className="text-xs font-mono py-1.5 px-3 rounded border border-border text-muted-foreground hover:border-destructive hover:text-destructive transition-colors"
                      >
                        Del
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Budget View ── */}
      {activeView === "budget" && (
        <div className="flex-1 overflow-hidden">
          <BudgetPlanner onLoadBuild={(b) => { store.loadBuild(b); setActiveView("build"); }} />
        </div>
      )}

      {/* ── Compare View ── */}
      {activeView === "compare" && (
        <div className="flex-1 overflow-y-auto p-6">
          <h2 className="text-lg font-mono font-bold mb-4">Compare Builds</h2>
          <div className="grid grid-cols-2 gap-6">
            {[0, 1].map((slot) => {
              const build = store.compareBuilds[slot as 0 | 1];
              const perf = build ? estimatePerformance(build) : null;
              return (
                <div key={slot} className="glass-card rounded-xl p-4 tech-border">
                  <p className="section-label mb-2">Build Slot {slot + 1}</p>
                  {!build ? (
                    <div className="space-y-2">
                      <p className="text-muted-foreground text-sm">Select a saved build to compare</p>
                      {store.savedBuilds.map((b) => (
                        <button
                          key={b.id}
                          onClick={() => store.setCompareBuild(slot as 0 | 1, b)}
                          className="w-full text-left text-xs font-mono px-3 py-2 rounded border border-border hover:border-primary text-foreground transition-colors"
                        >
                          {b.name} — {formatINR(calcBuildPrice(b))}
                        </button>
                      ))}
                      <button
                        onClick={() => store.setCompareBuild(slot as 0 | 1, store.currentBuild)}
                        className="w-full text-xs font-mono px-3 py-2 rounded border border-primary/50 text-primary hover:bg-primary/10 transition-colors"
                      >
                        + Use Current Build
                      </button>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-mono font-bold text-foreground mb-3">{build.name}</h3>
                      {perf && <PerformanceDashboard result={perf} />}
                      <button
                        onClick={() => store.setCompareBuild(slot as 0 | 1, null)}
                        className="mt-3 text-xs font-mono text-muted-foreground hover:text-destructive"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Save Dialog ── */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass-card tech-border rounded-xl p-6 w-96">
            <h3 className="font-mono font-bold text-foreground mb-4">Save Build</h3>
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="Build name..."
              className="w-full bg-muted text-foreground px-3 py-2 rounded border border-border focus:outline-none focus:border-primary font-mono text-sm mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  store.saveBuild(saveName || "My Build");
                  setShowSaveDialog(false);
                }}
                className="flex-1 py-2 rounded bg-primary text-primary-foreground font-mono text-sm font-bold hover:bg-primary/90 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setShowSaveDialog(false)}
                className="px-4 py-2 rounded border border-border text-muted-foreground font-mono text-sm hover:border-primary/50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
