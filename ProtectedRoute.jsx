import { useContext, useEffect } from "react";
import { AuthContext } from "./src/components/context/userContext";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";

// eslint-disable-next-line react/prop-types
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const { publicKey, connected } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user && !connected && !publicKey) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return user ? children : null;
};
