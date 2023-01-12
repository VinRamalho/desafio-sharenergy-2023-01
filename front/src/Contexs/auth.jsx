import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ApiLogin, createSession } from "../services/ApiLogin";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }

    setLoading(false);
  }, []);

  const loginPage = async (login, password, remember) => {
    const response = await createSession(login, password);

    // console.log("login", response.data);

    const userLogad = response.data.user;
    const token = response.data.token;

    ApiLogin.defaults.headers.Authorization = `Bearer ${token}`;

    if (remember) {
      localStorage.setItem("user", JSON.stringify(userLogad));
      localStorage.setItem("token", token);
    }
    if (!remember) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
    setUser(userLogad);
    navigate("/");
  };

  const logout = () => {
    console.log("saiu");
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    ApiLogin.defaults.headers.Authorization = null;
    navigate("/login");
  };
  return (
    <AuthContext.Provider
      value={{ authenticad: !!user, user, loading, loginPage, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
