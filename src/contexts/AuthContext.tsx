import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "analyst" | "developer" | "viewer";

interface User {
  name: string;
  email: string;
  company: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  loginAsDemo: (role: UserRole) => void;
  signup: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const demoUsers: Record<UserRole, User> = {
  admin: { name: "Alex Morgan", email: "admin@onewatch.ai", company: "Onewatch AI", role: "admin" },
  analyst: { name: "Sarah Chen", email: "analyst@onewatch.ai", company: "Onewatch AI", role: "analyst" },
  developer: { name: "James Wilson", email: "dev@onewatch.ai", company: "Onewatch AI", role: "developer" },
  viewer: { name: "Emily Davis", email: "exec@onewatch.ai", company: "Onewatch AI", role: "viewer" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string) => {
    const found = Object.values(demoUsers).find((u) => u.email === email);
    if (found) {
      setUser(found);
      return true;
    }
    setUser({ name: "Demo User", email, company: "Demo Co", role: "viewer" });
    return true;
  };

  const loginAsDemo = (role: UserRole) => {
    setUser(demoUsers[role]);
  };

  const signup = (newUser: User) => {
    setUser(newUser);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, loginAsDemo, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
