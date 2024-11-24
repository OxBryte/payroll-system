import { useState } from "react";
import { DollarSign, Loader2, Check } from "lucide-react";

const PayrollSetup = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    description: "",
  });

  console.log(formData);

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(step + 1);
    }, 1000);
  };

  const handleFund = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(4);
    }, 1500);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center px-0 pb-2">
              <h2 className="text-xl font-semibold text-gray-900">
                New Payroll Setup
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Enter Payroll Details
              </p>
            </div>
            <div className="">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-gray-700">
                    Payroll Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., December 2024 Payroll"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-gray-700">
                    Payroll Description
                  </label>
                  <textarea
                    type="text"
                    placeholder="e.g., December 2024 Payroll"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  onClick={handleNext}
                  disabled={!formData.title || !formData.description || loading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>Continue</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center px-0 pb-2">
              <h2 className="text-xl font-semibold text-gray-900">
                Amount Details
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Specify Amount to be funded
              </p>
            </div>
            <div className="px-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-gray-700">
                    Enter Amount
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      placeholder="0.00"
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                      className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <button
                  onClick={handleNext}
                  disabled={!formData.amount || loading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>Continue</span>
                  )}
                </button>
              </div>
              <button
                onClick={handleBack}
                className="mt-2 w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center space-x-2 transition-colors"
              >
                <span>Back</span>
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center px-0 pb-2">
              <h2 className="text-xl font-semibold text-gray-900">
                Confirm & Fund
              </h2>
              <p className="text-sm text-gray-500 mt-1">Review Details</p>
            </div>
            <div className="px-6">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Payroll Title</span>
                    <span className="font-medium text-gray-900">
                      {formData.title}
                    </span>
                  </div>
                  {/* <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-200">
                    <span className="text-sm text-gray-600">Payroll Description</span>
                    <span className="font-medium text-gray-900">
                      {formData.description}
                    </span>
                  </div> */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Amount</span>
                    <span className="font-medium text-gray-900">
                      ${parseFloat(formData.amount).toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleFund}
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <DollarSign className="w-4 h-4" />
                  )}
                  <span>Fund Account</span>
                </button>
              </div>
              <button
                onClick={handleBack}
                className="mt-2 w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center justify-center space-x-2 transition-colors"
              >
                <span>Back</span>
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center px-0 pb-2">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h2 className="text-xl font-semibold text-green-600">Success!</h2>
              <p className="text-sm text-gray-500 mt-1">
                Your payroll has been funded
              </p>
            </div>
            <div className="px-6">
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <p className="text-center text-sm text-green-800">
                    Your payroll of ${parseFloat(formData.amount).toFixed(2)}{" "}
                    has been funded successfully.
                  </p>
                </div>
                <button
                  onClick={() => (window.location.href = "/dashboard")}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center space-x-2 transition-colors"
                >
                  <span>Go to Dashboard</span>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-[400px] p-8 w-full bg-white rounded-xl shadow-md">
        {/* <div className="pt-6 px-6">
          <div className="flex justify-center mb-6">
            <div className="flex items-center">
              {[1, 2, 3].map((i) => (
                <React.Fragment key={i}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                      ${step >= i 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-100 text-gray-400 border border-gray-200'
                      }`}
                  >
                    {i}
                  </div>
                  {i < 3 && (
                    <div
                      className={`w-12 h-0.5 transition-colors
                        ${step > i ? 'bg-blue-600' : 'bg-gray-200'}`
                      }
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div> */}
        {renderStep()}
        {/* <div className="h-6"></div> */}
      </div>
    </div>
  );
};

export default PayrollSetup;
