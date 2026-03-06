import BudgetPlanner from "../components/BudgetPlanner";
import { useBuildStore } from "../engines/buildStore";

export default function BuilderBudget() {
  const store = useBuildStore();
  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      <BudgetPlanner onLoadBuild={(b) => store.loadBuild(b)} />
    </div>
  );
}
