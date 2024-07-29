import { getAddress } from "viem";
import { Banker } from "../contracts/constant";
import { useReadBankerTokensOfOwner } from "../generated";
import { useAccount } from "wagmi";
import { LoanItem } from "./common/LoanItem";

export function LoansList() {
  const account = useAccount();

  const { data } = useReadBankerTokensOfOwner({
    address: getAddress(Banker.address),
    args: [getAddress(account.address!)],
  });

  console.log(data);
  return (
    <div>
      {data?.map((tokenId) => {
        return <LoanItem tokenId={tokenId} key={tokenId.toString()} />;
      })}
    </div>
  );
}
