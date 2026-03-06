import { Link, Outlet, useLocation } from "react-router-dom";

export default function Builder() {
  const location = useLocation();
  return (
    <div className="flex flex-col h-screen pt-14 bg-background overflow-hidden">
      {/* Tab navigation below main navbar */}
      <div className="flex justify-center items-center gap-2 px-4 py-2 border-b border-border bg-card z-10 relative">
        <Link
          to="/build"
          tabIndex={0}
          className={`text-xs font-mono px-4 py-2 rounded-t border-b-2 transition-colors capitalize focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:z-20 ${location.pathname === "/build"
              ? "border-primary text-primary bg-primary/10 z-20"
              : "border-transparent text-muted-foreground hover:border-primary/40 hover:bg-muted/10"
            }`}
        >
          Build
        </Link>
        <Link
          to="/build/budget"
          tabIndex={0}
          className={`text-xs font-mono px-4 py-2 rounded-t border-b-2 transition-colors capitalize focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:z-20 ${location.pathname === "/build/budget"
              ? "border-primary text-primary bg-primary/10 z-20"
              : "border-transparent text-muted-foreground hover:border-primary/40 hover:bg-muted/10"
            }`}
        >
          Budget
        </Link>
        <Link
          to="/build/compare"
          tabIndex={0}
          className={`text-xs font-mono px-4 py-2 rounded-t border-b-2 transition-colors capitalize focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:z-20 ${location.pathname === "/build/compare"
              ? "border-primary text-primary bg-primary/10 z-20"
              : "border-transparent text-muted-foreground hover:border-primary/40 hover:bg-muted/10"
            }`}
        >
          Compare
        </Link>
        <Link
          to="/build/saved"
          tabIndex={0}
          className={`text-xs font-mono px-4 py-2 rounded-t border-b-2 transition-colors capitalize focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:z-20 ${location.pathname === "/build/saved"
              ? "border-primary text-primary bg-primary/10 z-20"
              : "border-transparent text-muted-foreground hover:border-primary/40 hover:bg-muted/10"
            }`}
        >
          Saved
        </Link>
      </div>
      <div className="flex-1 min-h-0">
        <Outlet />
      </div>
    </div>
  );
}
