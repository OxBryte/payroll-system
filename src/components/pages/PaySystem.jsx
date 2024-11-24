import { useState, useEffect } from "react";
import * as anchor from "@coral-xyz/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Program, AnchorProvider } from "@coral-xyz/anchor";
import { PublicKey, LAMPORTS_PER_SOL, SystemProgram } from "@solana/web3.js";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Buffer } from "buffer";
import { PayrollIDL } from "../service/idl";

const PROGRAM_ID = new PublicKey(
  "CK2qfDVhrcypvFRLM9hofBUXTbXTP6w82ZqpQHTMu32Q"
);

const PayrollSystem = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [payrollAccount, setPayrollAccount] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Form states
  const [period, setPeriod] = useState("");
  const [fundAmount, setFundAmount] = useState("");
  const [employeeWallet, setEmployeeWallet] = useState("");
  const [employeeSalary, setEmployeeSalary] = useState("");
  const [employeeInterval, setEmployeeInterval] = useState("");

  // Initialize program
  const getProgram = () => {
    if (!publicKey) return null;
    const provider = new AnchorProvider(
      connection,
      window.solana,
      AnchorProvider.defaultOptions()
    );
    return new anchor.Program(PayrollIDL, PROGRAM_ID, provider);
  };

  // Get Payroll Account PDA
  const getPayrollAccount = async () => {
    if (!publicKey) return null;
    const [pda] = await PublicKey.findProgramAddress(
      [Buffer.from("payroll"), publicKey.toBuffer()],
      PROGRAM_ID
    );
    return pda;
  };

  // Create Payroll System
  const createPayroll = async () => {
    if (!PROGRAM_ID || !publicKey) return;

    // e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const program = getProgram();
      const payrollPda = await getPayrollAccount();
      const period = new anchor.BN(7 * 24 * 60 * 60);

      const tx = await program.methods
        .createPayroll(period)
        .accounts({
          payroll: payrollPda,
          owner: publicKey,
          systemProgram: SystemProgram.programId,
        })
        .signers([publicKey])
        .rpc();
      const confirmation = await connection.confirmTransaction(tx, "processed"); // Use "processed" as the commitment level
      if (confirmation.value.err) {
        throw new Error("Transaction failed to confirm");
      }
      // const account = await program.account.payroll.fetch(publicKey);
      //   await fetchPayrollInfo();
    } catch (err) {
      setError(`Error creating payroll: ${err}`);
      console.log(err);
      
    }
    setLoading(false);
  };

  // Fund Payroll
  // Fund Payroll
  const fundPayroll = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Input validation
      if (!fundAmount || isNaN(fundAmount) || parseFloat(fundAmount) <= 0) {
        throw new Error("Please enter a valid amount");
      }

      const program = getProgram();
      if (!program) {
        throw new Error("Program not initialized");
      }

      const payrollPda = await getPayrollAccount();

      // Convert amount to lamports and create BN
      // Make sure to handle decimals properly
      const lamports = Math.floor(parseFloat(fundAmount) * LAMPORTS_PER_SOL);
      const amountBN = new anchor.BN(lamports.toString());

      console.log("Amount in lamports:", lamports);
      console.log("Amount as BN:", amountBN.toString());

      // Create the transaction
      const tx = await program.methods
        .fundPayroll(amountBN)
        .accounts({
          payroll: payrollPda,
          owner: publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      console.log("Transaction signature:", tx);

      // Wait for confirmation
      const confirmation = await connection.confirmTransaction(tx);
      if (confirmation.value.err) {
        throw new Error("Transaction failed to confirm");
      }

      console.log("Transaction confirmed");
      setFundAmount(""); // Clear input on success
      //   await fetchPayrollInfo(); // Refresh payroll info
    } catch (err) {
      console.error("Full error:", err);
      let errorMessage = "Error funding payroll: ";

      if (!publicKey) {
        errorMessage += "Wallet not connected";
      } else if (
        !fundAmount ||
        isNaN(fundAmount) ||
        parseFloat(fundAmount) <= 0
      ) {
        errorMessage += "Program not initialized";
      } else if (err.message.includes("0x1")) {
        errorMessage += "Insufficient funds";
      } else if (err.message.includes("custom program error")) {
        errorMessage += "Program error - check your input values";
      } else {
        errorMessage += err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Add Employee
  const addEmployee = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const program = getProgram(); // Ensure program is initialized
      const payrollPda = await getPayrollAccount();
      const employeePubkey = new PublicKey(employeeWallet); // Validate employeeWallet input

      const tx = await program.methods
        .addEmployee(
          employeePubkey,
          new anchor.BN(employeeSalary * LAMPORTS_PER_SOL),
          new anchor.BN(employeeInterval)
        )
        .accounts({
          payroll: payrollPda,
          owner: publicKey,
        })
        .rpc();

      await connection.confirmTransaction(tx); // Check for transaction confirmation errors
      //   await fetchPayrollInfo();
    } catch (err) {
      setError(`Error adding employee: ${err.message}`); // Ensure meaningful error messages
    }
  };

  // Claim Salary
  const claimSalary = async () => {
    setLoading(true);
    setError("");
    try {
      const program = getProgram();
      const payrollPda = await getPayrollAccount();

      const tx = await program.methods
        .claimSalary()
        .accounts({
          payroll: payrollPda,
          employee: publicKey,
        })
        .rpc();

      await connection.confirmTransaction(tx);
      //   await fetchPayrollInfo();
    } catch (err) {
      setError(`Error claiming salary: ${err.message}`);
    }
    setLoading(false);
  };

  // Fetch Payroll Info
  //   const fetchPayrollInfo = async () => {
  //     try {
  //       const program = getProgram(); // Ensure program is initialized
  //       const payrollPda = await getPayrollAccount();
  //       const account = await program.account.payroll.fetch(payrollPda);
  //       setPayrollAccount(account);
  //       setEmployees(account.employees);
  //     } catch (err) {
  //       console.error("Error fetching payroll info:", err); // Log errors for debugging
  //     }
  //   };

  //   useEffect(() => {
  //     if (publicKey) {
  //       fetchPayrollInfo();
  //     }
  //   }, [publicKey]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Solana Payroll System</h1>

      <WalletMultiButton className="mb-6" />

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      )}

      {publicKey && (
        <div className="space-y-6">
          {/* Create Payroll Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Create Payroll</h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-2">Payment Period (days)</label>
                <input
                  type="number"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </form>
            <button
              // type="submit"
              onClick={() => createPayroll()}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              disabled={loading}
            >
              Create Payroll
            </button>
          </div>

          {/* Fund Payroll Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Fund Payroll</h2>
            <form onSubmit={fundPayroll} className="space-y-4">
              <div>
                <label className="block mb-2">Amount (SOL)</label>
                <input
                  type="number"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                disabled={loading}
              >
                Fund Payroll
              </button>
            </form>
          </div>

          {/* Add Employee Form */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Add Employee</h2>
            <form onSubmit={addEmployee} className="space-y-4">
              <div>
                <label className="block mb-2">Employee Wallet</label>
                <input
                  type="text"
                  value={employeeWallet}
                  onChange={(e) => setEmployeeWallet(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Salary (SOL)</label>
                <input
                  type="number"
                  value={employeeSalary}
                  onChange={(e) => setEmployeeSalary(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Payment Interval (seconds)</label>
                <input
                  type="number"
                  value={employeeInterval}
                  onChange={(e) => setEmployeeInterval(e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                disabled={loading}
              >
                Add Employee
              </button>
            </form>
          </div>

          {/* Claim Salary Button */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Claim Salary</h2>
            <button
              onClick={claimSalary}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              disabled={loading}
            >
              Claim Salary
            </button>
          </div>

          {/* Payroll Info */}
          {payrollAccount && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">
                Payroll Information
              </h2>
              <div className="space-y-2">
                <p>Owner: {payrollAccount.owner.toString()}</p>
                <p>Period: {payrollAccount.period.toString()} seconds</p>
                <p>Status: {payrollAccount.isPaused ? "Paused" : "Active"}</p>
                <p>Number of Employees: {payrollAccount.employees.length}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PayrollSystem;
