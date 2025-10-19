// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { checkAuth, logout, refreshToken } from "../services/authService";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  logoutUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  logoutUser: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      const ok = await checkAuth();
      setIsAuthenticated(ok);
    })();

    // optional auto-refresh every 10 min
    const interval = setInterval(async () => {
      const refreshed = await refreshToken();
      if (refreshed) setIsAuthenticated(true);
    //}, 10 * 60 * 1000); // 10 min
    }, 55 * 1000); // 55 sec

    return () => clearInterval(interval);
  }, []);

  const logoutUser = async () => {
    await logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}
