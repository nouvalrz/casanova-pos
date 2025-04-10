import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

queryClient.getQueryCache().subscribe((event) => {
  const query = event?.query;
  const error = query?.state.error;

  if (query?.state.status === "error" && error) {
    console.error("Global error caught!", error, query.queryKey);
    toast.error(`Terjadi kesalahan: ${error.message}`);
  }
});

export { queryClient };
