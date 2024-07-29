import { useAccount } from "wagmi";
import { useReadUsdcAllowance } from "../../generated";
import { getAddress } from "viem";
import { Banker } from "../../contracts/constant";

type Props = { tokenId: BigInt };

export function LoanItem(props: Props) {
  const account = useAccount();
  const userAddress = getAddress(account.address!);
  const { data: allowance } = useReadUsdcAllowance({
    address: userAddress,
    args: [userAddress, getAddress(Banker.address)],
  });

  return (
    <div>
      <div>{props.tokenId.toString()} - </div>
      <div>
        {allowance && allowance > BigInt(0) ? (
          <button>repay loan</button>
        ) : (
          <button>Allow transfer</button>
        )}
      </div>
    </div>
  );
}
