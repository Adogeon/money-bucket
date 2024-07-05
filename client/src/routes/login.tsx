import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  LoginRequestDAO,
  fetchUserLoginToken,
  iAuthToken,
} from "../API/auth.api";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/Form/LoginForm";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate({ from: "/login" });

  const loginQuery = useMutation<iAuthToken, unknown, LoginRequestDAO, unknown>(
    {
      mutationFn: (input: LoginRequestDAO) => fetchUserLoginToken(input),
      onError: () => {
        throw new Error("Login error");
      },
      onSuccess: (data) => {
        auth.setToken(data.token);
        navigate({ to: "/", replace: true });
      },
    }
  );

  return (
    <div className="p-2">
      <LoginForm submitLogin={(input) => loginQuery.mutate(input)} />;
    </div>
  );
}
