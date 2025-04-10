import { useEffect } from "react";
import { useInitStore } from "../store/initStore";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

function EntryPage() {
  const navigate = useNavigate();
  const { databaseInitialized: initialized, initDatabase: init } =
    useInitStore();

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    if (!initialized) {
      return;
    }

    navigate("/");
  }, [initialized, navigate]);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Loader className="animate-spin text-4xl" />
      <p>Memuat Data</p>
    </div>
  );
}

export default EntryPage;
