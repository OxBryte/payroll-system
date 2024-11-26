import { useContext, useState } from "react";
import {
  DollarSign,
  Pause,
  Play,
  Calendar,
  AlertCircle,
  ChevronUp,
  ChevronDown,
  Clock,
} from "lucide-react";
import { AuthContext } from "../context/userContext";

// eslint-disable-next-line react/prop-types
const PayrollControlPanel = () => {
  const [payrollAmount, setPayrollAmount] = useState(50000);
  const [isPaused, setIsPaused] = useState(false);
  const [paymentInterval, setPaymentInterval] = useState("monthly");
  const [isAdjustingAmount, setIsAdjustingAmount] = useState(false);
  const { user } = useContext(AuthContext);

  const parsed = user?.user;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAmountChange = (amount) => {
    setPayrollAmount(Math.max(0, amount));
  };

  return (
    <div className="max-w-sm sticky top-6">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {parsed?.payrollTitle?.toLowerCase().includes("payroll")
                ? parsed?.payrollTitle
                : `${parsed?.payrollTitle} Payroll`}
            </h2>
            <div className="flex items-center space-x-2">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  isPaused ? "bg-red-500" : "bg-green-500"
                }`}
              >
                {isPaused ? "Paused" : "Active"}
              </span>
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            {/* <DollarSign className="w-8 h-8 opacity-80" /> */}
            <span className="text-3xl font-bold">
              {formatCurrency(parsed?.amount)}
              {/* {formatCurrency(payrollAmount)} */}
            </span>
            <span className="text-blue-200">total payout</span>
          </div>
        </div>

        {/* Controls Section */}
        <div className="p-6 space-y-6">
          {/* Amount Adjustment */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div
              onClick={() => setIsAdjustingAmount(!isAdjustingAmount)}
              className="flex cursor-pointer items-center justify-between mb-4"
            >
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <span className="font-medium">Adjust Payroll Amount</span>
              </div>
              <button className="text-blue-600 hover:text-blue-700">
                {isAdjustingAmount ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>
            </div>

            {isAdjustingAmount && (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleAmountChange(payrollAmount - 1000)}
                    className="p-2 rounded-full hover:bg-gray-200 text-gray-600"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </button>
                  <input
                    type="number"
                    value={payrollAmount}
                    onChange={(e) =>
                      handleAmountChange(parseInt(e.target.value) || 0)
                    }
                    className="w-full px-4 py-2 text-center border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={() => handleAmountChange(payrollAmount + 1000)}
                    className="p-2 rounded-full hover:bg-gray-200 text-gray-600"
                  >
                    <ChevronUp className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex justify-center space-x-2">
                  {[5000, 10000, 25000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleAmountChange(payrollAmount + amount)}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                    >
                      +{formatCurrency(amount)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Payment Schedule */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Payment Interval</span>
            </div>
            <div className="flex space-x-2">
              {["weekly", "bi-weekly", "monthly"].map((interval) => (
                <button
                  key={interval}
                  onClick={() => setPaymentInterval(interval)}
                  className={`px-4 py-2 rounded-lg text-sm capitalize ${
                    paymentInterval === interval
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {interval}
                </button>
              ))}
            </div>
          </div>

          {/* Payroll Status */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="font-medium">Payroll Status</span>
            </div>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`w-full px-4 py-2 rounded-lg text-sm flex items-center justify-center space-x-2 ${
                isPaused
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              {isPaused ? (
                <>
                  <Play className="w-4 h-4" />
                  <span>Resume Payroll</span>
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause Payroll</span>
                </>
              )}
            </button>
          </div>
          <div className="w-full">
            <button className="w-full justify-center items-center px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
              {/* <UserPlu className="w-5 h-5 mr-2" /> */}
              Update payroll
            </button>
          </div>

          {/* Info Section */}
          <div className="flex items-start space-x-2 text-sm text-gray-500 bg-blue-50 p-4 rounded-lg">
            <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p>
              Changes to payroll amount will take effect from the next payment
              cycle. The next payment is scheduled for{" "}
              {paymentInterval === "weekly"
                ? "next Friday"
                : paymentInterval === "bi-weekly"
                ? "next other Friday"
                : "the 1st of next month"}
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollControlPanel;
