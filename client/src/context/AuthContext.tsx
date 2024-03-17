import React, { useState, useContext, createContext, useEffect } from "react";
import type { ReactNode } from "react";

export interface AuthContext {
  isAuthenticated: boolean;
  setToken: (token: string | null) => void;
  token: string | null;
}

const AuthContext = createContext<AuthContext | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = React.useState<string | null>(null);
  const isAuthenticated = !!token;
  return (
    <AuthContext.Provider value={{ isAuthenticated, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
