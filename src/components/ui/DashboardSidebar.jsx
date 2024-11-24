import { Bell, Clipboard, CreditCard, Settings } from "lucide-react";
import { RiDashboardFill } from "react-icons/ri";

export default function DashboardSidebar() {
  return (
    <>
      <div className="bg-gray-900 text-white w-72 p-6">
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-bold">Dashboard</span>
        </div>

        <ul className="space-y-4">
          <li className="flex items-center">
            <RiDashboardFill className="w-5 h-5 mr-2" />
            <span>Dashboard</span>
          </li>
          <li className="flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            <span>Payroll</span>
          </li>
          <li className="flex items-center">
            <Clipboard className="w-5 h-5 mr-2" />
            <span>Invoice</span>
          </li>
          <li className="flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            <span>Notification</span>
          </li>
          <li className="flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            <span>Accounting</span>
          </li>
        </ul>
      </div>
    </>
  );
}
