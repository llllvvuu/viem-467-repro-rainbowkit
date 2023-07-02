'use client'

import { useState } from 'react'
import { parseEther, } from 'viem'

import { useDebounce } from '../hooks/useDebounce'

import { TransactButton } from "./TransactButton"

export function SendTransactionPrepared() {
  const [to, setTo] = useState('')
  const debouncedTo = useDebounce(to)

  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value)

  const [showButton, setShowButton] = useState(true)

  const prepareConfig = {
    to: debouncedTo,
    value: debouncedValue ? parseEther(value as `${number}`) : undefined,
    enabled: Boolean(debouncedTo && debouncedValue),
  }

  return (
    <>
      <input
        placeholder="address"
        onChange={(e) => setTo(e.target.value)}
        value={to}
      />
      <input
        id="value"
        placeholder="value (ether)"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      {showButton && <TransactButton
        prepareConfig={prepareConfig}
        confirmingMsg="Confirm in Wallet"
        waitingMsg="Waiting on Network"
      >
        Send
      </TransactButton>}
      <button onClick={() => setShowButton(!showButton)}>Toggle</button>
    </>
  )
}
