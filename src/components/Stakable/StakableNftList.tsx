import { getAddress } from "viem";
import { BasicNFT } from "../../contracts/constant";
import { useReadBasicNftTokensOfOwner } from "../../generated";
import { useAccount } from "wagmi";
import { StakableNftItem } from "./StakableNftItem";

export function StakableNftList() {
  const account = useAccount();

  const { data } = useReadBasicNftTokensOfOwner({
    address: getAddress(BasicNFT.address),
    args: [getAddress(account.address!)],
  });

  return (
    <div className="flex flex-col w-full">
      {data?.map((tokenId) => {
        return <StakableNftItem tokenId={tokenId} key={tokenId.toString()} />;
      })}
    </div>
  );
}
