import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
import api from "../services/api";

const AuthContext = createContext(null);

function readSavedAuthentication() {
  const saved = localStorage.getItem("bookwiseAuth");

  if (!saved) {
    return {
      user: null,
      token: null,
    };
  }

  try {
    return JSON.parse(saved);
  } catch {
    localStorage.removeItem("bookwiseAuth");

    return {
      user: null,
      token: null,
    };
  }
}

export function AuthProvider({ children }) {
  const initial = readSavedAuthentication();

  const [user, setUser] = useState(initial.user);
  const [token, setToken] = useState(initial.token);

  function saveAuthentication(data) {
    setUser(data.user);
    setToken(data.token);

    localStorage.setItem(
      "bookwiseAuth",
      JSON.stringify({
        user: data.user,
        token: data.token,
      })
    );
  }

  async function register(formData) {
    const response = await api.post("/auth/register", formData);
    saveAuthentication(response.data);
  }

  async function login(formData) {
    const response = await api.post("/auth/login", formData);
    saveAuthentication(response.data);
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("bookwiseAuth");
  }

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      register,
      login,
      logout,
    }),
    [user, token]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider.");
  }

  return context;
}