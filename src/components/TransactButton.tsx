import { waitForTransaction } from "@wagmi/core"
import React, {
  type ButtonHTMLAttributes,
  type FunctionComponent,
  type ReactNode,
} from 'react'
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi'
import { stringify } from 'viem'

import type { Address } from 'wagmi'

interface TransactButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  confirmingMsg: string
  children?: ReactNode
  prepareConfig: any
  waitingMsg: string
}

function showTransactionToasts(hash: Address) {
  console.log(`toast: transaction ${hash} submitted to network`)
  waitForTransaction({
    hash,
    onReplaced(replaceResp) {
      console.log(
        `toast: transaction ${hash} replaced by ${replaceResp.transaction.hash}`
      )
    },
  }).then((successResp) => {
    const txHash = successResp.transactionHash
    console.log(`toast: transaction ${txHash} confirmed`)
  }).catch(() => {
    console.error(`Transaction ${hash} failed.`)
  })
}

export const TransactButton: FunctionComponent<TransactButtonProps> = ({
  confirmingMsg,
  children,
  prepareConfig,
  waitingMsg,
  ...buttonProps
}) => {
  const { config, isError: isPrepareError } =
    usePrepareSendTransaction(prepareConfig)

  const { data: txResponse, sendTransaction, isLoading: isPendingOnWallet } =
    useSendTransaction({
      ...config,
      onError() {
        console.log("Did not send transaction.")
      },
      onSuccess(response) {
        showTransactionToasts(response.hash)
      },
    })
  
  const { data: txReceipt, isLoading: isPendingOnNetwork } =
    useWaitForTransaction({ hash: txResponse?.hash, })

  const handleClick = async () => {
    if (isPrepareError || !sendTransaction) {
      console.error("There's an issue with the transaction payload")
    } else {
      sendTransaction()
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        {...buttonProps}
      >
        {isPendingOnWallet
          ? confirmingMsg
          : (isPendingOnNetwork ? waitingMsg : children)
        }
      </button>
      {stringify(txReceipt, null, 2)}
    </>
  )
}
