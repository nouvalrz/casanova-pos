import { useEffect } from "react";
import { useInitStore } from "../store/initStore";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { ROUTES } from "../router/paths";

function EntryPage() {
  const navigate = useNavigate();
  const { initialized, init, supabaseConnector } = useInitStore();

  useEffect(() => {
    console.log("entry");
    init();
  }, [init]);

  useEffect(() => {
    if (!initialized) {
      return;
    }

    if (supabaseConnector.currentSession) {
      navigate(ROUTES.DASHBOARD_PAGE);
    } else {
      navigate(ROUTES.LOGIN_PAGE);
    }
  }, [initialized, navigate, supabaseConnector]);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Loader className="animate-spin text-4xl" />
    </div>
  );
}

export default EntryPage;
