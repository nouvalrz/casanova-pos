import { Navigate, Outlet } from "react-router-dom";
import { useInitStore } from "../store/initStore";
import { ROUTES } from "./paths";
import EntryPage from "../pages/EntryPage";

export const InitGuard = () => {
  const { initialized } = useInitStore();
  return initialized ? <Outlet /> : <EntryPage />;
};

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { supabaseConnector } = useInitStore();
  const session = supabaseConnector.currentSession;

  return session ? (
    <>{children}</>
  ) : (
    <Navigate to={ROUTES.LOGIN_PAGE} replace />
  );
};

export const GuestGuard = ({ children }: { children: React.ReactNode }) => {
  const { supabaseConnector } = useInitStore();
  const session = supabaseConnector.currentSession;

  return !session ? (
    <>{children}</>
  ) : (
    <Navigate to={ROUTES.DASHBOARD_PAGE} replace />
  );
};
