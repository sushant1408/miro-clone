import { useMutation } from "convex/react";
import { useCallback, useMemo, useState } from "react";

type Options = {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

const useApiMutation = (mutationFn: any) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState<
    "success" | "error" | "settled" | "pending" | null
  >(null);

  const isSuccess = useMemo(() => status === "success", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);
  const isPending = useMemo(() => status === "pending", [status]);
  const isError = useMemo(() => status === "error", [status]);

  const mutation = useMutation(mutationFn);

  const mutate = useCallback(
    async (payload: any, options?: Options) => {
      try {
        setData(null);
        setError(null);

        setStatus("pending");

        const response = await mutation(payload);
        options?.onSuccess?.(response);
        return response;
      } catch (error) {
        setStatus("error");
        options?.onError?.(error as Error);

        if (options?.throwError) {
          throw error;
        }
      } finally {
        setStatus("settled");

        options?.onSettled?.();
      }
    },
    [mutation]
  );

  return { mutate, data, error, isError, isPending, isSettled, isSuccess };
};

export { useApiMutation };