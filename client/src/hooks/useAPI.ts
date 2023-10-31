import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import type { apiFunc } from "../API";

interface iResponse {
  data: any | null;
  isFetching: boolean;
  error: Error | null;
  isSuccess: boolean;
}
export type callApiFnc<T extends (...args: any) => any> = (
  ...args: Parameters<T> extends [infer A, ...infer R] ? R : never
) => void;

export function useApi<T extends apiFunc<any>>(
  apiFunction: T
): [iResponse, callApiFnc<T>, React.MutableRefObject<boolean>] {
  const [response, setResponse] = useState({
    data: null,
    isFetching: false,
    error: null,
    isSuccess: false,
  });
  const { user } = useAuth();
  const ignoreRef = useRef(false);

  const fetchMethod = (...args: any) => {
    apiFunction(user, ...args)
      .then((res: any) => {
        if (!ignoreRef.current) {
          setResponse({
            error: null,
            data: res,
            isFetching: false,
            isSuccess: true,
          });
        }
      })
      .catch((err: any) => {
        if (!ignoreRef.current) {
          setResponse({
            data: null,
            isSuccess: false,
            isFetching: false,
            error: err,
          });
        }
      });
  };

  return [response, fetchMethod, ignoreRef];
}
