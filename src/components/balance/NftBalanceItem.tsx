import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import {
  useReadBasicNftBalanceOf,
  useWriteBasicNftSafeMint,
} from "../../generated";
import { getAddress } from "viem";
import { BasicNFT } from "../../contracts/constant";
import { useEffect } from "react";

type Props = { address: string; name: string };

export function NftBalanceItem(props: Props) {
  const account = useAccount();
  const address = getAddress(account.address!);

  const { data, refetch } = useReadBasicNftBalanceOf({
    address: getAddress(props.address),
    args: [getAddress(account.address!)],
  });

  const {
    writeContract,
    isSuccess,
    isPending,
    data: hash,
  } = useWriteBasicNftSafeMint();

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
          <div className="text-green-500">You minted a token - tx: {hash}</div>
        ) : (
          <button
            onClick={() => {
              writeContract({
                address: getAddress(BasicNFT.address),
                args: [address, BigInt(1)],
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
