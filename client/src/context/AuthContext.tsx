import { useState, useContext, createContext } from "react";
import type { ReactNode } from "react";
import { fetchUserLoginToken, fetchUserRegisterToken } from "../API/auth.api";

const authContext = createContext<iUseAuth | undefined>(undefined);

interface iUseAuth {
  user: string | null;
  isLogin: boolean;
  errors: string[];
  isLoading: boolean;
  isCached: boolean;
  signin: (username: string, password: string) => void;
  register: (username: string, password: string, email: string) => void;
  loadCache: () => void;
}
const useProvideAuth = (): iUseAuth => {
  const [user, setUser] = useState<string | null>(null);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCached, setIsCached] = useState(
    localStorage.getItem("user") !== null
  );
  const [isLogin, setIsLogin] = useState(false);

  function signin(username: string, password: string): void {
    setIsLoading(true);
    fetchUserLoginToken(username, password)
      .then((res) => {
        res
          ?.json()
          .then((user) => {
            setUser(user);
            localStorage.setItem("user", user);
            setIsCached(true);
            setIsLogin(true);
          })
          .catch((err) => {
            throw new Error(err);
          });
      })
      .catch((err) => {
        setErrors(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function register(username: string, password: string, email: string): void {
    setIsLoading(true);
    fetchUserRegisterToken(username, password, email)
      .then((res) => {
        res?.json().then(
          (user) => {
            setUser(user);
            localStorage.setItem("user", user);
            setIsCached(true);
            setIsLogin(true);
          },
          (err) => {
            throw new Error(err);
          }
        );
      })
      .catch((err) => {
        setErrors(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function loadCache(): void {
    setUser(localStorage.getItem("user"));
    setIsLogin(true);
  }

  return {
    user,
    errors,
    isLoading,
    isCached,
    isLogin,
    signin,
    register,
    loadCache,
  };
};

interface ProvideAuthProps {
  children: ReactNode;
}
export function ProvideAuth({ children }: ProvideAuthProps): JSX.Element {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = (): iUseAuth => {
  const result = useContext(authContext);
  if (result !== undefined) {
    return result;
  } else {
    throw new Error("Problem when loading auth context");
  }
};
