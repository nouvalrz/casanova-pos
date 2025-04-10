import ExpensesCard from "./ExpensesCard";
import ProfitCard from "./ProfitCard";
import RevenueCard from "./RevenueCard";
import TotalReceiptCard from "./TotalReceiptCard";

function OverviewWrapper() {
  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      <RevenueCard />
      <ProfitCard />
      <ExpensesCard />
      <TotalReceiptCard />
    </div>
  );
}

export default OverviewWrapper;
