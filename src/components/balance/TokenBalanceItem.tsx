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
    <div className="p-4 border border-gray-700 rounded-lg shadow-md bg-gray-800">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">{props.name}</div>
        <div className="text-sm text-gray-400">
          {data?.toString() || "Loading..."}
        </div>
      </div>
      <div className="mt-4">
        {isSuccess ? (
          <div className="text-green-500">You minted a token</div>
        ) : (
          <button
            onClick={() => {
              writeContract({
                address: getAddress(Usdc.address),
                args: [parseEther("100")],
              });
            }}
            disabled={isPending}
            className={`px-4 py-2 rounded-md ${
              isPending
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isPending ? "Minting..." : "Mint Token"}
          </button>
        )}
      </div>
    </div>
  );
}
