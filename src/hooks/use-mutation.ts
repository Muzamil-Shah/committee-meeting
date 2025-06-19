import {
  useMutation,
  UseMutationResult,
  UseMutationOptions,
} from "@tanstack/react-query";
import axios, { AxiosRequestConfig, Method } from "axios";
import { toast } from "../components/ui/use-toast";
import { useToken } from "../lib/check-token";
import { queryClient } from "../lib/queryClient";
// import { useNavigate } from "react-router-dom";




type MutationConfig<TData = unknown, TError = unknown, TVariables = unknown> = {
  url: string;
  queryKey: string;
  method: Method;
  headers?: Record<string, string>;
} & Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn">;

type MutationContext<TData> = {
  previousData: TData | undefined;
  [key: string]: unknown;
};

export function useCustomMutation<
  TData = unknown,
  TError = unknown,
  TVariables = unknown
>({
  url,
  queryKey,
  method,
  headers = {},
  ...options
}: MutationConfig<TData, TError, TVariables>): UseMutationResult<
  TData,
  TError,
  TVariables
> {
  // const navigate = useNavigate();
  const { getToken } = useToken();
  return useMutation<TData, TError, TVariables, MutationContext<TData>>({
    ...options,
    mutationKey: [queryKey],
    mutationFn: async (variables) => {
      const token = await getToken();      
      const config: AxiosRequestConfig = {
        method,
        url,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          // ...(token ? { "Authorization": `Bearer ${token}` } : {"Authorization": `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaGFzaGFuay50aXdhcmlAYnBhYXNzb2x1dGlvbnMuY29tIiwiZXhwIjoxNzMzMjM0MTQwLCJ1c2VyRGV0YWlscyI6eyJyb2xlIjoiTVJPIiwicm9sZUlkIjo0LCJ1c2VySWQiOjQsInVzZXJuYW1lIjoic2hhc2hhbmsudGl3YXJpQGJwYWFzc29sdXRpb25zLmNvbSIsImRlcGFydG1lbnQiOiJJVCIsImRlcGFydG1lbnRJZCI6MiwiZnVsbE5hbWUiOiJTaGFzaGFuayBUaXdhcmkifSwiaWF0IjoxNzMzMjMxNzQwfQ.iy4lz_f4i5uNHnGkxdx7wDRRtSr7DNYqBRclrdk38Yp9lK-UQ2TlD2qfmqNl_4yHaUYplejLh6t2o8OurMhwzg`}),

          ...headers,
        },
        data: variables,
      };
      
      try {
        const { data } = await axios.request<TData>(config);

        const { statusCode ,responseCode } = data as { statusCode: number; message: string; responseCode: number; };

if ( (statusCode && statusCode === 401) ||(responseCode && responseCode === 401) ) {
  // navigate("/login", { replace: true });
}

        return data;
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          // Optionally handle other Axios errors here
          console.error("API Error:", error.response);
        }
        throw error; // Re-throw for React Query
      }
    },
    onMutate: async (variables) => {
      // Cancel any outgoing re-fetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: [queryKey] });
      // Snapshot the previous value
      const previousData = queryClient.getQueryData<TData>([queryKey]);
      // Optimistically update to the new value
      if (options.onMutate) {
        const context = await options.onMutate(variables);
        queryClient.setQueryData<TData>([queryKey], context as TData);
        return {
          previousData,
          ...(typeof context === "object" && context !== null ? context : {}),
        };
      }
      return { previousData };
    },
    onError: (error, variables, context) => {
      // Rollback to the previous value if there's an error
      if (context?.previousData !== undefined) {
        queryClient.setQueryData<TData>([queryKey], context.previousData);
      }
      // Call the provided onError callback
      if (options.onError) {
        options.onError(error, variables, context);
      }
      // You can add your global error handling here, e.g., showing a toast
      // console.error("An error occurred:", error);
      toast({
        bgColor: "bg-red-500",
        title: error ? String(error) : "An error occurred",
      });
    },
    onSuccess: (data, variables, context) => {
    
      // Invalidate to ensure refetch with fresh data
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    // onSettled: (data, error, variables, context) => {
    //   // Always refetch after error or success to ensure cache is up to date
    //   queryClient.invalidateQueries({ queryKey: [queryKey] });

    //   if (options.onSettled) {
    //     options.onSettled(data, error, variables, context);
    //   }
    // },
  });
}

// Convenience wrappers for specific HTTP methods
export const usePostMutation = <TData = unknown,TError = unknown,TVariables = unknown>(
  config: Omit<MutationConfig<TData, TError, TVariables>, "method">
) =>useCustomMutation<TData, TError, TVariables>({ ...config, method: "POST" });

export const usePutMutation = <TData = unknown,TError = unknown,TVariables = unknown>(
  config: Omit<MutationConfig<TData, TError, TVariables>, "method">
) => useCustomMutation<TData, TError, TVariables>({ ...config, method: "PUT" });

export const useDeleteMutation = <TData = unknown,TError = unknown,TVariables = unknown>(
  config: Omit<MutationConfig<TData, TError, TVariables>, "method">
) =>useCustomMutation<TData, TError, TVariables>({ ...config, method: "DELETE" });
