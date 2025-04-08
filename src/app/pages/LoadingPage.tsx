import { Loader } from "lucide-react";
import React from "react";

function LoadingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Loader className="animate-spin text-4xl" />
    </div>
  );
}

export default LoadingPage;
