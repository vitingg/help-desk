import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { api } from "../lib/api";
import type { userType } from "../types/auth/get-user";

interface AuthContextType {
  user: userType | null;
  setUser: Dispatch<SetStateAction<userType | null>>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<userType | null>(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await api.get("/me");
        setUser(response.data);
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    verifyUser();
  }, []);

  const value = { user, setUser, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
