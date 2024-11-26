import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (publicKey) => {
    const walletAddress = publicKey;
    try {
      const response = await fetch(
        "http://localhost:3000/api/authenticate-wallet",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ walletAddress }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        // Store auth state in localStorage
        localStorage.setItem("user", JSON.stringify(data));
        return { success: true, data };
      } else {
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error("Auth error:", error);
      return { success: false, error: "Authentication failed" };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Check for existing auth state on load
  // login(publicKey.toBase58())
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);

  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
