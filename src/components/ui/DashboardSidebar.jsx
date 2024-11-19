import {
  Bell,
  ChevronDown,
  Clipboard,
  CreditCard,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { RiDashboardFill } from "react-icons/ri";

export default function DashboardSidebar() {
  const [selectedProject, setSelectedProject] = useState("Project A");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // New state for dropdown

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
    setIsDropdownOpen(false); // Close dropdown after selection
  };

  return (
    <>
      <div className="bg-gray-900 text-white w-72 p-6">
        <div className="flex items-center justify-between mb-6">
          <span className="text-lg font-bold">Dashboard</span>
          <div
            className="flex items-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <span>{selectedProject}</span>
            <ChevronDown className="ml-2 w-5 h-5" />
          </div>
        </div>
        {isDropdownOpen && ( // Conditional rendering for dropdown
          <ul className="space-y-4">
            <li
              className="flex items-center cursor-pointer"
              onClick={() => handleProjectSelect("Project A")}
            >
              <RiDashboardFill className="w-5 h-5 mr-2" />
              <span>Project A</span>
            </li>
            <li
              className="flex items-center cursor-pointer"
              onClick={() => handleProjectSelect("Project B")}
            >
              <CreditCard className="w-5 h-5 mr-2" />
              <span>Project B</span>
            </li>
            <li
              className="flex items-center cursor-pointer"
              onClick={() => handleProjectSelect("Project C")}
            >
              <Clipboard className="w-5 h-5 mr-2" />
              <span>Project C</span>
            </li>
            <li
              className="flex items-center cursor-pointer"
              onClick={() => handleProjectSelect("Project D")}
            >
              <Bell className="w-5 h-5 mr-2" />
              <span>Project D</span>
            </li>
            <li
              className="flex items-center cursor-pointer"
              onClick={() => handleProjectSelect("Project E")}
            >
              <Settings className="w-5 h-5 mr-2" />
              <span>Project E</span>
            </li>
          </ul>
        )}
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
