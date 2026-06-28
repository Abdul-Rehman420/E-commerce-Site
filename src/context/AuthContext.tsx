"use client";

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, phone: string, password: string) => boolean;
  logout: () => void;
  recoverPassword: (email: string) => boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("rt_user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const saveUser = (u: User) => {
    setUser(u);
    localStorage.setItem("rt_user", JSON.stringify(u));
  };

  const login = useCallback((email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("rt_users") || "[]") as User[];
    const found = users.find((u) => u.email === email && u.password === password);
    if (found) { saveUser(found); return true; }
    return false;
  }, []);

  const register = useCallback((name: string, email: string, phone: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("rt_users") || "[]") as User[];
    if (users.find((u) => u.email === email)) return false;
    const newUser: User = { id: "u" + Date.now(), email, name, phone, password, createdAt: new Date().toISOString() };
    users.push(newUser);
    localStorage.setItem("rt_users", JSON.stringify(users));
    saveUser(newUser);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("rt_user");
  }, []);

  const recoverPassword = useCallback((email: string) => {
    const users = JSON.parse(localStorage.getItem("rt_users") || "[]") as User[];
    return users.some((u) => u.email === email);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, recoverPassword, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
