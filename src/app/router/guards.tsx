import { Navigate } from "react-router-dom";
import { useInitStore } from "../store/initStore";
import { ROUTES } from "./paths";
import LoadingPage from "../pages/LoadingPage";

export const InitGuard = ({ children }: { children: React.ReactNode }) => {
  const { databaseInitialized, userInitialized, initDatabase, initUser } =
    useInitStore();

  if (!databaseInitialized) {
    initDatabase();
    return <LoadingPage />;
  }

  if (!userInitialized) {
    initUser();
    return <LoadingPage />;
  }

  return children;
};

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { sessionInitialized, supabaseConnector, initSession } = useInitStore();

  if (!sessionInitialized) {
    initSession();
    return <LoadingPage />;
  }

  if (!supabaseConnector.currentSession) {
    return <Navigate to={ROUTES.LOGIN_PAGE} replace />;
  }

  return children;
};

export const GuestGuard = ({ children }: { children: React.ReactNode }) => {
  const { sessionInitialized, supabaseConnector, initSession } = useInitStore();

  if (!sessionInitialized) {
    initSession();
    return <LoadingPage />;
  }

  if (supabaseConnector.currentSession) {
    return <Navigate to={ROUTES.DASHBOARD_PAGE} replace />;
  }

  return children;
};
