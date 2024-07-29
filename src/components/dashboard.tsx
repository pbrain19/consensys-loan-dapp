import React, { useState } from "react";
import { LoansList } from "./loan/LoansList";
import { TokenList } from "./balance/TokenList";
import { StakableNftList } from "./Stakable/StakableNftList";
import { ContractRefillDeposit } from "./Stakable/DepositToContract";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("Balances");

  return (
    <div className="w-full mx-auto mt-4 p-4">
      <div className="flex space-x-4 border-b border-gray-700">
        <button
          onClick={() => setActiveTab("Balances")}
          className={`px-4 py-2 ${
            activeTab === "Balances"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-400"
          } hover:text-white`}
        >
          Balances
        </button>
        <button
          onClick={() => setActiveTab("Borrow")}
          className={`px-4 py-2 ${
            activeTab === "Borrow"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-400"
          } hover:text-white`}
        >
          Borrow
        </button>
        <button
          onClick={() => setActiveTab("Active Loans")}
          className={`px-4 py-2 ${
            activeTab === "Active Loans"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-400"
          } hover:text-white`}
        >
          Active Loans
        </button>
      </div>

      <div className="mt-4">
        {activeTab === "Balances" && (
          <div>
            <h3 className="text-2xl font-semibold">Balances</h3>
            <TokenList />
          </div>
        )}
        {activeTab === "Borrow" && (
          <div>
            <h3 className="text-2xl font-semibold">Borrow</h3>
            <ContractRefillDeposit />
            <StakableNftList />
          </div>
        )}
        {activeTab === "Active Loans" && (
          <div>
            <h3 className="text-2xl font-semibold">Active Loans</h3>
            <LoansList />
          </div>
        )}
      </div>
    </div>
  );
}
