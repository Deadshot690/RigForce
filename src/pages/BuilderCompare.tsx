import { estimatePerformance } from "../engines/performanceEngine";
import { calcBuildPrice, formatINR, useBuildStore } from "../engines/buildStore";
import PerformanceDashboard from "../components/PerformanceDashboard";

export default function BuilderCompare() {
  const store = useBuildStore();
  return (
    <div className="flex-1 overflow-y-auto p-6 h-full bg-background">
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
  );
}
