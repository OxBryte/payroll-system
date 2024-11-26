import { createContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const revalidateUser = useCallback(async () => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setLoading(false);
      return false;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      const walletAddress =
        parsedUser.walletAddress || parsedUser.user?.walletAddress;

      if (!walletAddress) {
        throw new Error("No wallet address found");
      }

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
        // Update user in context and localStorage
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data));
        return true;
      } else {
        // Clear invalid user data
        setUser(null);
        localStorage.removeItem("user");
        return false;
      }
    } catch (error) {
      console.error("Revalidation error:", error);
      // Clear invalid user data
      setUser(null);
      localStorage.removeItem("user");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

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

  // Revalidate on initial mount
  // useEffect(() => {
  //   revalidateUser();
  // }, [revalidateUser]);

  const useRevalidate = () => {
    const [isRevalidating, setIsRevalidating] = useState(false);

    const triggerRevalidate = async () => {
      setIsRevalidating(true);
      await revalidateUser();
      setIsRevalidating(false);
    };

    return { triggerRevalidate, isRevalidating };
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
    <AuthContext.Provider
      value={{ user, login, logout, loading, revalidateUser, useRevalidate }}
    >
      {children}
    </AuthContext.Provider>
  );
};
