import { useAccount } from "wagmi";
import {
  useReadBasicNftBalanceOf,
  useReadUsdcBalanceOf,
} from "../../generated";
import { getAddress } from "viem";

type Props = { address: string; name: string };

export function TokenItem(props: Props) {
  const account = useAccount();

  const { data } = useReadUsdcBalanceOf({
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
