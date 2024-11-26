import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useState } from "react";
import { BiChevronDown, BiMenu, BiX } from "react-icons/bi";

const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 md:px-8 shadow-lg">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-xl font-bold">Payroll</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="#"
            className="flex items-center hover:text-gray-300 transition-colors"
          >
            Settings <BiChevronDown className="ml-1 w-4 h-4" />
          </a>
          <WalletMultiButton />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-400 hover:text-gray-300 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <BiX className="w-6 h-6" />
          ) : (
            <BiMenu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 py-4 px-6 mt-4 rounded-lg">
          <a
            href="#"
            className="block mb-3 hover:text-gray-300 transition-colors"
          >
            Overview
          </a>
          <a
            href="#"
            className="block mb-3 hover:text-gray-300 transition-colors"
          >
            Analytics
          </a>
          <a
            href="#"
            className="block mb-3 flex items-center hover:text-gray-300 transition-colors"
          >
            Settings <BiChevronDown className="ml-1 w-4 h-4" />
          </a>
          <a
            href="#"
            className="block mb-3 hover:text-gray-300 transition-colors"
          >
            Help
          </a>
        </div>
      )}
    </nav>
  );
};

export default DashboardNavbar;
