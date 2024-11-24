import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Link } from "react-router-dom";

export default function Hero() {
  const { connected } = useWallet();

  return (
    <>
      <div className="max-w-6xl mx-auto px-6 py-16 text-center container">
        {/* NEW Tag */}
        <div className="flex justify-center mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-600 text-white">
            NEW
          </span>
          <span className="ml-2 text-gray-600">
            Payroll for All Your Employees
          </span>
        </div>

        {/* Hero Title */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-6xl font-bold mb-4">
            <span className="text-purple-600">Simplify Payroll</span> 💰
            <br />
            <span className="text-gray-900">Empower Your Workforce</span>
          </h1>
          <p className=" text-sm md:text-xl text-gray-600 max-w-2xl mx-auto">
            Manage payroll for full-time and contract employees seamlessly with
            our intuitive HR dashboard.
          </p>
        </div>

        {/* CTA Button */}
        {!connected ? (
          <WalletMultiButton />
        ) : (
          <Link to="/payroll">
            <button className="bg-gray-900 text-white px-8 py-3 rounded-lg text-lg hover:bg-gray-800">
              Get Started
            </button>
          </Link>
        )}

        <div className="mt-20 rounded-xl overflow-hidden">
          <img src="/img.png" alt="" />
        </div>
      </div>
    </>
  );
}
