import { Navigate } from "react-router-dom";
import { useInitStore } from "../store/initStore";
import { ROUTES } from "./paths";
import LoadingPage from "../pages/LoadingPage";
import { toast } from "sonner";

export const InitGuard = ({ children }: { children: React.ReactNode }) => {
  const { databaseInitialized, userInitialized, initDatabase, initUser } =
    useInitStore();

  if (!databaseInitialized) {
    initDatabase();
    return <LoadingPage caption="Memuat Data" />;
  }

  if (!userInitialized) {
    initUser();
    return <LoadingPage caption="Memuat Akun" />;
  }

  return children;
};

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { sessionInitialized, supabaseConnector, initSession } = useInitStore();

  if (!sessionInitialized) {
    initSession();
    return <LoadingPage caption="Mengecek Akun" />;
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
    return <LoadingPage caption="Mengecek Akun" />;
  }

  if (supabaseConnector.currentSession) {
    return <Navigate to={ROUTES.DASHBOARD_PAGE} replace />;
  }

  return children;
};

export const OwnerGuard = ({ children }: { children: React.ReactNode }) => {
  const { isOwner } = useInitStore();

  if (!isOwner()) {
    toast.warning("Fitur tersebut hanya untuk Owner");
    return <Navigate to={ROUTES.DASHBOARD_PAGE} replace />;
  }

  return children;
};
