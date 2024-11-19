import { BiChevronDown } from "react-icons/bi";

export default function Navbar() {
  return (
    <div>
      <nav className="flex items-center justify-between px-6 py-4 container mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <div className="text-2xl font-bold text-purple-600">
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 24 24" className="w-8 h-8">
                <path
                  fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                />
              </svg>
              PayRoll
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center cursor-pointer">
            Features <BiChevronDown className="ml-1 w-4 h-4" />
          </div>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            About
          </a>
          {/* <a href="#" className="text-gray-600 hover:text-gray-900">
            Customers
          </a> */}
          <a href="#" className="text-gray-600 hover:text-gray-900">
            Pricing
          </a>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            Connect wallet
          </button>
        </div>
      </nav>
    </div>
  );
}
