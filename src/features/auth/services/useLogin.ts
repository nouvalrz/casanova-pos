import { useMutation } from "@tanstack/react-query";
import { useInitStore } from "@/app/store/initStore";

type LoginParams = {
  email: string;
  password: string;
};

export function useLogin() {
  const { supabaseConnector } = useInitStore();
  return useMutation({
    mutationFn: async ({ email, password }: LoginParams) => {
      const { data, error } =
        await supabaseConnector.client.auth.signInWithPassword({
          email,
          password,
        });

      if (error) throw error;
      return data;
    },
  });
}
