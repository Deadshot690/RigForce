import { useState, useMemo } from "react";
import { generateBuildPresets } from "../engines/budgetEngine";
import { estimatePerformance } from "../engines/performanceEngine";
import { calcBuildPrice, formatINR } from "../engines/buildStore";
import PerformanceDashboard from "./PerformanceDashboard";
import type { PCBuild } from "../data/types";

interface Props {
  onLoadBuild: (build: PCBuild) => void;
}

const PRESET_CONFIGS = [
  { key: "balanced" as const,          label: "⚖ Balanced",      desc: "Best overall performance-per-rupee ratio" },
  { key: "gamingFocused" as const,     label: "🎮 Gaming",        desc: "Maximizes GPU budget for highest FPS" },
  { key: "productivityFocused" as const, label: "💼 Productivity", desc: "Higher CPU & RAM for creative workloads" },
];

const TIER_COLORS: Record<string, string> = {
  Entry:       "hsl(var(--muted-foreground))",
  "Mid-Range": "hsl(var(--ram-color))",
  "High-End":  "hsl(var(--cpu-color))",
  Enthusiast:  "hsl(var(--gpu-color))",
  Extreme:     "hsl(var(--warning))",
};

const BUDGET_PRESETS = [25000, 40000, 60000, 80000, 100000, 150000, 200000, 300000];

