import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, UserRole } from "@/lib/types";
import { mockUsers } from "@/lib/mockData";

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => Promise<User>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "smartaid_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { /* ignore */ }
    }
  }, []);

  const persist = (u: User | null) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  };

  const login = async (email: string, _password: string) => {
    // Mock JWT auth — match by email or fall back to demo by role hint
    const found =
      mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase()) ||
      mockUsers[2];
    persist(found);
    return found;
  };

  const signup = async (name: string, email: string, _password: string, role: UserRole) => {
    const newUser: User = {
      id: `u_${Date.now()}`,
      name,
      email,
      role,
      avatar: name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase(),
      volunteerId: role === "volunteer" ? "v1" : undefined,
    };
    persist(newUser);
    return newUser;
  };

  const logout = () => persist(null);

  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
