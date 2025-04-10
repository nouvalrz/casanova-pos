import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

function RootLayout() {
  return (
    <div>
      <Outlet />
      <Toaster />
    </div>
  );
}

export default RootLayout;
