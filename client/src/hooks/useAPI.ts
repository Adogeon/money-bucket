import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import type { apiFunc } from "../API";

interface iResponse<T> {
  data: T | null;
  isFetching: boolean;
  error: Error | null;
  isSuccess: boolean;
}
export type callApiFnc<T extends (...args: any) => Promise<any>> = (
  ...args: Parameters<T> extends [infer A, ...infer R] ? R : never
) => void;
type returnApiFnc<T extends (...args: any) => Promise<any>> = Awaited<
  ReturnType<T>
>;

export function useApi<T extends apiFunc<any>>(
  apiFunction: T
): [
  iResponse<returnApiFnc<T>>,
  callApiFnc<T>,
  React.MutableRefObject<boolean>
] {
  const [response, setResponse] = useState({
    data: null,
    isFetching: true,
    error: null,
    isSuccess: false,
  });
  const { user } = useAuth();
  const ignoreRef = useRef(false);

  const fetchMethod = (...args: any) => {
    setResponse({
      error: null,
      data: null,
      isFetching: true,
      isSuccess: false,
    });
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
