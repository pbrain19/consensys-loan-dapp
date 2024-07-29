import { useAccount } from "wagmi";
import { useReadBasicNftBalanceOf } from "../../generated";
import { getAddress } from "viem";

type Props = { address: string; name: string };

export function NftItem(props: Props) {
  const account = useAccount();

  const { data } = useReadBasicNftBalanceOf({
    address: getAddress(props.address),
    args: [getAddress(account.address!)],
  });

  return (
    <div>
      <div>{props.name} - </div>
      <div>{data?.toString()}</div>
    </div>
  );
}
