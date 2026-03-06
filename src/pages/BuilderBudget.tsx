import { useNavigate } from "react-router-dom";
import { useBuildStore } from "../engines/buildStore";
import BudgetPlanner from "../components/BudgetPlanner";
import type { PCBuild } from "../data/types";

export default function BuilderBudget() {
  const store = useBuildStore();
  const navigate = useNavigate();

  function handleLoadBuild(b: PCBuild) {
    try {
      localStorage.setItem("current_build", JSON.stringify(b));
    } catch { }
    store.loadBuild(b);
    navigate("/build");
  }

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <BudgetPlanner onLoadBuild={handleLoadBuild} />
    </div>
  );
}
