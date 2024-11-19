import { useState } from "react";
import {
  Building,
  CheckCircle2,
  CreditCard,
  Mail,
  Phone,
  UserPlus,
  Users,
} from "lucide-react";
import { BsX } from "react-icons/bs";

export default function PayrollEmployees() {
  const [isHovered, setIsHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddEmployee = () => {
    // Logic to add employee goes here
    // For now, just show the success modal
    setIsSuccessModalOpen(true);
    setTimeout(() => {
      setIsSuccessModalOpen(false);
      setIsSidebarOpen(false);
    }, 3000); // Close modal after 3 seconds
  };

  return (
    <div className="flex-1 relative mx-auto">
      <div className="max-w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">
            Bright Payroll
          </h1>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Employee
          </button>
        </div>

        {/* Empty State Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Table Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-gray-400" />
                <h2 className="text-sm font-medium text-gray-700">Employees</h2>
              </div>
              <span className="text-xs text-gray-500">0 employees</span>
            </div>
          </div>

          {/* Empty State Content */}
          <div className="px-6 py-12 flex flex-col items-center justify-center">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users
                  className={`w-12 h-12 ${
                    isHovered ? "text-blue-600" : "text-blue-400"
                  } transition-colors`}
                />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute -bottom-1 -left-3 w-5 h-5 bg-blue-50 rounded-full"></div>
              <div className="absolute top-1 -left-4 w-4 h-4 bg-gray-100 rounded-full"></div>
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No employees yet
            </h3>
            <p className="text-gray-500 text-center mb-8 max-w-sm">
              Get started by adding your first employee to manage payroll and
              track payments.
            </p>

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <UserPlus className="w-5 h-5 mr-2" />
              Add Your First Employee
            </button>
          </div>

          <div className="border-t border-gray-100 px-6 py-4">
            <p className="text-xs text-gray-500 text-center">
              Need help setting up your payroll? Check our{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700">
                guide
              </a>{" "}
              or{" "}
              <a href="#" className="text-blue-600 hover:text-blue-700">
                contact support
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 transition-opacity z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 w-96 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            Add New Employee
          </h2>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <BsX className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-1 text-gray-400" />
                  Email
                </div>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-1 text-gray-400" />
                  Phone Number
                </div>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-1 text-gray-400" />
                  Department
                </div>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Department</option>
                <option value="engineering">Engineering</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
                <option value="hr">Human Resources</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-1 text-gray-400" />
                  Monthly Salary
                </div>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200">
          <div className="flex space-x-3">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              onClick={(e) => {
                e.preventDefault(); // Prevent form submission
                handleAddEmployee(); // Call the function to add employee
              }}
              className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Employee
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-30" />
          <div className="bg-white rounded-lg p-6 shadow-xl transform transition-all max-w-sm w-full mx-4 relative z-50">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Employee Added Successfully!
              </h3>
              <p className="text-sm text-gray-500">
                The new employee has been added to the system.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
