import { useState } from "react";

const useAddEmployee = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addEmployee = async (formData, payrollId) => {
    setLoading(true);
    setError(null);

    const payload = {
      payrollId,
      fullName: formData.fullName,
      email: formData.email,
      department: formData.department,
      salary: formData.salary,
      walletAddress: formData.walletAddress,
    };
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${apiUrl}/create-employee`, {
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

  return { addEmployee, loading, error };
};

export default useAddEmployee;
