import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

function RootLayout() {
  return (
    <div>
      <Outlet />
      <Toaster position="top-right" />
    </div>
  );
}

export default RootLayout;
