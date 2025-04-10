import { Loader } from "lucide-react";

function LoadingPage({ caption }: { caption?: string }) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col gap-3 items-center">
        <Loader className="animate-spin text-4xl" />
        {caption && <p className="text-sm text-muted-foreground">{caption}</p>}
      </div>
    </div>
  );
}

export default LoadingPage;
