import { useAccount, useWaitForTransactionReceipt } from "wagmi";
import {
  useReadUsdcAllowance,
  useWriteBankerRepay,
  useWriteUsdcApprove,
} from "../../generated";
import { getAddress, parseEther } from "viem";
import { Banker, Usdc } from "../../contracts/constant";
import { useEffect } from "react";

type Props = { tokenId: BigInt; cb?: () => void };

export function LoanNftItem(props: Props) {
  const account = useAccount();

  const { data, refetch } = useReadUsdcAllowance({
    address: getAddress(Usdc.address),
    args: [getAddress(account.address!), getAddress(Banker.address)],
  });

  return (
    <div className="p-4 border border-gray-700 rounded-lg shadow-md bg-gray-800">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">
          {props.tokenId.toString()} -{" "}
        </div>
        <div>
          {data && data > BigInt(0) ? (
            <RepayButton tokenId={props.tokenId} cb={refetch} />
          ) : (
            <ApproveButton tokenId={props.tokenId} cb={refetch} />
          )}
        </div>
      </div>
    </div>
  );
}

function ApproveButton(props: Props) {
  const address = getAddress(Banker.address);

  const {
    writeContract: approveToken,
    isSuccess,
    isPending,
    data: hash,
  } = useWriteUsdcApprove();

  const { data: transactionData, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirmed) {
      props.cb?.();
    }
  }, [isConfirmed, transactionData]);

  return isSuccess ? (
    <div className="text-green-500">You approved the token - tx: {hash}</div>
  ) : (
    <button
      onClick={() => {
        approveToken({
          address: getAddress(Usdc.address),
          args: [address, parseEther("100")],
        });
      }}
      disabled={isPending}
      className={`px-4 py-2 rounded-md ${
        isPending
          ? "bg-gray-600 text-gray-400 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
    >
      {isPending ? "Approving..." : "Approve USDC to Repay"}
    </button>
  );
}

function RepayButton(props: Props) {
  const {
    writeContract: repayLoan,
    isSuccess,
    isPending,
    data: hash,
    error,
  } = useWriteBankerRepay();

  const { data: transactionData, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  useEffect(() => {
    if (isConfirmed) {
      props.cb?.();
    }
  }, [isConfirmed, transactionData]);

  console.log(error);

  return isSuccess ? (
    <div className="text-green-500">You repaid your loan - tx: {hash}</div>
  ) : (
    <button
      onClick={() => {
        repayLoan({
          address: getAddress(Banker.address),
          args: [props.tokenId.valueOf()],
        });
      }}
      disabled={isPending}
      className={`px-4 py-2 rounded-md ${
        isPending
          ? "bg-gray-600 text-gray-400 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600"
      }`}
    >
      {isPending ? "Repaying..." : "Repay Loan"}
    </button>
  );
}
