import DashboardSidebar from "../ui/DashboardSidebar";

import PayrollControlPanel from "../features/PayrollControlPanel";
import PayrollEmployees from "../features/PayrollEmployees";
import { AuthContext } from "../context/userContext";
import { useContext, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useNavigate } from "react-router-dom";

// Dashboard Component
const Dashboard = () => {
  const { user,  } = useContext(AuthContext);
  const { publicKey, connected } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("User data:", user);
    if (!publicKey || !connected) {
      localStorage.removeItem("user"); // Remove user from local storage
      navigate("/");
    }
  }, [user, connected, navigate, publicKey]);

  const statisticsData = [
    { label: "Total Revenue", value: "$125,000" },
    { label: "Total Expenses", value: "$95,000" },
    { label: "Net Profit", value: "$30,000" },
  ];

  //   const payoutsData = [
  //     { employee: "John Doe", amount: "$5,000", date: "2023-04-15" },
  //     { employee: "Jane Smith", amount: "$4,500", date: "2023-04-10" },
  //     { employee: "Bob Johnson", amount: "$6,200", date: "2023-04-05" },
  //     { employee: "Emily Davis", amount: "$3,800", date: "2023-03-30" },
  //   ];

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

        {/* Payouts Table */}
        {/*   <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-bold mb-4">Payouts</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">Employee</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                  <th className="px-4 py-2 text-right">Date</th>
                </tr>
              </thead>
              <tbody>
                {payoutsData.map((payout, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2 text-left">{payout.employee}</td>
                    <td className="px-4 py-2 text-right">{payout.amount}</td>
                    <td className="px-4 py-2 text-right">{payout.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}
        <div className="flex relative lg:flex-row flex-col gap-6 items-start mx-auto !w-full">
          <PayrollEmployees />
          <PayrollControlPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
