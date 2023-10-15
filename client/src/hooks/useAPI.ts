import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import type { apiFunc } from "../API";

interface iResponse {
  data: any | null;
  isFetching: boolean;
  error: Error | null;
  isSuccess: boolean;
}

export function useApi(apiFunction: apiFunc): [iResponse, any] {
  const [response, setResponse] = useState({
    data: null,
    isFetching: false,
    error: null,
    isSuccess: false,
  });
  const { user } = useAuth();

  const fetchMethod = (args?: any): void => {
    setResponse({
      data: null,
      isFetching: true,
      error: null,
      isSuccess: false,
    });
    console.log("APIFunc", apiFunction);
    apiFunction(user, args)
      .then((res: any) => {
        console.log("response", res);
        setResponse({
          ...response,
          data: res,
          isSuccess: true,
        });
      })
      .catch((err: any) => {
        setResponse({
          ...response,
          isSuccess: false,
          error: err,
        });
      })
      .finally(() => {
        console.log("Finally");
        setResponse({
          ...response,
          isFetching: false,
        });
      });
  };

  return [response, fetchMethod];
}
