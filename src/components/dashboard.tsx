import { LoansList } from "./loan/LoansList";
import { TokenList } from "./balance/TokenList";
import { StakableNftList } from "./Stakable/StakableNftList";
import { ContractRefillDeposit } from "./Stakable/DepositToContract";

export function Dashboard() {
  return (
    <div>
      <h3>Balances</h3>
      <TokenList />

      <h3>Borrow</h3>
      <ContractRefillDeposit />
      <StakableNftList />
      <h3>Active loans</h3>
      <LoansList />
    </div>
  );
}
