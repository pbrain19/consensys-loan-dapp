import { getAddress } from "viem";
import { Banker } from "../../contracts/constant";
import { useReadBankerTokensOfOwner } from "../../generated";
import { useAccount } from "wagmi";
import { LoanNftItem } from "./LoanNftItem";

export function LoansList() {
  const account = useAccount();

  const { data } = useReadBankerTokensOfOwner({
    address: getAddress(Banker.address),
    args: [getAddress(account.address!)],
  });

  return (
    <div className="flex flex-col w-full">
      {data?.map((tokenId) => {
        return <LoanNftItem tokenId={tokenId} key={tokenId.toString()} />;
      })}
    </div>
  );
}
