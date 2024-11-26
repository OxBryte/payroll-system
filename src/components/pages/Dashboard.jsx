import DashboardSidebar from "../ui/DashboardSidebar";

import PayrollControlPanel from "../features/PayrollControlPanel";
import PayrollEmployees from "../features/PayrollEmployees";
import { AuthContext } from "../context/userContext";
import { useContext, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/util";

// Dashboard Component
const Dashboard = () => {
  const { publicKey, connected } = useWallet();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    // console.log("User data:", user);
    if (!publicKey || !connected) {
      localStorage.removeItem("user"); // Remove user from local storage
      navigate("/");
    }
  }, [user, connected, navigate, publicKey]);

  const statisticsData = [
    { label: "Total Revenue", value: `${formatCurrency(user?.user?.amount)}` },
    { label: "Total Expenses", value: "$00" },
    { label: "Net Profit", value: "$00" },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {statisticsData.map((stat, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-gray-600 font-medium mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="flex relative lg:flex-row flex-col gap-6 items-start mx-auto !w-full">
          <PayrollEmployees />
          <PayrollControlPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
