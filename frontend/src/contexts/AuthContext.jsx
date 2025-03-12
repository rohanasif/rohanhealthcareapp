import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import authService from "@/services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const data = await authService.verifyToken(token);
        setUser(data.user);
      } catch (error) {
        console.error("Auth error:", error);
        // Handle token expiration or invalid token
        if (error.response?.status === 401) {
          Cookies.remove("token");
          setUser(null);
          // Only redirect to signin if not already there
          if (!window.location.pathname.startsWith("/auth/")) {
            router.push("/auth/signin");
          }
        }
        setError(error.response?.data?.message || "Authentication failed");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [router]);

  const login = async (userData, token) => {
    try {
      Cookies.set("token", token, { expires: 1 }); // Expires in 1 day
      setUser(userData);
      setError(null);
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to complete login process");
      throw error;
    }
  };

  const logout = async () => {
    try {
      Cookies.remove("token");
      setUser(null);
      setError(null);
      router.push("/auth/signin");
    } catch (error) {
      console.error("Logout error:", error);
      setError("Failed to logout properly");
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    clearError,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
