import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useInitStore } from "../store/initStore";
import { useNavigate } from "react-router-dom";

function SessionLoadPage() {
  const navigate = useNavigate();
  const { sessionInitialized, initSession } = useInitStore();

  useEffect(() => {
    initSession();
  }, [initSession]);

  useEffect(() => {
    if (!sessionInitialized) {
      return;
    }

    navigate("/");
  }, [sessionInitialized, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Loader className="animate-spin text-4xl" />
      <p>Memuat Session</p>
    </div>
  );
}

export default SessionLoadPage;
