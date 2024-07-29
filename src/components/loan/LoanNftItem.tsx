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
    <div>
      <div>{props.tokenId.toString()} - </div>
      <div>
        {data && data > BigInt(0) ? (
          <RepayButton tokenId={props.tokenId} cb={refetch} />
        ) : (
          <ApproveButton tokenId={props.tokenId} cb={refetch} />
        )}
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
    <div>you approved the token - tx : {hash}</div>
  ) : (
    <button
      onClick={() => {
        approveToken({
          address: getAddress(Usdc.address),
          args: [address, parseEther("100")],
        });
      }}
      disabled={isPending}
    >
      approve usdc to repay
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
    <div>you repayed your loan - tx : {hash}</div>
  ) : (
    <button
      onClick={() => {
        repayLoan({
          address: getAddress(Banker.address),
          args: [props.tokenId.valueOf()],
        });
      }}
      disabled={isPending}
    >
      repay loan
    </button>
  );
}
