import { LoansList } from "./LoansList";
import { TokenList } from "./TokenList";

export function Dashboard() {
  return (
    <div>
      <h3>Balances</h3>
      <TokenList />

      <h3>Borrow</h3>
      <h3>Active loans</h3>
      <LoansList />
    </div>
  );
}
