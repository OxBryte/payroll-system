import { useState } from "react";

const useSubmitWalletAddress = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitWalletAddress = async (publicKey, payrollData) => {
    setLoading(true);
    setError(null);

    const payload = {
      walletAddress: publicKey,
      payrollTitle: payrollData.title,
      payrollDescription: payrollData.description,
      amount: payrollData.amount,
      interval: payrollData.interval,
    };

    try {
      const response = await fetch("http://localhost:3000/api/create-payroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log("Success:", JSON.stringify(payload));
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err.message || "Failed to submit wallet address");
      throw err;
    }
  };

  return { submitWalletAddress, loading, error };
};

export default useSubmitWalletAddress;
