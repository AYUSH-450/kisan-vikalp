import React, { createContext, useContext, useState, useEffect } from 'react';

export type Role = 'farmer' | 'officer' | 'admin' | null;

export interface User {
  id: string;
  name: string;
  role: Role;
  centre?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  demoLoginFarmer: () => void;
  demoLoginOfficer: () => void;
  demoLoginAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Check localStorage for simulated persistence
    const saved = localStorage.getItem('smartprocure_auth');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('smartprocure_auth', JSON.stringify(user));
    } else {
      localStorage.removeItem('smartprocure_auth');
    }
  }, [user]);

  const login = (userData: User) => setUser(userData);
  
  const logout = () => setUser(null);

  const demoLoginFarmer = () => login({ id: "F12345", name: "Ramesh Kumar", role: "farmer" });
  const demoLoginOfficer = () => login({ id: "OP-10284", name: "Procurement Officer", role: "officer", centre: "Centre B" });
  const demoLoginAdmin = () => login({ id: "GA-001", name: "Government Admin", role: "admin" });

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      demoLoginFarmer,
      demoLoginOfficer,
      demoLoginAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
