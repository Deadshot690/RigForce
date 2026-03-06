import { estimatePerformance } from "../engines/performanceEngine";
import { calcBuildPrice, formatINR, useBuildStore } from "../engines/buildStore";

export default function BuilderSaved() {
  const store = useBuildStore();
  return (
    <div className="flex-1 overflow-y-auto p-6 h-full bg-background">
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
                    onClick={() => store.loadBuild(b)}
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
  );
}
