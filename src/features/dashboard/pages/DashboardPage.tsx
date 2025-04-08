import OverviewWrapper from "../components/OverviewWrapper";
import RecentReceiptsCard from "../components/RecentReceiptsCard";

function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 px-4 ">
      <OverviewWrapper />
      <RecentReceiptsCard />
    </div>
  );
}

export default DashboardPage;
