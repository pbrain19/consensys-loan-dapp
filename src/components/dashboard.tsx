import { LoansList } from "./LoansList";
import { TokenList } from "./TokenList";

export function Dashboard() {
  return (
    <div>
      <h3>Balances</h3>
      <TokenList />
      <h3>loans</h3>
      <LoansList />
    </div>
  );
}