export default function BudgetPlanner({ onLoadBuild }: Props) {
  const [budget, setBudget] = useState(80000);
  const [inputValue, setInputValue] = useState("80000");
  const [activePreset, setActivePreset] = useState<"balanced" | "gamingFocused" | "productivityFocused">("balanced");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const presets = useMemo(() => generateBuildPresets(budget), [budget]);
  const MIN_BUDGET = 30000;
  const MAX_BUDGET = 500000;

  function handleBudgetInput(val: string) {
    setInputValue(val);
    const n = parseInt(val.replace(/[^\d]/g, ""), 10);
    if (!isNaN(n) && n >= MIN_BUDGET && n <= MAX_BUDGET) {
      setBudget(n);
    }
  }

  const activeSuggestion = presets[activePreset];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* ── Header ── */}
      <div className="shrink-0 p-5 border-b border-border bg-card">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary text-lg">₹</div>
          <div>
            <h2 className="font-mono font-bold text-foreground text-lg">Budget Planner</h2>
            <p className="text-xs text-muted-foreground">Auto-generates optimized builds within your budget</p>
          </div>
        </div>

        {/* Budget input */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary font-mono font-bold">₹</span>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => handleBudgetInput(e.target.value)}
              placeholder="Enter budget in INR"
              className="w-full bg-muted text-foreground font-mono font-bold text-lg pl-7 pr-4 py-2.5 rounded-lg border border-border focus:outline-none focus:border-primary"
            />
          </div>
          <div className="text-right shrink-0">
            <p className="section-label">Budget</p>
            <p className="text-primary font-mono font-bold">{formatINR(budget)}</p>
          </div>
        </div>

        {/* Slider */}
        <div className="mb-3">
          <input
            type="range"
            min={MIN_BUDGET}
            max={MAX_BUDGET}
            step={5000}
            value={budget}
            onChange={(e) => {
              const val = Number(e.target.value);
              setBudget(val);
              setInputValue(val.toString());
            }}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${((budget - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100}%, hsl(var(--muted)) ${((budget - MIN_BUDGET) / (MAX_BUDGET - MIN_BUDGET)) * 100}%, hsl(var(--muted)) 100%)`
            }}
          />
          <div className="flex justify-between mt-1">
            <span className="section-label">₹30K</span>
            <span className="section-label">₹5L</span>
          </div>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap gap-1.5">
          {BUDGET_PRESETS.map((b) => (
            <button
              key={b}
              onClick={() => { setBudget(b); setInputValue(b.toString()); }}
              className={`text-xs font-mono px-2.5 py-1 rounded border transition-colors ${
                budget === b
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-muted-foreground hover:border-primary/50"
              }`}
            >
              {formatINR(b)}
            </button>
          ))}
        </div>
      </div>

      {/* ── Build Type Selector ── */}
      <div className="shrink-0 grid grid-cols-3 border-b border-border">
        {PRESET_CONFIGS.map(({ key, label, desc }) => {
          const s = presets[key];
          return (
            <button
              key={key}
              onClick={() => setActivePreset(key)}
              className={`p-3 text-left border-b-2 transition-all ${
                activePreset === key
                  ? "border-primary bg-primary/5"
                  : "border-transparent hover:bg-muted/30"
              }`}
            >
              <p className={`text-xs font-mono font-bold ${activePreset === key ? "text-primary" : "text-foreground"}`}>
                {label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 hidden md:block">{desc}</p>
              {s && (
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color: TIER_COLORS[s.tier] }}
                  >
                    {s.tier}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {s.fps1080p}fps
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-y-auto">
        {!activeSuggestion ? (
          <div className="p-8 text-center text-muted-foreground">
            <p className="text-3xl mb-3">💸</p>
            <p className="font-mono">Budget too low for a complete build.</p>
            <p className="text-sm mt-1">Minimum ~{formatINR(30000)} needed.</p>
          </div>
        ) : (
          <div className="p-4 space-y-4 animate-slide-in">
            {/* Summary bar */}
            <div className="flex items-center justify-between p-3 rounded-xl tech-border bg-muted/20">
              <div>
                <p className="section-label">Total Cost</p>
                <p className="text-xl font-mono font-bold text-primary">
                  {formatINR(activeSuggestion.totalPrice)}
                  <span className="text-xs text-muted-foreground ml-2">
                    ({Math.round(activeSuggestion.budgetUtilization * 100)}% of budget)
                  </span>
                </p>
              </div>
              <div className="text-right">
                <p className="section-label">Overall Score</p>
                <p className="text-2xl font-mono font-bold" style={{ color: TIER_COLORS[activeSuggestion.tier] }}>
                  {activeSuggestion.overallScore}
                  <span className="text-sm text-muted-foreground">/100</span>
                </p>
              </div>
            </div>

            {/* Compatibility badge */}
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono"
              style={{
                background: activeSuggestion.validationPassed
                  ? "hsl(var(--success)/0.1)"
                  : "hsl(var(--destructive)/0.1)",
                border: `1px solid ${activeSuggestion.validationPassed
                  ? "hsl(var(--success)/0.3)"
                  : "hsl(var(--destructive)/0.3)"}`,
                color: activeSuggestion.validationPassed
                  ? "hsl(var(--success))"
                  : "hsl(var(--destructive))",
              }}
            >
              {activeSuggestion.validationPassed ? "✔ All compatibility checks passed" : "⚠ Some compatibility issues detected"}
            </div>

            {/* Component breakdown */}
            <div>
              <p className="section-label mb-2">Component Breakdown</p>
              <div className="space-y-1.5">
                {[
                  { label: "CPU",         comp: activeSuggestion.build.cpu,         color: "--cpu-color" },
                  { label: "GPU",         comp: activeSuggestion.build.gpu,         color: "--gpu-color" },
                  { label: "Motherboard", comp: activeSuggestion.build.motherboard, color: "--mobo-color" },
                  { label: "RAM",         comp: activeSuggestion.build.ram,         color: "--ram-color" },
                  { label: "PSU",         comp: activeSuggestion.build.psu,         color: "--psu-color" },
                  { label: "Case",        comp: activeSuggestion.build.case,        color: "--case-color" },
                  { label: "Cooler",      comp: activeSuggestion.build.cooler,      color: "--cooler-color" },
                  { label: "Storage",     comp: activeSuggestion.build.storage[0],  color: "--storage-color" },
                ].map(({ label, comp, color }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/30 border border-border/40"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: `hsl(var(${color}))` }}
                      />
                      <span className="section-label w-20">{label}</span>
                      <span className="text-xs text-foreground font-medium truncate max-w-[200px]">
                        {comp ? (comp as any).name : <span className="text-muted-foreground/50">Not available</span>}
                      </span>
                    </div>
                    {comp && (
                      <span
                        className="text-xs font-mono font-bold shrink-0"
                        style={{ color: `hsl(var(${color}))` }}
                      >
                        {formatINR((comp as any).price_inr)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Budget utilization bar */}
            <div>
              <div className="flex justify-between mb-1">
                <span className="section-label">Budget Utilization</span>
                <span className="font-mono text-xs text-foreground">
                  {formatINR(activeSuggestion.totalPrice)} / {formatINR(budget)}
                </span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.min(activeSuggestion.budgetUtilization * 100, 100)}%`,
                    background: activeSuggestion.budgetUtilization > 0.95
                      ? "hsl(var(--warning))"
                      : "hsl(var(--primary))",
                  }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="section-label text-xs">
                  {formatINR(budget - activeSuggestion.totalPrice)} remaining
                </span>
                <span className="section-label text-xs">
                  {Math.round(activeSuggestion.budgetUtilization * 100)}% used
                </span>
              </div>
            </div>

            {/* Engine notes */}
            {activeSuggestion.notes.length > 0 && (
              <div className="rounded-lg border border-border/50 p-3">
                <p className="section-label mb-2">Engine Notes</p>
                {activeSuggestion.notes.map((n, i) => (
                  <p key={i} className="text-xs text-muted-foreground font-mono mb-1">
                    › {n}
                  </p>
                ))}
              </div>
            )}

            {/* Performance preview */}
            <div>
              <p className="section-label mb-2">Performance Preview</p>
              <PerformanceDashboard result={estimatePerformance(activeSuggestion.build)} />
            </div>

            {/* Load CTA */}
            <button
              onClick={() => onLoadBuild(activeSuggestion.build)}
              className="w-full py-3 rounded-xl font-mono font-bold text-sm transition-all animate-pulse-glow"
              style={{
                background: "hsl(var(--primary))",
                color: "hsl(var(--primary-foreground))",
              }}
            >
              → Load This Build into Simulator
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
