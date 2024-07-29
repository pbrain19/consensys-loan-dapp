import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import { useReadUsdcBalanceOf, useWriteUsdcMint } from "../../generated";
import { getAddress, parseEther } from "viem";
import { Usdc } from "../../contracts/constant";
import { useEffect } from "react";

type Props = { address: string; name: string };

export function TokenBalanceItem(props: Props) {
  const account = useAccount();

  const { data, refetch } = useReadUsdcBalanceOf({
    address: getAddress(props.address),
    args: [getAddress(account.address!)],
  });

  const {
    writeContract,
    isSuccess,
    isPending,
    data: hash,
  } = useWriteUsdcMint();

  const { data: transactionData, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirmed) {
      refetch();
    }
  }, [isConfirmed, transactionData]);

  return (
    <div>
      <div>{props.name} - </div>
      <div>{data?.toString()}</div>
      <div>
        {isSuccess ? (
          <div>you minted a token</div>
        ) : (
          <button
            onClick={() => {
              writeContract({
                address: getAddress(Usdc.address),
                args: [parseEther("100")],
              });
            }}
            disabled={isPending}
          >
            mint token
          </button>
        )}
      </div>
    </div>
  );
}
