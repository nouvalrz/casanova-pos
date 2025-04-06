import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div>
      <p>Place for Sidebar</p>
      <Outlet />
    </div>
  );
}

export default AppLayout;
