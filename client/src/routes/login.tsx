import { MutationFunction, useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { fetchUserLoginToken, iAuthToken } from "../API/auth.api";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import type { FormEvent } from "react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const auth = useAuth();
  const navigate = useNavigate({ from: "/login" });

  const loginQuery = useMutation<
    iAuthToken,
    unknown,
    { username: string; password: string },
    unknown
  >({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => fetchUserLoginToken(username, password),
    onError: () => {
      throw new Error("Login error");
    },
    onSuccess: (data) => {
      auth.setToken(data.token);
      navigate({ to: "/dashboard" });
    },
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginQuery.mutate({ username, password });
  };

  return (
    <div className="p-2">
      <div>You must log in!</div>
      <div className="h-2" />
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="border p-1 px-2 rounded"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-1 px-2 rounded"
        />
        <button
          type="submit"
          className="text-sm bg-blue-500 text-white border inline-block py-1 px-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
