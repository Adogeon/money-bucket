import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import type { apiFunc } from "../API";

interface iResponse<T> {
  data: T | undefined;
  isFetching: boolean;
  error: Error | undefined;
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
    data: undefined,
    isFetching: true,
    error: undefined,
    isSuccess: false,
  });
  const { user } = useAuth();
  const ignoreRef = useRef(false);

  const fetchMethod = (...args: any) => {
    setResponse({
      error: undefined,
      data: undefined,
      isFetching: true,
      isSuccess: false,
    });
    apiFunction(user, ...args)
      .then((res: any) => {
        if (!ignoreRef.current) {
          setResponse({
            error: undefined,
            data: res,
            isFetching: false,
            isSuccess: true,
          });
        }
      })
      .catch((err: any) => {
        if (!ignoreRef.current) {
          setResponse({
            data: undefined,
            isSuccess: false,
            isFetching: false,
            error: err,
          });
        }
      });
  };

  return [response, fetchMethod, ignoreRef];
}
