import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios, { AxiosRequestConfig, CancelTokenSource } from "axios";
import { useEffect, useState } from "react";
import { useToken } from "../lib/check-token";
// import { useNavigate } from "react-router-dom";

export const useQueryGenerator = ({
  queryKey,
  url,
  params = null,
  headers = {},
}: {
  queryKey: string;
  url: string;
  params: null | object;
  headers?: object;
}) => {
  const [cancelToken, setCancelToken] = useState<CancelTokenSource | null>(
    null
  );
  const { getToken } = useToken();
  // const navigate = useNavigate();

  useEffect(() => {
    return () => {
      cancelRequest();
    };
  }, []);

  const cancelRequest = () => {
    if (cancelToken) {
      cancelToken.cancel("Operation canceled by cleanup");
    }
  };
  return useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const source = axios.CancelToken.source();
      setCancelToken(source);
      const token = await getToken();
      const config = {
        method: "GET",
        url,
        headers: {
          "Content-Type": "application/json",
          ...(token
            ? { Authorization: `Bearer ${token}` }
            : {
                Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaGFzaGFuay50aXdhcmlAYnBhYXNzb2x1dGlvbnMuY29tIiwiZXhwIjoxNzMzMjM0MTQwLCJ1c2VyRGV0YWlscyI6eyJyb2xlIjoiTVJPIiwicm9sZUlkIjo0LCJ1c2VySWQiOjQsInVzZXJuYW1lIjoic2hhc2hhbmsudGl3YXJpQGJwYWFzc29sdXRpb25zLmNvbSIsImRlcGFydG1lbnQiOiJJVCIsImRlcGFydG1lbnRJZCI6MiwiZnVsbE5hbWUiOiJTaGFzaGFuayBUaXdhcmkifSwiaWF0IjoxNzMzMjMxNzQwfQ.iy4lz_f4i5uNHnGkxdx7wDRRtSr7DNYqBRclrdk38Yp9lK-UQ2TlD2qfmqNl_4yHaUYplejLh6t2o8OurMhwzg`,
              }),
          ...headers,
        },
        params,
        cancelToken: source.token,
      };
      try {
        const { data } = await axios.request(config);

        const { statusCode } = data as { statusCode: number; message: string };

        if (statusCode && statusCode === 401) {
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
  });
};

type UseConditionalQueryParams = {
  queryKey: string;
  url: string;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  enabled: string;
  staleTime?: number | null;
};

export const useConditionalQuery = <T = unknown>({
  queryKey,
  url,
  params = {},
  headers = {},
  enabled,
  staleTime = null,
}: UseConditionalQueryParams): UseQueryResult<T, unknown> => {
  const [cancelToken, setCancelToken] = useState<CancelTokenSource | null>(
    null
  );
  const { getToken } = useToken();
  // const navigate = useNavigate();

  useEffect(() => {
    return () => {
      cancelRequest();
    };
  }, []);

  const cancelRequest = () => {
    if (cancelToken) {
      cancelToken.cancel("Operation canceled by cleanup");
    }
  };

  return useQuery<T>({
    queryKey: [queryKey, { ...params }],
    queryFn: async () => {
      const source = axios.CancelToken.source();
      setCancelToken(source);
      const token = await getToken();

      const config: AxiosRequestConfig = {
        method: "GET",
        url,
        headers: {
          "Content-Type": "application/json",
          ...(token
            ? { Authorization: `Bearer ${token}` }
            : {
                Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJzaGFzaGFuay50aXdhcmlAYnBhYXNzb2x1dGlvbnMuY29tIiwiZXhwIjoxNzMzMjM0MTQwLCJ1c2VyRGV0YWlscyI6eyJyb2xlIjoiTVJPIiwicm9sZUlkIjo0LCJ1c2VySWQiOjQsInVzZXJuYW1lIjoic2hhc2hhbmsudGl3YXJpQGJwYWFzc29sdXRpb25zLmNvbSIsImRlcGFydG1lbnQiOiJJVCIsImRlcGFydG1lbnRJZCI6MiwiZnVsbE5hbWUiOiJTaGFzaGFuayBUaXdhcmkifSwiaWF0IjoxNzMzMjMxNzQwfQ.iy4lz_f4i5uNHnGkxdx7wDRRtSr7DNYqBRclrdk38Yp9lK-UQ2TlD2qfmqNl_4yHaUYplejLh6t2o8OurMhwzg`,
              }),
          ...headers,
        },
        params,
        cancelToken: source.token,
      };

      try {
        const { data } = await axios.request(config);

        const { statusCode } = data as { statusCode: number; message: string };

        if (statusCode && statusCode === 401) {
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
    enabled: !!params[enabled as keyof typeof params],
    staleTime: staleTime ?? 1000 * 60 * 5, // optional: cache settings
  });
};
