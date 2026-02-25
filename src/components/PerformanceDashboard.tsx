import type { PerformanceResult } from "../data/types";

interface Props {
  result: PerformanceResult;
}

function ScoreBar({ value, max = 100, color }: { value: number; max?: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}

function StatBlock({ label, value, unit, color }: { label: string; value: string | number; unit?: string; color?: string }) {
  return (
    <div className="bg-muted/50 rounded-lg p-3 border border-border/50">
      <p className="section-label mb-1">{label}</p>
      <p className="text-xl font-mono font-bold" style={{ color: color || "hsl(var(--primary))" }}>
        {value}<span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>
      </p>
    </div>
  );
}

const TIER_COLORS: Record<string, string> = {
  Entry: "hsl(var(--muted-foreground))",
  "Mid-Range": "hsl(var(--ram-color))",
  "High-End": "hsl(var(--cpu-color))",
  Enthusiast: "hsl(var(--gpu-color))",
  Extreme: "hsl(var(--warning))",
};

export default function PerformanceDashboard({ result }: Props) {
  const { fps_1080p, fps_1440p, fps_4k, productivity_score, content_creation_score,
    gaming_tier, bottleneck, estimated_total_watt, recommended_psu_w,
    thermal_score, overall_score } = result;

  const tierColor = TIER_COLORS[gaming_tier] || "hsl(var(--primary))";

  return (
    <div className="space-y-4">
      {/* Overall Score */}
      <div className="glass-card rounded-xl p-4 tech-border text-center">
        <p className="section-label mb-2">Overall Build Score</p>
        <div className="text-5xl font-mono font-bold glow-text" style={{ color: "hsl(var(--primary))" }}>
          {overall_score}
          <span className="text-xl text-muted-foreground">/100</span>
        </div>
        <div className="mt-2">
          <span
            className="chip-badge"
            style={{ color: tierColor, borderColor: tierColor }}
          >
            {gaming_tier}
          </span>
        </div>
      </div>

      {/* FPS Grid */}
      <div>
        <p className="section-label mb-2">Estimated Gaming FPS (AAA Titles)</p>
        <div className="grid grid-cols-3 gap-2">
          <StatBlock label="1080p" value={fps_1080p} unit="FPS" color="hsl(var(--primary))" />
          <StatBlock label="1440p" value={fps_1440p} unit="FPS" color="hsl(var(--gpu-color))" />
          <StatBlock label="4K" value={fps_4k} unit="FPS" color="hsl(var(--cooler-color))" />
        </div>
        <p className="section-label mt-1 text-xs">Heuristic model — actual results vary by game engine</p>
      </div>

      {/* Scores */}
      <div className="space-y-3">
        <div>
          <div className="flex justify-between mb-1">
            <span className="section-label">Productivity Score</span>
            <span className="font-mono text-sm text-foreground">{productivity_score}/100</span>
          </div>
          <ScoreBar value={productivity_score} color="hsl(var(--cpu-color))" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="section-label">Content Creation Score</span>
            <span className="font-mono text-sm text-foreground">{content_creation_score}/100</span>
          </div>
          <ScoreBar value={content_creation_score} color="hsl(var(--gpu-color))" />
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="section-label">Thermal Score</span>
            <span className="font-mono text-sm text-foreground">{thermal_score}/100</span>
          </div>
          <ScoreBar value={thermal_score} color="hsl(var(--cooler-color))" />
        </div>
      </div>

      {/* Bottleneck */}
      {bottleneck.detected && (
        <div className="rounded-lg p-3 border" style={{
          borderColor: "hsl(var(--warning) / 0.5)",
          background: "hsl(var(--warning) / 0.08)"
        }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-mono" style={{ color: "hsl(var(--warning))" }}>
              ⚠ {bottleneck.type} Bottleneck Detected
            </span>
          </div>
          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${bottleneck.severity_pct}%`, background: "hsl(var(--warning))" }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{bottleneck.severity_pct}% severity</p>
        </div>
      )}

      {/* Power */}
      <div className="grid grid-cols-2 gap-2">
        <StatBlock label="Est. Load" value={estimated_total_watt} unit="W" color="hsl(var(--psu-color))" />
        <StatBlock label="Recommended PSU" value={recommended_psu_w} unit="W" color="hsl(var(--warning))" />
      </div>
    </div>
  );
}
