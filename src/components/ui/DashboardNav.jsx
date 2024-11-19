import { useState } from 'react';
import { BiChevronDown, BiMenu, BiX } from 'react-icons/bi';

const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 md:px-8 shadow-lg">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          </svg>
          <span className="text-xl font-bold">Payroll</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
         
          <a href="#" className="flex items-center hover:text-gray-300 transition-colors">
            Settings <BiChevronDown className="ml-1 w-4 h-4" />
          </a>
          <a href="#" className="hover:text-gray-300 transition-colors">
            Help
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-400 hover:text-gray-300 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <BiX className="w-6 h-6" /> : <BiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 py-4 px-6 mt-4 rounded-lg">
          <a href="#" className="block mb-3 hover:text-gray-300 transition-colors">
            Overview
          </a>
          <a href="#" className="block mb-3 hover:text-gray-300 transition-colors">
            Analytics
          </a>
          <a href="#" className="block mb-3 flex items-center hover:text-gray-300 transition-colors">
            Settings <BiChevronDown className="ml-1 w-4 h-4" />
          </a>
          <a href="#" className="block mb-3 hover:text-gray-300 transition-colors">
            Help
          </a>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;