import { Info } from "lucide-react";

function AppEmpty() {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <Info className="text-muted-foreground"/>
      <p className="text-sm text-muted-foreground">Belum ada data</p>
    </div>
  );
}

export default AppEmpty;
