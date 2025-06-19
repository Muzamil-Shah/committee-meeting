import { useState, useEffect, useRef } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { toast } from "../components/ui/use-toast";
// import { useToken } from "../lib/check-token";

type ConfigType = AxiosRequestConfig & {
  signal: AbortSignal;
};

// type FetchDataParams = {
//   url: string;
//   method?: "GET" | "POST" | "PUT" | "DELETE";
//   params?: Record<string, unknown>;
// };

type UseApiReturn<T> = {
  data: T | null;
  isLoading: boolean;
  isError: string | null;
  fetchData: (url: string, method?: "GET" | "POST" | "PUT" | "DELETE", params?: Record<string, unknown>) => Promise<void>;
};

const useApi = <T = unknown>(): UseApiReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  // const { getToken } = useToken();

  useEffect(() => {
    return () => {
      cancelRequest();
    };
  }, []);

  const cancelRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const fetchData = async (url: string, method: "GET" | "POST" | "PUT" | "DELETE" = "GET", params?: Record<string, unknown>) => {
    // const token = await getToken();
    // const token = `Bearer token`
    const headers = {
      Authorization: '',
    };
    

    setIsLoading(true);
    setIsError(null);

    abortControllerRef.current = new AbortController();

    const config: ConfigType = {
      method,
      url,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      signal: abortControllerRef.current.signal,
    };

    if (params) {
      if (method === "GET") {
        config.params = params;
      } else {
        config.data = params;
      }
    }

    try {
      const response = await axios(config);
      if (response?.data?.isSuccess === false) {
        setIsError("API request unsuccessful");
        setData(response?.data);
      } else {
        setData(response?.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Error is guaranteed to be an AxiosError
        const errorMessage =
          error.response?.data?.message || error.message || "Error fetching data";
        toast({ title: errorMessage, status: "error" });
        setIsError(errorMessage);
      } else {
        // Handle non-Axios errors (optional)
        const errorMessage = (error as Error).message || "An unknown error occurred";
        toast({ title: errorMessage, status: "error" });
        setIsError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, isError, fetchData };
};

export default useApi;
