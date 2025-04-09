import OverviewWrapper from "../components/OverviewWrapper";
import RecentReceiptsWrapper from "../components/RecentReceiptsWrapper";

function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 px-4 flex-1 pb-4">
      <OverviewWrapper />
      <RecentReceiptsWrapper className="flex-1" />
    </div>
  );
}

export default DashboardPage;
